"use client";

import { useEffect, useState } from "react";
import {
  Heart,
  ImageIcon,
  LoaderCircle,
  MessageCircle,
  RefreshCw,
  SendHorizontal,
  Share2,
} from "lucide-react";
import PostBox from "./postBox";
import {
  addComment,
  getPostComments,
  getPosts,
  getUserPosts,
  increaseShare,
  toggleLike,
} from "@/lib/api";
import { usePlayerAvatar, usePlayerDisplayName } from "../profile/usePlayerAvatar";

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

const DEFAULT_POST_AVATAR = "/images/profile.jpeg";

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
      value.src,
      value.location,
      value.path,
    ),
  );
}

function formatDateLabel(value: unknown) {
  if (typeof value === "string" && value.trim()) {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
      return dateFormatter.format(parsed).replace(" at ", " | ");
    }

    return value.trim();
  }

  if (typeof value === "number") {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
      return dateFormatter.format(parsed).replace(" at ", " | ");
    }
  }

  return "Just now";
}

function isVideoUrl(url: string) {
  return /\.(mp4|webm|ogg|mov|m4v)$/i.test(url);
}

function mapPostRecord(record: RecordLike) {
  const user = isRecord(record.user)
    ? record.user
    : isRecord(record.createdBy)
      ? record.createdBy
      : isRecord(record.player)
        ? record.player
        : null;

  const likedBy = normalizeUrlCollection(record.likedBy);
  const commentSource = Array.isArray(record.comments) ? record.comments : [];

  const media =
    normalizeUrlCollection(record.mediaUrls).length > 0
      ? normalizeUrlCollection(record.mediaUrls)
      : normalizeUrlCollection(record.media).length > 0
        ? normalizeUrlCollection(record.media)
        : normalizeUrlCollection(record.images).length > 0
          ? normalizeUrlCollection(record.images)
          : normalizeUrlCollection(record.attachments).length > 0
            ? normalizeUrlCollection(record.attachments)
            : normalizeUrlCollection(record.image);

  return {
    id: String(record.id ?? record._id ?? record.postId ?? record.spotLightPostId ?? Date.now()),
    author: pickString(
      record.userName,
      record.author,
      user?.name,
      user?.fullName,
      user?.username,
      record.name,
    ) || "Player",
    avatar:
      pickString(
        record.userAvatar,
        record.avatar,
        user?.avatar,
        user?.profileImage,
        user?.photo,
        user?.image,
      ) || DEFAULT_POST_AVATAR,
    date: formatDateLabel(record.createdAt ?? record.updatedAt ?? record.date ?? record.timeAgo),
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
    date: formatDateLabel(record.createdAt ?? record.updatedAt ?? record.date ?? record.timeAgo),
  } satisfies SpotlightComment;
}

function mapResponseToPosts(response: unknown) {
  return extractFirstArray(response).map(mapPostRecord);
}

function mapResponseToComments(response: unknown) {
  return extractFirstArray(response).map(mapCommentRecord);
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
  onLoadComments,
  onAddComment,
}: {
  post: SpotlightPost;
  currentUserAvatar: string;
  currentUserName: string;
  onToggleLike: (post: SpotlightPost) => Promise<void>;
  onShare: (post: SpotlightPost) => Promise<void>;
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
        <img
          src={post.avatar}
          alt={post.author}
          className="h-10 w-10 rounded-md object-cover"
        />
        <div className="min-w-0">
          <h2 className="truncate text-[15px] font-semibold leading-none text-[#222222] sm:text-[18px]">
            {post.author}
          </h2>
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
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="h-9 w-9 rounded-full object-cover"
                  />
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
            <img
              src={currentUserAvatar}
              alt={currentUserName}
              className="h-10 w-10 rounded-md object-cover"
            />

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
  const [posts, setPosts] = useState<SpotlightPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [actionError, setActionError] = useState("");

  const updatePost = (postId: string, updater: (post: SpotlightPost) => SpotlightPost) => {
    setPosts((prev) => prev.map((post) => (post.id === postId ? updater(post) : post)));
  };

  const loadPosts = async () => {
    setIsLoading(true);
    setPageError("");

    try {
      const globalResponse = await getPosts(20, 0);
      const globalPosts = mapResponseToPosts(globalResponse);

      if (globalPosts.length > 0) {
        setPosts(globalPosts);
        return;
      }

      const userResponse = await getUserPosts(20, 0);
      setPosts(mapResponseToPosts(userResponse));
    } catch (error) {
      try {
        const userResponse = await getUserPosts(20, 0);
        setPosts(mapResponseToPosts(userResponse));
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
  }, []);

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

  const handleLoadComments = async (postId: string) => {
    const response = await getPostComments(postId, 20, 0);
    return mapResponseToComments(response);
  };

  const handleAddComment = async (postId: string, text: string) => {
    const response = await addComment(postId, text);
    updatePost(postId, (currentPost) => ({
      ...currentPost,
      comments: currentPost.comments + 1,
    }));

    return mapCreatedComment(response, playerName, playerAvatar, text);
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
              onLoadComments={handleLoadComments}
              onAddComment={handleAddComment}
            />
          ))
        : null}
    </section>
  );
}
