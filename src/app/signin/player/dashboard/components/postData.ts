export interface Post {
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


export const PostsData: Post[] = [
  {
    id: '1',
    user: {
      name: 'Peters Samuel',
      avatar: "/images/dpone.png",
      timeAgo: 'August 12, 2024 | 8:31PM'
    },
    content: 'In a world where every moment feels monetized, optimized, or squeezed for efficiency, doing nothing might seem like the ultimate waste of time. Yet, it’s in those quiet, unstructured moments that we often stumble upon the clarity we didn’t know we were missing.Think about it: some of your best ideas probably didn’t appear when you were hunched over your laptop trying to force productivity. They likely emerged while you were showering, staring out a bus window, or lying on the couch with no particular agenda.',
    image: '/images/sta.png',
    likes: 0,
    comments: 2,
    shares: 5,
    isLiked: false,
    likedBy: ['/images/angel.png', '/images/dpone.png']
  },
  {
    id: '2',
    user: {
      name: 'Sodiq Fashanu',
      avatar: '/images/angel.png',
      timeAgo: 'August 21, 2024 | 9:30PM'
    },
    content: 'Think about it: some of your best ideas probably didn’t appear when you were hunched over your laptop trying to force productivity. They likely emerged while you were showering, staring out a bus window, or lying on the couch with no particular agenda.',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=400&fit=crop',
    likes: 0,
    comments: 2,
    shares: 5,
    isLiked: false,
    likedBy: ['/images/dpthree.png', '/images/dpone.png']
  },
  {
    id: '3',
    user: {
      name: 'Maria Rodriguez',
      avatar: '/images/dpthree.png',
      timeAgo: 'August 20, 2024 | 7:45PM'
    },
    content: 'Amazing atmosphere at the stadium tonight! The energy from the crowd was absolutely electric. Nothing beats the feeling of being here live with thousands of other fans cheering for our team.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop',
    likes: 0,
    comments: 8,
    shares: 12,
    isLiked: false,
    likedBy: ['/images/dpfour.png', '/images/dpthree.png', '/images/dptwo.png']
  }
];

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
}
