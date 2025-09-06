// lib/spotlight.ts
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

// Helper: get auth token from localStorage
const getAuthToken = () => localStorage.getItem('authToken');

// Fetch spotlight posts
export const getSpotlightPosts = async (limit = 10, offset = 0) => {
  const token = getAuthToken();
  const res = await axios.get(`${API_BASE}/api/v1/spotLights/posts?limit=${limit}&offset=${offset}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Create a new spotlight post
export const createSpotlightPost = async (content: string, images: string[] = []) => {
  const token = getAuthToken();
  const formData = new FormData();
  formData.append('content', content);
  images.forEach((img) => formData.append('images', img)); // adjust key if API differs

  const res = await axios.post(`${API_BASE}/api/v1/spotLights/post/create`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Like or unlike a post
export const toggleSpotlightLike = async (postId: string) => {
  const token = getAuthToken();
  const res = await axios.post(`${API_BASE}/api/v1/spotLights/post/${postId}/like`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Add a comment to a post
export const addSpotlightComment = async (postId: string, text: string) => {
  const token = getAuthToken();
  const res = await axios.post(
    `${API_BASE}/api/v1/spotLights/post/${postId}/comment`,
    { text },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// Share a post
export const shareSpotlightPost = async (postId: string) => {
  const token = getAuthToken();
  const res = await axios.post(`${API_BASE}/api/v1/spotLights/post/${postId}/share`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Fetch comments for a post
export const getSpotlightComments = async (postId: string, limit = 10, offset = 0) => {
  const token = getAuthToken();
  const res = await axios.get(`${API_BASE}/api/v1/spotLights/post/${postId}/comments?limit=${limit}&offset=${offset}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
