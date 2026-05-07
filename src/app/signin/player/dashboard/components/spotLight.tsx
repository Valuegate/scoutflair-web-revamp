"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Heart,
  ImageIcon,
  LoaderCircle,
  MessageCircle,
  RefreshCw,
  SendHorizontal,
  Share2,
  Trash2,
} from "lucide-react";
import PostBox from "./postBox";
import {
  addComment,
  deleteSpotlightPost,
  getPostComments,
  getPosts,
  getStorageDownloadUrl,
  getUserPosts,
  increaseShare,
  toggleLike,
} from "@/lib/api";
import { usePlayerAvatar, usePlayerDisplayName, usePlayerProfile } from "../profile/usePlayerAvatar";

type SpotlightPost = {
  id: string;
  author: string;
  avatar: string;
  date: string;
  content: string;
  media: string[];
  likedBy: string[];
  likeCount: number;
  isLiked: boolean;
  comments: number;
  shares: number;
  isOwnPost: boolean;
  profileHref: string;
};

type SpotlightComment = {
  id: string;
  author: string;
  avatar: string;
  text: string;
  date: string;
};

type ComposerPost = {
  id: string;
  user: { name: string; avatar: string; timeAgo: string };
  content: string;
  image: string | string[];
  likes: number;
  isLiked: boolean;
  comments: number;
  shares: number;
  likedBy: string[];
};

type RecordLike = Record<string, unknown>;

const DEFAULT_POST_AVATAR = "";
const R2_PUBLIC_BASE_URL = "https://pub-cc6bfa4db4fa4eb8b3d35333dcfdca5e.r2.dev";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

function isRecord(value: unknown): value is RecordLike {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function pickString(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
}

function pickNumber(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === "string" && value.trim()) {
      const parsed = Number(value);
      if (!Number.isNaN(parsed)) {
        return parsed;
      }
    }
  }

  return 0;
}

function pickBoolean(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "boolean") {
      return value;
    }
  }

  return false;
}

function extractFirstArray(payload: unknown): RecordLike[] {
  const queue: unknown[] = [payload];
  const seen = new Set<unknown>();

  while (queue.length > 0) {
    const current = queue.shift();

    if (!current || seen.has(current)) {
      continue;
    }

    seen.add(current);

    if (Array.isArray(current)) {
      const recordItems = current.filter(isRecord);
      if (recordItems.length > 0) {
        return recordItems;
      }

      current.forEach((item) => {
        if (Array.isArray(item) || isRecord(item)) {
          queue.push(item);
        }
      });

      continue;
    }

    if (!isRecord(current)) {
      continue;
    }

    const preferredKeys = ["data", "obj", "items", "posts", "rows", "content", "result", "results"];
    preferredKeys.forEach((key) => {
      if (key in current) {
        queue.push(current[key]);
      }
    });

    Object.values(current).forEach((value) => {
      if (Array.isArray(value) || isRecord(value)) {
        queue.push(value);
      }
    });
  }

  return [];
}

function extractFirstRecord(payload: unknown): RecordLike | null {
  const queue: unknown[] = [payload];
  const seen = new Set<unknown>();

  while (queue.length > 0) {
    const current = queue.shift();

    if (!current || seen.has(current)) {
      continue;
    }

    seen.add(current);

    if (isRecord(current)) {
      const preferredKeys = ["data", "obj", "item", "post", "comment", "result"];
      preferredKeys.forEach((key) => {
        if (key in current) {
          queue.push(current[key]);
        }
      });

      const hasUsefulContent = Boolean(
        pickString(
          current.text,
          current.comment,
          current.content,
          current.author,
          current.userName,
          current.presignedUrl,
          current.publicUrl,
          current.downloadUrl,
          current.url,
          current.id,
        ),
      );

      if (hasUsefulContent) {
        return current;
      }

      Object.values(current).forEach((value) => {
        if (Array.isArray(value) || isRecord(value)) {
          queue.push(value);
        }
      });

      continue;
    }

    if (Array.isArray(current)) {
      current.forEach((item) => queue.push(item));
    }
  }

  return null;
}

