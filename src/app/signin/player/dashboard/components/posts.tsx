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

export const postsData: Post[] = [
  {
    id: '1',
    user: {
      name: 'Peters Samuel',
      avatar: '/api/placeholder/50/50',
      timeAgo: 'August 12, 2024 | 8:31PM'
    },
    content: '',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=400&fit=crop',
    likes: 0,
    comments: 2,
    shares: 5,
    isLiked: false,
    likedBy: ['/api/placeholder/24/24', '/api/placeholder/24/24']
  },
  {
    id: '2',
    user: {
      name: 'Sodiq Fashanu',
      avatar: '/api/placeholder/50/50',
      timeAgo: 'August 21, 2024 | 9:30PM'
    },
    content: "In a world where every moment feels monetized, optimized, or squeezed for efficiency, doing nothing might seem like the ultimate waste of time. Yet, it’s in those quiet, unstructured moments that we often stumble upon the clarity we didn’t know we were missing.",
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=400&fit=crop',
    likes: 0,
    comments: 2,
    shares: 5,
    isLiked: false,
    likedBy: ['/api/placeholder/24/24', '/api/placeholder/24/24']
  },
  {
    id: '3',
    user: {
      name: 'Maria Rodriguez',
      avatar: '/api/placeholder/50/50',
      timeAgo: 'August 20, 2024 | 7:45PM'
    },
    content: 'Amazing atmosphere at the stadium tonight! The energy from the crowd was absolutely electric. Nothing beats the feeling of being here live with thousands of other fans cheering for our team.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop',
    likes: 0,
    comments: 8,
    shares: 12,
    isLiked: false,
    likedBy: ['/api/placeholder/24/24', '/api/placeholder/24/24', '/api/placeholder/24/24']
  }
];