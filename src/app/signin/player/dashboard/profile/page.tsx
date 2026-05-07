"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { addComment, deleteSpotlightPost, getPlayerProfile, getPostComments, getUserPosts, increaseShare, toggleLike } from "@/lib/api";
import { usePlayerAvatar, usePlayerDisplayName, usePlayerProfile } from "./usePlayerAvatar";

type UnknownRecord = Record<string, unknown>;
const R2_PUBLIC_BASE_URL = "https://pub-cc6bfa4db4fa4eb8b3d35333dcfdca5e.r2.dev";

type ActivityPost = {
  id: string;
  date: string;
  author: string;
  avatar: string;
  media: string[];
  content: string;
  likes: number;
  isLiked: boolean;
  likedBy: string[];
  comments: number;
  shares: number;
};

type ActivityComment = {
  id: string;
  author: string;
  avatar: string;
  text: string;
  date: string;
};

type DisplayPlayerProfile = {
  fullName: string;
  avatar: string;
  biography: string;
  position: string;
  jerseyNumber: string;
  dob: string;
  nationality: string;
  preferredFoot: string;
  height: string;
  weight: string;
  status: string;
};

function isRecord(value: unknown): value is UnknownRecord {
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

function isDisplayableUrl(value: string) {
  return /^(https?:\/\/|blob:|data:|\/)/i.test(value);
}

function fileKeyToPublicUrl(value: string) {
  return `${R2_PUBLIC_BASE_URL}/${value.replace(/^\/+/, "")}`;
}

function extractPostRecords(payload: unknown): UnknownRecord[] {
  const queue: unknown[] = [payload];
  const seen = new Set<unknown>();

  while (queue.length > 0) {
    const current = queue.shift();

    if (!current || seen.has(current)) {
      continue;
    }

    seen.add(current);

    if (Array.isArray(current)) {
      const records = current.filter(isRecord);
      if (records.length > 0) {
        return records;
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

    ["data", "obj", "items", "posts", "rows", "result", "results", "content"].forEach((key) => {
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

function extractFirstRecord(payload: unknown): UnknownRecord | null {
  if (isRecord(payload)) {
    const preferredKeys = ["data", "obj", "item", "result", "profile", "player"];
    for (const key of preferredKeys) {
      if (key in payload) {
        const nested = extractFirstRecord(payload[key]);
        if (nested) {
          return nested;
        }
      }
    }

    return payload;
  }

  if (Array.isArray(payload)) {
    for (const item of payload) {
      const nested = extractFirstRecord(item);
      if (nested) {
        return nested;
      }
    }
  }

  return null;
}

function normalizeMediaUrl(value: unknown): string {
  if (typeof value === "string" && value.trim()) {
    const mediaValue = value.trim();
    return isDisplayableUrl(mediaValue) ? mediaValue : fileKeyToPublicUrl(mediaValue);
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const nestedUrl = normalizeMediaUrl(item);
      if (nestedUrl) {
        return nestedUrl;
      }
    }
    return "";
  }

  if (!isRecord(value)) {
    return "";
  }

  return normalizeMediaUrl(
    pickString(value.url, value.publicUrl, value.fileUrl, value.imageUrl, value.src, value.path, value.fileKey),
  );
}

function mapDisplayProfile(response: unknown): DisplayPlayerProfile | null {
  const record = extractFirstRecord(response);
  if (!record) {
    return null;
  }

  const imageFileKey = pickString(record.imageFileKey, record.imageUrl, record.avatarUrl, record.avatar);

  return {
    fullName: pickString(record.fullName, record.name, record.playerName),
    avatar: normalizeMediaUrl(imageFileKey),
    biography: pickString(record.biography, record.bio),
    position: pickString(record.position),
    jerseyNumber: pickString(record.jerseyNumber),
    dob: formatProfileDate(record.dob ?? record.dateOfBirth),
    nationality: pickString(record.nationality),
    preferredFoot: pickString(record.preferredFoot),
    height: pickString(record.height),
    weight: pickString(record.weight),
    status: pickString(record.currentTeam, record.status),
  };
}

function normalizeMediaUrls(value: unknown): string[] {
  if (!value) {
    return [];
  }

  if (typeof value === "string") {
    const mediaUrl = normalizeMediaUrl(value);
    return mediaUrl ? [mediaUrl] : [];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => normalizeMediaUrls(item));
  }

  if (!isRecord(value)) {
    return [];
  }

  const directMedia = normalizeMediaUrl(
    pickString(value.mediaFileKey, value.fileKey, value.url, value.publicUrl, value.fileUrl, value.imageUrl, value.src, value.path),
  );

  return directMedia ? [directMedia] : [];
}

function parsePostDate(value: unknown): Date | null {
  if (typeof value === "string" && value.trim()) {
    const rawValue = value.trim();
    const backendDateMatch = rawValue.match(
      /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::(\d{2})(?:\.\d+)?)?(?:([+-]\d{2}:?\d{2}|Z))?$/,
    );

    if (backendDateMatch) {
      const [, year, month, day, hour, minute, second = "0", timezone] = backendDateMatch;
      const parsed = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}${timezone || ""}`);
      if (!Number.isNaN(parsed.getTime())) {
        return parsed;
      }
    }

    const numericValue = Number(rawValue);
    if (!Number.isNaN(numericValue)) {
      return parsePostDate(numericValue);
    }

    const parsed = new Date(rawValue);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }

    return null;
  }

  if (typeof value === "number") {
    const timestamp = value > 0 && value < 10000000000 ? value * 1000 : value;
    const parsed = new Date(timestamp);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  return null;
}

function formatPostDate(value: unknown) {
  const rawValue = pickString(value);
  if (!rawValue) {
    return "Just now";
  }

  const parsed = parsePostDate(value);
  if (!parsed) {
    return rawValue;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(parsed)
    .replace(" at ", " | ")
    .replace(/\s(AM|PM)$/, "$1");
}

function formatProfileDate(value: unknown) {
  const rawValue = pickString(value);
  if (!rawValue) {
    return "";
  }

  const parsed = parsePostDate(rawValue);
  if (!parsed) {
    return rawValue;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

function isVideoUrl(url: string) {
  return /\.(mp4|webm|ogg|mov|m4v)$/i.test(url);
}

function mapProfilePosts(response: unknown): ActivityPost[] {
  return extractPostRecords(response).map((record, index) => {
    const media = [
      ...normalizeMediaUrls(record.mediaFileKey),
      ...normalizeMediaUrls(record.mediaFileKeys),
      ...normalizeMediaUrls(record.mediaUrls),
      ...normalizeMediaUrls(record.media),
    ];
    const firstMediaRecord = Array.isArray(record.mediaFileKey) && isRecord(record.mediaFileKey[0])
      ? record.mediaFileKey[0]
      : null;
    const mediaUser = firstMediaRecord && isRecord(firstMediaRecord.user) ? firstMediaRecord.user : null;

    return {
      id: pickString(record.id, record.postId, record.spotLightPostId, record._id) || `${Date.now()}-${index}`,
      date: formatPostDate(record.dateCreated ?? record.createdDate ?? record.createdAt ?? record.updatedAt ?? record.date ?? record.timeAgo),
      author:
        pickString(record.userFullName, record.fullName, record.userName, mediaUser?.fullName, mediaUser?.username) ||
        "Player",
      avatar:
        normalizeMediaUrl(record.userProfilePicUrl) ||
        normalizeMediaUrl(record.userAvatar) ||
        normalizeMediaUrl(record.avatar) ||
        normalizeMediaUrl(mediaUser?.imageUrl),
      media,
      content: pickString(record.text, record.content, record.caption, record.description),
      likes: pickNumber(record.likeCount, record.likesCount, record.totalLikes, record.likes),
      isLiked: pickBoolean(record.isLiked, record.liked, record.hasLiked),
      likedBy: normalizeMediaUrls(record.likedBy),
      comments: pickNumber(record.commentCount, record.commentsCount, record.totalComments, record.comments),
      shares: pickNumber(record.shareCount, record.sharesCount, record.totalShares, record.shares),
    };
  });
}

function mapProfileComments(response: unknown): ActivityComment[] {
  return extractPostRecords(response).map((record, index) => {
    const user = isRecord(record.user)
      ? record.user
      : isRecord(record.createdBy)
        ? record.createdBy
        : null;

    return {
      id: pickString(record.id, record.commentId, record._id) || `${Date.now()}-${index}`,
      author:
        pickString(record.userFullName, record.userName, record.author, user?.fullName, user?.username, user?.name) ||
        "Player",
      avatar:
        normalizeMediaUrl(record.userProfilePicUrl) ||
        normalizeMediaUrl(record.userAvatar) ||
        normalizeMediaUrl(record.avatar) ||
        normalizeMediaUrl(user?.imageUrl) ||
        normalizeMediaUrl(user?.avatar),
      text: pickString(record.text, record.comment, record.content),
      date: formatPostDate(record.dateCreated ?? record.createdDate ?? record.createdAt ?? record.commentDate ?? record.timeAgo),
    };
  });
}

function mapCreatedProfileComment(response: unknown, fallbackName: string, fallbackAvatar: string, text: string) {
  const createdComment = mapProfileComments(response)[0];

  if (createdComment) {
    return createdComment;
  }

  return {
    id: `${Date.now()}`,
    author: fallbackName,
    avatar: fallbackAvatar,
    text,
    date: "Just now",
  } satisfies ActivityComment;
}

function ProfilePostMedia({ media, author }: { media: string[]; author: string }) {
  if (media.length === 0) {
    return null;
  }

  return (
    <div className={`mb-4 grid gap-2 ${media.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
      {media.map((item, index) => (
        <div key={`${item}-${index}`} className="overflow-hidden rounded-lg bg-gray-100">
          {isVideoUrl(item) ? (
            <video
              src={item}
              controls
              className={`${media.length > 1 ? "h-40 sm:h-48" : "max-h-80"} w-full object-cover`}
            />
          ) : (
            <img
              src={item}
              alt={`${author} post ${index + 1}`}
              className={`${media.length > 1 ? "h-40 sm:h-48" : "max-h-80"} w-full object-cover`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function ProfileActivityPostCard({
  post,
  currentUserAvatar,
  currentUserName,
  onToggleLike,
  onShare,
  onDelete,
  onLoadComments,
  onAddComment,
}: {
  post: ActivityPost;
  currentUserAvatar: string;
  currentUserName: string;
  onToggleLike: (post: ActivityPost) => Promise<void>;
  onShare: (post: ActivityPost) => Promise<void>;
  onDelete: (post: ActivityPost) => Promise<void>;
  onLoadComments: (postId: string) => Promise<ActivityComment[]>;
  onAddComment: (postId: string, text: string) => Promise<ActivityComment>;
}) {
  const [showComments, setShowComments] = useState(false);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [comments, setComments] = useState<ActivityComment[]>([]);
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
      setLocalError(error instanceof Error ? error.message : "Failed to load comments.");
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
      setLocalError(error instanceof Error ? error.message : "Failed to add comment.");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        {post.avatar || currentUserAvatar ? (
          <img
            src={post.avatar || currentUserAvatar}
            alt={post.author || currentUserName || "Player profile"}
            className="h-9 w-9 rounded object-cover"
          />
        ) : (
          <div className="h-9 w-9 rounded bg-gray-100" />
        )}

        <div className="flex flex-col">
          <div className="text-sm font-bold text-black">{post.author || currentUserName}</div>
          <div className="text-xs text-gray-500">{post.date}</div>
        </div>
      </div>

      {post.content ? (
        <p className="mb-4 text-xs leading-relaxed text-black">{post.content}</p>
      ) : null}

      <ProfilePostMedia media={post.media} author={post.author || currentUserName} />

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center -space-x-1">
          {post.likedBy.slice(0, 3).map((avatar, index) => (
            <img
              key={`${post.id}-${avatar}-${index}`}
              src={avatar}
              alt="Liked by"
              className="h-5 w-5 rounded-full border border-white object-cover"
            />
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>{post.likes} Likes</span>
          <span>{post.comments} Comments</span>
          <span>{post.shares} Shares</span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-3">
        <div className="flex items-center justify-around">
          <button
            type="button"
            onClick={() => void onToggleLike(post)}
            className={`flex items-center gap-2 rounded px-3 py-2 text-xs font-medium hover:bg-gray-50 ${
              post.isLiked ? "text-[#C0392B]" : "text-black"
            }`}
          >
            <svg width="12" height="12" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 14.25l-1.45-1.32C3.4 9.36 1 7.28 1 4.5 1 2.42 2.42 1 4.5 1c1.74 0 3.41.81 4.5 2.09C10.09 1.81 11.76 1 13.5 1 15.58 1 17 2.42 17 4.5c0 2.78-2.4 4.86-5.55 8.43L8 14.25z"
                stroke="currentColor"
                strokeWidth="1"
                fill={post.isLiked ? "currentColor" : "none"}
              />
            </svg>
            <span>Like</span>
          </button>

          <button
            type="button"
            onClick={() => void handleToggleComments()}
            className="flex items-center gap-2 rounded px-3 py-2 text-xs font-medium text-black hover:bg-gray-50"
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H2C1.45 2 1 2.45 1 3v7c0 .55.45 1 1 1h9l3 3V3c0-.55-.45-1-1-1z" stroke="black" strokeWidth="0.76" fill="none" />
            </svg>
            <span>Comment</span>
          </button>

          <button
            type="button"
            onClick={() => void onShare(post)}
            className="flex items-center gap-2 rounded px-3 py-2 text-xs font-medium text-black hover:bg-gray-50"
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1.5L12 5.5H9v6H7v-6H4l4-4z" stroke="black" strokeWidth="1" fill="black" />
            </svg>
            <span>Share</span>
          </button>

          <button
            type="button"
            onClick={() => void onDelete(post)}
            className="flex items-center gap-2 rounded px-3 py-2 text-xs font-medium text-[#C0392B] hover:bg-red-50"
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4h12M6 4V2h4v2m3 0l-.7 9.1A1 1 0 0111.3 14H4.7a1 1 0 01-1-.9L3 4m3 3v4m4-4v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Delete</span>
          </button>
        </div>
      </div>

      {showComments ? (
        <div className="mt-4 border-t border-gray-200 pt-4">
          {isLoadingComments ? (
            <p className="text-sm text-gray-500">Loading comments...</p>
          ) : comments.length > 0 ? (
            <div className="space-y-3">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-3">
                  {comment.avatar ? (
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gray-100" />
                  )}
                  <div className="flex-1 rounded-lg bg-gray-50 px-3 py-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-black">{comment.author}</span>
                      <span className="text-[11px] text-gray-500">{comment.date}</span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-gray-700">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No comments yet.</p>
          )}

          <div className="mt-4 flex items-center gap-3">
            {currentUserAvatar ? (
              <img
                src={currentUserAvatar}
                alt={currentUserName || "Player profile"}
                className="h-9 w-9 rounded object-cover"
              />
            ) : (
              <div className="h-9 w-9 rounded bg-gray-100" />
            )}
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
              className="h-10 flex-1 rounded-lg bg-gray-50 px-3 text-sm text-black outline-none placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={() => void handleSubmitComment()}
              disabled={isSubmittingComment || !commentText.trim()}
              className="h-10 rounded-lg bg-[#0A2A56] px-4 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmittingComment ? "Posting" : "Post"}
            </button>
          </div>

          {localError ? (
            <p className="mt-3 text-sm text-[#C0392B]">{localError}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

const socialPlatforms = [
  {
    label: "Instagram",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-full h-full">
        <defs>
          <linearGradient id="ig-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#f09433" }} />
            <stop offset="25%" style={{ stopColor: "#e6683c" }} />
            <stop offset="50%" style={{ stopColor: "#dc2743" }} />
            <stop offset="75%" style={{ stopColor: "#cc2366" }} />
            <stop offset="100%" style={{ stopColor: "#bc1888" }} />
          </linearGradient>
        </defs>
        <path
          fill="url(#ig-gradient)"
          d="M349.33 69.33H162.67A93.34 93.34 0 0 0 69.33 162.67v186.66a93.34 93.34 0 0 0 93.34 93.34h186.66a93.34 93.34 0 0 0 93.34-93.34V162.67a93.34 93.34 0 0 0-93.34-93.34ZM256 346.67a90.67 90.67 0 1 1 90.67-90.67 90.76 90.76 0 0 1-90.67 90.67Zm93.33-162.67a21.33 21.33 0 1 1 21.34-21.33 21.34 21.34 0 0 1-21.34 21.33Z"
        />
      </svg>
    ),
  },
  {
    label: "TikTok",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full">
        <path d="M12 0h4a6 6 0 0 0 6 6v4a9.99 9.99 0 0 1-6-2v10a6 6 0 1 1-6-6h2v4a2 2 0 1 0 2 2V0z" fill="#000" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full">
        <path
          d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
          fill="#1877F2"
        />
      </svg>
    ),
  },
  {
    label: "Twitter",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full">
        <path
          d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.027 10.027 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"
          fill="#1DA1F2"
        />
      </svg>
    ),
  },
] as const;

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const viewedPlayerEmail = searchParams.get("playerEmail") || "";
  const playerAvatar = usePlayerAvatar();
  const playerName = usePlayerDisplayName();
  const playerDetails = usePlayerProfile();
  const [activityPosts, setActivityPosts] = useState<ActivityPost[]>([]);
  const [viewedProfile, setViewedProfile] = useState<DisplayPlayerProfile | null>(null);
  const [profileError, setProfileError] = useState("");
  const isViewingAnotherPlayer =
    Boolean(viewedPlayerEmail) &&
    viewedPlayerEmail.trim().toLowerCase() !== playerDetails.email.trim().toLowerCase();

  const displayProfile: DisplayPlayerProfile = isViewingAnotherPlayer && viewedProfile
      ? viewedProfile
      : {
        fullName: playerName,
        avatar: playerAvatar,
        biography: playerDetails.biography,
        position: playerDetails.position,
        jerseyNumber: playerDetails.jerseyNumber,
        dob: formatProfileDate(playerDetails.dob),
        nationality: playerDetails.nationality,
        preferredFoot: playerDetails.preferredFoot,
        height: playerDetails.height,
        weight: playerDetails.weight,
        status: playerDetails.currentTeam,
      };
  const isProfilePending = !profileError && !displayProfile.fullName && !displayProfile.avatar;

  useEffect(() => {
    let active = true;

    const loadViewedProfile = async () => {
      if (!isViewingAnotherPlayer) {
        setViewedProfile(null);
        setProfileError("");
        return;
      }

      try {
        const response = await getPlayerProfile(viewedPlayerEmail);
        const nextProfile = mapDisplayProfile(response);

        if (active) {
          setViewedProfile(nextProfile);
          setProfileError(nextProfile ? "" : "Player profile was not found.");
        }
      } catch (error) {
        if (active) {
          setViewedProfile(null);
          setProfileError(error instanceof Error ? error.message : "Failed to load player profile.");
        }
      }
    };

    void loadViewedProfile();

    return () => {
      active = false;
    };
  }, [isViewingAnotherPlayer, viewedPlayerEmail]);

  useEffect(() => {
    let active = true;

    const loadUserPosts = async () => {
      if (isViewingAnotherPlayer) {
        if (active) {
          setActivityPosts([]);
        }
        return;
      }

      try {
        const response = await getUserPosts(10, 0);
        const nextPosts = mapProfilePosts(response);

        if (active) {
          setActivityPosts(nextPosts);
        }
      } catch {
        if (active) {
          setActivityPosts([]);
        }
      }
    };

    void loadUserPosts();

    return () => {
      active = false;
    };
  }, [isViewingAnotherPlayer]);

  const updateActivityPost = (postId: string, updater: (post: ActivityPost) => ActivityPost) => {
    setActivityPosts((prev) => prev.map((post) => (post.id === postId ? updater(post) : post)));
  };

  const handleToggleLike = async (post: ActivityPost) => {
    const nextIsLiked = !post.isLiked;

    updateActivityPost(post.id, (currentPost) => ({
      ...currentPost,
      isLiked: nextIsLiked,
      likes: Math.max(0, currentPost.likes + (nextIsLiked ? 1 : -1)),
      likedBy: nextIsLiked
        ? [playerAvatar, ...currentPost.likedBy.filter((avatar) => avatar !== playerAvatar)].slice(0, 3)
        : currentPost.likedBy.filter((avatar) => avatar !== playerAvatar),
    }));

    try {
      await toggleLike(post.id, nextIsLiked);
    } catch {
      updateActivityPost(post.id, () => post);
    }
  };

  const handleShare = async (post: ActivityPost) => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    const shareText = post.content || "Check out this spotlight post.";

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: "ScoutFlair Spotlight",
          text: shareText,
          url: shareUrl,
        });
      } else if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      }

      await increaseShare(post.id);
      updateActivityPost(post.id, (currentPost) => ({
        ...currentPost,
        shares: currentPost.shares + 1,
      }));
    } catch {
      updateActivityPost(post.id, (currentPost) => currentPost);
    }
  };

  const handleLoadComments = async (postId: string) => {
    const response = await getPostComments(postId, 20, 0);
    return mapProfileComments(response);
  };

  const handleAddComment = async (postId: string, text: string) => {
    const response = await addComment(postId, text);

    updateActivityPost(postId, (currentPost) => ({
      ...currentPost,
      comments: currentPost.comments + 1,
    }));

    return mapCreatedProfileComment(response, playerName, playerAvatar, text);
  };

  const handleDeletePost = async (post: ActivityPost) => {
    const previousPosts = activityPosts;
    setActivityPosts((currentPosts) => currentPosts.filter((currentPost) => currentPost.id !== post.id));

    try {
      await deleteSpotlightPost(post.id);
    } catch {
      setActivityPosts(previousPosts);
    }
  };

  const aboutItems = [
    {
      label: "Name",
      value: displayProfile.fullName,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5.121 17.804A10.97 10.97 0 0112 15c2.5 0 4.847.8 6.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      ),
    },
    {
      label: "Date of Birth",
      value: displayProfile.dob,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      ),
    },
    {
      label: "Nationality",
      value: displayProfile.nationality,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 5v14m0-14a5 5 0 015-5h8v6h-8a5 5 0 01-5-5z"
        />
      ),
    },
    {
      label: "Preferred Foot",
      value: displayProfile.preferredFoot,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5l7 7-7 7"
        />
      ),
    },
    {
      label: "Height",
      value: displayProfile.height,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M7 21V3h10v18H7z"
        />
      ),
    },
    {
      label: "Weight",
      value: displayProfile.weight,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v8m8-8v8m-4-4h-8"
        />
      ),
    },
    {
      label: "Status",
      value: displayProfile.status,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 12l5-5 5 5-5 5-5-5z"
        />
      ),
    },
  ] as const;

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="relative mb-6 w-full rounded-xl bg-white shadow-sm">
        <div className="relative h-40 w-full sm:h-48 md:h-56">
          <img
            src="/images/grass.jpg"
            alt="Profile cover"
            className="h-32 w-full rounded-t-xl object-cover sm:h-40 md:h-48"
          />

          <div className="absolute bottom-0 left-4 translate-y-1/2 transform">
            {displayProfile.avatar ? (
              <img
                src={displayProfile.avatar}
                alt={displayProfile.fullName || "Player profile"}
                className="mt-[-30px] h-16 w-16 rounded-full border-3 border-[#0A2A56] bg-white object-cover sm:h-20 sm:w-20 md:h-24 md:w-24"
              />
            ) : (
              <div className="mt-[-30px] h-16 w-16 rounded-full border-3 border-[#0A2A56] bg-gray-100 sm:h-20 sm:w-20 md:h-24 md:w-24" />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 px-4 pt-10 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-lg font-bold text-black sm:text-xl">
              {displayProfile.fullName || (isProfilePending ? "Loading profile..." : "Player")}
            </h1>
            <div className="flex flex-col gap-1 text-sm text-gray-600">
              {displayProfile.position || displayProfile.jerseyNumber ? (
                <span>
                  {[displayProfile.position, displayProfile.jerseyNumber ? `No. ${displayProfile.jerseyNumber}` : ""]
                    .filter(Boolean)
                    .join(", ")}
                </span>
              ) : null}
            </div>
          </div>

          {isViewingAnotherPlayer ? (
            <button className="w-full rounded-lg bg-[#0A2A56] px-6 py-2 text-sm font-semibold text-white hover:opacity-90 sm:w-auto">
              Contact Player
            </button>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="w-full rounded-xl bg-white p-4 shadow-sm lg:w-96 xl:w-[460px]">
          <h2 className="mb-4 text-lg font-bold text-black">Player Details</h2>

          <div className="mb-6">
            <h3 className="mb-2 text-sm font-medium text-black">Biography</h3>
            <p className="text-xs leading-relaxed text-black opacity-80">
              {profileError || displayProfile.biography || (isProfilePending ? "Loading profile..." : "No biography added yet.")}
            </p>
          </div>

          <div className="mb-6 border-t border-gray-200 pt-4">
            <div
              style={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 500,
                fontSize: 14,
                color: "#000000",
                marginBottom: "16px",
              }}
            >
              About
            </div>

            <div className="flex flex-col gap-4">
              {aboutItems.filter((item) => item.value).map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#D2F0FA]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="black">
                      {item.icon}
                    </svg>
                  </div>
                  <span className="text-[12px] font-medium leading-[18px] text-black">{item.value}</span>
                </div>
              ))}
              {aboutItems.every((item) => !item.value) ? (
                <p className="text-xs text-gray-500">{isProfilePending ? "Loading profile details..." : "No profile details added yet."}</p>
              ) : null}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="mb-4 text-sm font-medium text-black">Social Media</h3>

            <div className="flex flex-wrap gap-2">
              {socialPlatforms.map((platform) => (
                <div
                  key={platform.label}
                  className="flex items-center justify-center gap-1 rounded-xl border border-gray-300 bg-white px-2 py-1 md:gap-2 md:px-3 md:py-1.5"
                >
                  <div className="h-3 w-3 flex-shrink-0 md:h-3 md:w-3">{platform.icon}</div>
                  <span className="text-xs font-medium text-black md:text-xs">{platform.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-6">
          {activityPosts.length === 0 ? (
            <div className="rounded-xl bg-white p-4 text-sm text-gray-500 shadow-sm">
              No spotlight posts yet.
            </div>
          ) : activityPosts.map((post) => (
            <ProfileActivityPostCard
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
          ))}
        </div>
      </div>
    </div>
  );
}