function normalizeUrlCollection(value: unknown): string[] {
  if (!value) {
    return [];
  }

  if (typeof value === "string") {
    return value.trim() ? [value.trim()] : [];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => normalizeUrlCollection(item));
  }

  if (!isRecord(value)) {
    return [];
  }

  return normalizeUrlCollection(
    pickString(
      value.url,
      value.publicUrl,
      value.fileUrl,
      value.imageUrl,
      value.publicUrl,
      value.presignedUrl,
      value.downloadUrl,
      value.mediaFileKey,
      value.fileKey,
      value.imageFileKey,
      value.src,
      value.location,
      value.path,
    ),
  );
}

function joinName(...values: unknown[]) {
  return values
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .filter(Boolean)
    .join(" ");
}

function isDisplayableUrl(value: string) {
  return /^(https?:\/\/|blob:|data:|\/images\/|\/)/i.test(value);
}

function normalizeFileKey(value: string) {
  return value.replace(/^\/+/, "");
}

function fileKeyToPublicUrl(value: string) {
  return `${R2_PUBLIC_BASE_URL}/${normalizeFileKey(value)}`;
}

async function resolveStorageUrl(value: string) {
  if (!value.trim()) {
    return "";
  }

  if (isDisplayableUrl(value)) {
    return value.trim();
  }

  try {
    const response = await getStorageDownloadUrl(value.trim());
    const record = extractFirstRecord(response);
    const downloadUrl = record
      ? pickString(record.presignedUrl, record.publicUrl, record.url, record.downloadUrl)
      : "";
    return downloadUrl || fileKeyToPublicUrl(value);
  } catch {
    return fileKeyToPublicUrl(value);
  }
}

async function resolveStorageUrls(values: string[]) {
  const resolvedValues = await Promise.all(values.map(resolveStorageUrl));
  return resolvedValues.filter(Boolean);
}

function parseDateValue(value: unknown): Date | null {
  if (typeof value === "string" && value.trim()) {
    const dateValue = value.trim();
    const backendDateMatch = dateValue.match(
      /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::(\d{2})(?:\.\d+)?)?(?:([+-]\d{2}:?\d{2}|Z))?$/,
    );

    if (backendDateMatch) {
      const [, year, month, day, hour, minute, second = "0", timezone] = backendDateMatch;
      const normalizedIsoDate = `${year}-${month}-${day}T${hour}:${minute}:${second}${timezone || ""}`;
      const parsed = new Date(normalizedIsoDate);
      if (!Number.isNaN(parsed.getTime())) {
        return parsed;
      }
    }

    const numericValue = Number(dateValue);
    if (!Number.isNaN(numericValue)) {
      return parseDateValue(numericValue);
    }

    const parsed = new Date(dateValue);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }

    return null;
  }

  if (typeof value === "number") {
    const timestamp = value > 0 && value < 10000000000 ? value * 1000 : value;
    const parsed = new Date(timestamp);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }
  }

  if (Array.isArray(value) && value.length >= 3) {
    const [year, month, day, hour = 0, minute = 0, second = 0] = value;
    if (
      typeof year === "number" &&
      typeof month === "number" &&
      typeof day === "number"
    ) {
      const parsed = new Date(year, month - 1, day, Number(hour), Number(minute), Number(second));
      if (!Number.isNaN(parsed.getTime())) {
        return parsed;
      }
    }
  }

  return null;
}

function formatDateLabel(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "string" && value.trim() && Number.isNaN(Number(value))) {
      const parsed = parseDateValue(value);
      if (parsed) {
        return dateFormatter.format(parsed).replace(" at ", " | ").replace(/\s(AM|PM)$/, "$1");
      }

      return value.trim();
    }

    const parsed = parseDateValue(value);
    if (parsed) {
      return dateFormatter.format(parsed).replace(" at ", " | ").replace(/\s(AM|PM)$/, "$1");
    }
  }

  return "Just now";
}

