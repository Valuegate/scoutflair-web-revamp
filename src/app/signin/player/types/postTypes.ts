
export interface PostType {
  id: string;
  user: {
    name: string;
    avatar: string;
    timeAgo: string;
  };
  content: string;
  image: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  likedBy: string[];
}