function isVideoUrl(url: string) {
  return /\.(mp4|webm|ogg|mov|m4v)$/i.test(url);
}

type CurrentPlayerFallback = {
  name: string;
  avatar: string;
  id?: number;
  email?: string;
};

function normalizeComparable(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function getPostUser(record: RecordLike) {
  const firstMediaRecord = Array.isArray(record.mediaFileKey) && isRecord(record.mediaFileKey[0])
    ? record.mediaFileKey[0]
    : null;
  const firstMediaUser = firstMediaRecord && isRecord(firstMediaRecord.user) ? firstMediaRecord.user : null;

  return isRecord(record.user)
    ? record.user
    : isRecord(record.createdBy)
      ? record.createdBy
      : isRecord(record.player)
        ? record.player
        : firstMediaUser;
}

function isOwnedByCurrentPlayer(record: RecordLike, fallback?: CurrentPlayerFallback, forceOwn = false) {
  if (forceOwn) {
    return true;
  }

  const user = getPostUser(record);
  const currentId = fallback?.id;
  const postUserId = pickNumber(
    record.userId,
    record.playerId,
    record.createdById,
    record.ownerId,
    user?.id,
    user?.playerId,
    user?.profileId,
  );

  if (currentId !== undefined && postUserId !== 0 && postUserId === currentId) {
    return true;
  }

  const currentEmail = normalizeComparable(fallback?.email);
  const postEmail = normalizeComparable(
    pickString(record.userEmail, record.playerEmail, record.email, user?.email, user?.username),
  );

  if (currentEmail && postEmail && currentEmail === postEmail) {
    return true;
  }

  return false;
}

function getProfileHref(record: RecordLike, fallback?: CurrentPlayerFallback, forceOwn = false) {
  if (isOwnedByCurrentPlayer(record, fallback, forceOwn)) {
    return "/signin/player/dashboard/profile";
  }

  const user = getPostUser(record);
  const playerEmail = pickString(record.userEmail, record.playerEmail, record.email, user?.email, user?.username);

  return playerEmail
    ? `/signin/player/dashboard/profile?playerEmail=${encodeURIComponent(playerEmail)}`
    : "";
}

function mapPostRecord(record: RecordLike, fallback?: CurrentPlayerFallback, forceOwn = false) {
  const user = getPostUser(record);

  const likedBy = normalizeUrlCollection(record.likedBy);
  const commentSource = Array.isArray(record.comments) ? record.comments : [];

  const media = [
    ...normalizeUrlCollection(record.mediaUrls),
    ...normalizeUrlCollection(record.mediaFileKeys),
    ...normalizeUrlCollection(record.mediaFileKey),
    ...normalizeUrlCollection(record.mediaFiles),
    ...normalizeUrlCollection(record.media),
    ...normalizeUrlCollection(record.images),
    ...normalizeUrlCollection(record.attachments),
  ];
  const author = pickString(
    record.userFullName,
    record.userName,
    record.author,
    record.playerName,
    record.fullName,
    joinName(record.firstName, record.lastName),
    user?.name,
    user?.fullName,
    joinName(user?.firstName, user?.lastName),
    user?.username,
    record.name,
    fallback?.name,
  ) || "Player";
  const avatar = pickString(
    record.userProfilePicUrl,
    record.userAvatar,
    record.avatar,
    record.avatarUrl,
    record.profileImage,
    record.profilePicture,
    record.userImageFileKey,
    record.imageFileKey,
    user?.avatarUrl,
    user?.avatar,
    user?.profileImage,
    user?.profilePicture,
    user?.photo,
    user?.imageUrl,
    user?.image,
    user?.imageFileKey,
    fallback?.avatar,
  );

  return {
    id: String(record.id ?? record._id ?? record.postId ?? record.spotLightPostId ?? Date.now()),
    author,
    avatar: avatar || DEFAULT_POST_AVATAR,
    date: formatDateLabel(
      record.dateCreated,
      record.createdAt,
      record.createdDate,
      record.createdOn,
      record.created_at,
      record.created,
      record.postDate,
      record.postedAt,
      record.timestamp,
      record.time,
      record.updatedAt,
      record.updatedDate,
      record.date,
      record.timeAgo,
    ),
    content: pickString(record.text, record.content, record.caption, record.description),
    media,
    likedBy,
    likeCount: pickNumber(
      record.likeCount,
      record.likesCount,
      record.totalLikes,
      record.likes,
      likedBy.length,
    ),
    isLiked: pickBoolean(record.isLiked, record.liked, record.hasLiked),
    comments: pickNumber(
      record.commentCount,
      record.commentsCount,
      record.totalComments,
      Array.isArray(record.comments) ? record.comments.length : record.comments,
      commentSource.length,
    ),
    shares: pickNumber(record.shareCount, record.sharesCount, record.totalShares, record.shares),
    isOwnPost: isOwnedByCurrentPlayer(record, fallback, forceOwn),
    profileHref: getProfileHref(record, fallback, forceOwn),
  } satisfies SpotlightPost;
}

function mapCommentRecord(record: RecordLike) {
  const user = isRecord(record.user)
    ? record.user
    : isRecord(record.createdBy)
      ? record.createdBy
      : null;

  return {
    id: String(record.id ?? record._id ?? record.commentId ?? Date.now()),
    author: pickString(
      record.userName,
      record.author,
      user?.name,
      user?.fullName,
      record.name,
    ) || "Player",
    avatar:
      pickString(
        record.userAvatar,
        record.avatar,
        user?.avatar,
        user?.profileImage,
        user?.photo,
      ) || DEFAULT_POST_AVATAR,
    text: pickString(record.text, record.comment, record.content),
    date: formatDateLabel(
      record.dateCreated,
      record.createdAt,
      record.createdDate,
      record.createdOn,
      record.created_at,
      record.created,
      record.commentDate,
      record.commentedAt,
      record.timestamp,
      record.time,
      record.updatedAt,
      record.updatedDate,
      record.date,
      record.timeAgo,
    ),
  } satisfies SpotlightComment;
}

function mapResponseToPosts(response: unknown, fallback?: CurrentPlayerFallback, forceOwn = false) {
  return extractFirstArray(response).map((record) => mapPostRecord(record, fallback, forceOwn));
}

async function hydratePostMedia(posts: SpotlightPost[], fallback?: CurrentPlayerFallback) {
  return Promise.all(
    posts.map(async (post) => ({
      ...post,
      author: post.author === "Player" && fallback?.name ? fallback.name : post.author,
      avatar: (await resolveStorageUrl(post.avatar)) || fallback?.avatar || DEFAULT_POST_AVATAR,
      media: await resolveStorageUrls([...new Set(post.media)]),
      likedBy: await resolveStorageUrls(post.likedBy),
    })),
  );
}

function mapResponseToComments(response: unknown) {
  return extractFirstArray(response).map(mapCommentRecord);
}

async function hydrateComments(comments: SpotlightComment[]) {
  return Promise.all(
    comments.map(async (comment) => ({
      ...comment,
      avatar: (await resolveStorageUrl(comment.avatar)) || DEFAULT_POST_AVATAR,
    })),
  );
}

function mapCreatedComment(response: unknown, playerName: string, playerAvatar: string, text: string) {
  const createdComment = extractFirstRecord(response);

  if (createdComment) {
    return mapCommentRecord(createdComment);
  }

  return {
    id: `${Date.now()}`,
    author: playerName,
    avatar: playerAvatar,
    text,
    date: "Just now",
  } satisfies SpotlightComment;
}

function MediaGrid({ media, author }: { media: string[]; author: string }) {
  if (media.length === 0) {
    return null;
  }

  if (media.length === 1) {
    return (
      <div className="overflow-hidden rounded-[10px]">
        {isVideoUrl(media[0]) ? (
          <video src={media[0]} controls className="h-auto max-h-[520px] w-full rounded-[10px] object-cover" />
        ) : (
          <img
            src={media[0]}
            alt={`${author} spotlight`}
            className="h-auto max-h-[520px] w-full rounded-[10px] object-cover"
          />
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 overflow-hidden rounded-[10px]">
      {media.map((item, index) => (
        <div key={`${item}-${index}`} className="overflow-hidden rounded-[10px] bg-[#F5F5F5]">
          {isVideoUrl(item) ? (
            <video src={item} controls className="h-[240px] w-full object-cover" />
          ) : (
            <img
              src={item}
              alt={`${author} spotlight ${index + 1}`}
              className="h-[240px] w-full object-cover"
            />
          )}
        </div>
      ))}
    </div>
  );
}

function SpotlightCard({
  post,
  currentUserAvatar,
  currentUserName,
  onToggleLike,
  onShare,
  onDelete,
  onLoadComments,
  onAddComment,
}: {
  post: SpotlightPost;
  currentUserAvatar: string;
  currentUserName: string;
  onToggleLike: (post: SpotlightPost) => Promise<void>;
  onShare: (post: SpotlightPost) => Promise<void>;
  onDelete: (post: SpotlightPost) => Promise<void>;
  onLoadComments: (postId: string) => Promise<SpotlightComment[]>;
  onAddComment: (postId: string, text: string) => Promise<SpotlightComment>;
}) {
  const [showComments, setShowComments] = useState(false);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [comments, setComments] = useState<SpotlightComment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [localError, setLocalError] = useState("");

  const loadComments = async () => {
    if (commentsLoaded || isLoadingComments) {
      return;
    }

    setIsLoadingComments(true);
    setLocalError("");

    try {
      const nextComments = await onLoadComments(post.id);
      setComments(nextComments);
      setCommentsLoaded(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to load comments.";
      setLocalError(message);
    } finally {
      setIsLoadingComments(false);
    }
  };

  const handleToggleComments = async () => {
    const nextVisible = !showComments;
    setShowComments(nextVisible);

    if (nextVisible) {
      await loadComments();
    }
  };

  const handleSubmitComment = async () => {
    const trimmedText = commentText.trim();
    if (!trimmedText || isSubmittingComment) {
      return;
    }

    setIsSubmittingComment(true);
    setLocalError("");

    try {
      const createdComment = await onAddComment(post.id, trimmedText);
      setComments((prev) => [...prev, createdComment]);
      setCommentText("");
      setShowComments(true);
      setCommentsLoaded(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to add comment.";
      setLocalError(message);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  return (
    <article className="rounded-[24px] bg-white p-4 shadow-[0_14px_32px_rgba(15,23,42,0.08)] sm:p-5">
      <div className="mb-4 flex items-start gap-4">
        {post.profileHref ? (
          <Link href={post.profileHref} className="shrink-0">
            {post.avatar ? (
              <img
                src={post.avatar}
                alt={post.author}
                className="h-10 w-10 rounded-md object-cover"
              />
            ) : (
              <div className="h-10 w-10 rounded-md bg-gray-100" />
            )}
          </Link>
        ) : post.avatar ? (
            <img
              src={post.avatar}
              alt={post.author}
              className="h-10 w-10 rounded-md object-cover"
            />
        ) : (
          <div className="h-10 w-10 rounded-md bg-gray-100" />
        )}
        <div className="min-w-0">
          {post.profileHref ? (
            <Link
              href={post.profileHref}
              className="block truncate text-[15px] font-semibold leading-none text-[#222222] transition hover:text-[#0A2342] sm:text-[18px]"
            >
              {post.author}
            </Link>
          ) : (
            <h2 className="truncate text-[15px] font-semibold leading-none text-[#222222] sm:text-[18px]">
              {post.author}
            </h2>
          )}
          <p className="mt-1 text-[10px] text-[#6B7280]">{post.date}</p>
        </div>
      </div>

      {post.content ? (
        <p className="mb-4 text-[14px] leading-7 text-[#555555]">{post.content}</p>
      ) : null}

      <MediaGrid media={post.media} author={post.author} />

      <div className="mt-4 flex items-center justify-between text-[13px] text-[#6B7280]">
        <div className="flex items-center gap-3">
          {post.likedBy.length > 0 ? (
            <div className="flex -space-x-2">
              {post.likedBy.slice(0, 3).map((avatar, index) => (
                <img
                  key={`${post.id}-${avatar}-${index}`}
                  src={avatar}
                  alt="Liked by"
                  className="h-6 w-6 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
          ) : null}
          <span>{post.likeCount} Likes</span>
        </div>

        <div className="flex items-center gap-6">
          <span>{post.comments} Comments</span>
          <span>{post.shares} Shares</span>
        </div>
      </div>

      <div className="mt-4 border-t border-[#E5E7EB] pt-4">
        <div className="flex items-center justify-between text-[15px] text-[#3F3F46]">
          <button
            type="button"
            onClick={() => onToggleLike(post)}
            className={`flex items-center gap-2 transition ${
              post.isLiked ? "text-[#C0392B]" : "hover:text-[#0A2342]"
            }`}
          >
            <Heart className="h-4 w-4" fill={post.isLiked ? "currentColor" : "none"} strokeWidth={1.8} />
            <span>Like</span>
          </button>
          <button
            type="button"
            onClick={handleToggleComments}
            className="flex items-center gap-2 transition hover:text-[#0A2342]"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
            <span>Comments</span>
          </button>
          <button
            type="button"
            onClick={() => onShare(post)}
            className="flex items-center gap-2 transition hover:text-[#0A2342]"
          >
            <Share2 className="h-4 w-4" strokeWidth={1.8} />
            <span>Share</span>
          </button>
          {post.isOwnPost ? (
            <button
              type="button"
              onClick={() => onDelete(post)}
              className="flex items-center gap-2 transition hover:text-[#C0392B]"
            >
              <Trash2 className="h-4 w-4" strokeWidth={1.8} />
              <span>Delete</span>
            </button>
          ) : null}
        </div>
      </div>

      {showComments ? (
        <div className="mt-4 border-t border-[#E5E7EB] pt-4">
          {isLoadingComments ? (
            <div className="flex items-center gap-2 text-sm text-[#6B7280]">
              <LoaderCircle className="h-4 w-4 animate-spin" />
              <span>Loading comments...</span>
            </div>
          ) : comments.length > 0 ? (
            <div className="space-y-3">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-3">
                  {comment.avatar ? (
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-9 w-9 rounded-full bg-gray-100" />
                  )}
                  <div className="flex-1 rounded-[14px] bg-[#F5F5F5] px-4 py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-[#1F2937]">{comment.author}</span>
                      <span className="text-xs text-[#6B7280]">{comment.date}</span>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-[#4B5563]">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#6B7280]">No comments yet. Start the conversation.</p>
          )}

          <div className="mt-4 flex items-center gap-3">
            {currentUserAvatar ? (
              <img
                src={currentUserAvatar}
                alt={currentUserName || "Player profile"}
                className="h-10 w-10 rounded-md object-cover"
              />
            ) : (
              <div className="h-10 w-10 rounded-md bg-gray-100" />
            )}

            <div className="flex h-11 flex-1 items-center rounded-xl bg-[#F5F5F5] px-4">
              <input
                type="text"
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    void handleSubmitComment();
                  }
                }}
                placeholder="Write a comment..."
                className="flex-1 bg-transparent text-[15px] text-[#374151] outline-none placeholder:text-[#9CA3AF]"
              />
              <ImageIcon className="h-4 w-4 text-[#6B7280]" strokeWidth={1.75} />
            </div>

            <button
              type="button"
              onClick={() => void handleSubmitComment()}
              disabled={isSubmittingComment || !commentText.trim()}
              className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#0A2342] text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmittingComment ? (
                <LoaderCircle className="h-5 w-5 animate-spin" />
              ) : (
                <SendHorizontal className="h-5 w-5" strokeWidth={2} />
              )}
            </button>
          </div>

          {localError ? (
            <p className="mt-3 text-sm text-[#C0392B]">{localError}</p>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

export default function Spotlight() {
  const playerAvatar = usePlayerAvatar();
  const playerName = usePlayerDisplayName();
  const playerProfile = usePlayerProfile();
  const [posts, setPosts] = useState<SpotlightPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [actionError, setActionError] = useState("");
  const currentPlayerFallback = {
    name: playerName,
    avatar: playerAvatar,
    id: playerProfile.playerId,
    email: playerProfile.email,
  };

  const updatePost = (postId: string, updater: (post: SpotlightPost) => SpotlightPost) => {
    setPosts((prev) => prev.map((post) => (post.id === postId ? updater(post) : post)));
  };

  const loadPosts = async () => {
    setIsLoading(true);
    setPageError("");

    try {
      const globalResponse = await getPosts(20, 0);
      const globalPosts = await hydratePostMedia(
        mapResponseToPosts(globalResponse, currentPlayerFallback),
        currentPlayerFallback,
      );

      if (globalPosts.length > 0) {
        setPosts(globalPosts);
        return;
      }

      const userResponse = await getUserPosts(20, 0);
      setPosts(
        await hydratePostMedia(
          mapResponseToPosts(userResponse, currentPlayerFallback, true),
          currentPlayerFallback,
        ),
      );
    } catch (error) {
      try {
        const userResponse = await getUserPosts(20, 0);
        setPosts(
          await hydratePostMedia(
            mapResponseToPosts(userResponse, currentPlayerFallback, true),
            currentPlayerFallback,
          ),
        );
      } catch (userPostsError) {
        const message =
          userPostsError instanceof Error
            ? userPostsError.message
            : error instanceof Error
              ? error.message
              : "Failed to load spotlight posts.";
        setPageError(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadPosts();
  }, [playerAvatar, playerName, playerProfile.playerId, playerProfile.email]);

  const handleCreatePost = async (newPost: ComposerPost) => {
    setActionError("");

    setPosts((prev) => [
      {
        id: newPost.id,
        author: newPost.user.name,
        avatar: newPost.user.avatar,
        date: newPost.user.timeAgo,
        content: newPost.content,
        media: Array.isArray(newPost.image) ? newPost.image : newPost.image ? [newPost.image] : [],
        likedBy: newPost.likedBy,
        likeCount: newPost.likes,
        isLiked: newPost.isLiked,
        comments: newPost.comments,
        shares: newPost.shares,
        isOwnPost: true,
        profileHref: "/signin/player/dashboard/profile",
      },
      ...prev,
    ]);
  };

  const handleToggleLike = async (post: SpotlightPost) => {
    setActionError("");
    const nextIsLiked = !post.isLiked;

    updatePost(post.id, (currentPost) => ({
      ...currentPost,
      isLiked: nextIsLiked,
      likeCount: Math.max(0, currentPost.likeCount + (nextIsLiked ? 1 : -1)),
      likedBy: nextIsLiked
        ? [playerAvatar, ...currentPost.likedBy.filter((avatar) => avatar !== playerAvatar)].slice(0, 3)
        : currentPost.likedBy.filter((avatar) => avatar !== playerAvatar),
    }));

    try {
      await toggleLike(post.id, nextIsLiked);
    } catch (error) {
      updatePost(post.id, (currentPost) => ({
        ...currentPost,
        isLiked: post.isLiked,
        likeCount: post.likeCount,
        likedBy: post.likedBy,
      }));

      const message = error instanceof Error ? error.message : "Failed to update like.";
      setActionError(message);
    }
  };

  const handleShare = async (post: SpotlightPost) => {
    setActionError("");

    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    const shareText = post.content || "Check out this spotlight post.";

    try {
      let shareCompleted = false;

      if (navigator.share) {
        await navigator.share({
          title: "ScoutFlair Spotlight",
          text: shareText,
          url: shareUrl,
        });
        shareCompleted = true;
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        shareCompleted = true;
      }

      if (!shareCompleted) {
        throw new Error("Sharing is not supported on this device.");
      }

      await increaseShare(post.id);
      updatePost(post.id, (currentPost) => ({
        ...currentPost,
        shares: currentPost.shares + 1,
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to share post.";
      setActionError(message);
    }
  };

  const handleDeletePost = async (post: SpotlightPost) => {
    if (!post.isOwnPost) {
      return;
    }

    setActionError("");
    const previousPosts = posts;

    setPosts((currentPosts) => currentPosts.filter((currentPost) => currentPost.id !== post.id));

    try {
      await deleteSpotlightPost(post.id);
    } catch (error) {
      setPosts(previousPosts);
      const message = error instanceof Error ? error.message : "Failed to delete spotlight post.";
      setActionError(message);
    }
  };

  const handleLoadComments = async (postId: string) => {
    const response = await getPostComments(postId, 20, 0);
    return hydrateComments(mapResponseToComments(response));
  };

  const handleAddComment = async (postId: string, text: string) => {
    const response = await addComment(postId, text);
    updatePost(postId, (currentPost) => ({
      ...currentPost,
      comments: currentPost.comments + 1,
    }));

    const createdComment = mapCreatedComment(response, playerName, playerAvatar, text);
    return {
      ...createdComment,
      avatar: (await resolveStorageUrl(createdComment.avatar)) || playerAvatar,
    };
  };

  return (
    <section className="mx-auto flex w-full max-w-[860px] flex-col gap-7 px-1 pb-6">
      <PostBox onCreatePost={handleCreatePost} />

      {pageError ? (
        <div className="rounded-[20px] bg-white p-5 shadow-[0_14px_32px_rgba(15,23,42,0.08)]">
          <p className="text-sm text-[#C0392B]">{pageError}</p>
          <button
            type="button"
            onClick={() => void loadPosts()}
            className="mt-4 inline-flex items-center gap-2 rounded-[10px] border border-[#D1D5DB] px-4 py-2 text-sm font-medium text-[#0A2342] transition hover:bg-[#F8FAFC]"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </button>
        </div>
      ) : null}

      {actionError ? (
        <div className="rounded-[18px] border border-[#F2C6BF] bg-[#FFF6F4] px-4 py-3 text-sm text-[#9F2D20]">
          {actionError}
        </div>
      ) : null}

      {isLoading ? (
        <div className="rounded-[24px] bg-white p-6 shadow-[0_14px_32px_rgba(15,23,42,0.08)]">
          <div className="flex items-center gap-3 text-[#6B7280]">
            <LoaderCircle className="h-5 w-5 animate-spin" />
            <span>Loading spotlight posts...</span>
          </div>
        </div>
      ) : null}

      {!isLoading && !pageError && posts.length === 0 ? (
        <div className="rounded-[24px] bg-white p-6 shadow-[0_14px_32px_rgba(15,23,42,0.08)]">
          <p className="text-sm text-[#6B7280]">No spotlight posts yet. Share your first update from the box above.</p>
        </div>
      ) : null}

      {!isLoading && !pageError
        ? posts.map((post) => (
            <SpotlightCard
              key={post.id}
              post={post}
              currentUserAvatar={playerAvatar}
              currentUserName={playerName}
              onToggleLike={handleToggleLike}
              onShare={handleShare}
              onDelete={handleDeletePost}
              onLoadComments={handleLoadComments}
              onAddComment={handleAddComment}
            />
          ))
        : null}
    </section>
  );
}
