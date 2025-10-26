// src/lib/api.ts

// --- apiFetch ---
// Uses relative path, assuming next.config.js rewrites handle it for profile endpoints
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  // Keep this relative - relies on next.config.js rewrite for /api/v1/profile/*
  const res = await fetch(`/api/v1/${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let errorMessage = `Error ${res.status}`;
    try {
      const errData = await res.json();
      errorMessage = errData.message || errorMessage;
    } catch {}
    console.error(`apiFetch Error for ${endpoint}: ${errorMessage}`); // Added more specific logging
    throw new Error(errorMessage);
  }

  return res.json();
}


// --- fetchWithAuth ---
// Define the FULL BASE URL for spotlights endpoints
const API_BASE_SPOTLIGHTS = 'https://scoutflair.top/api/v1/spotLights'; // Reverted to absolute URL

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  // Uses "authToken" consistent with login and apiFetch
  const token = localStorage.getItem('authToken');
  
  // Log the token being used for debugging
  console.log("fetchWithAuth using token:", token ? `Bearer ${token.substring(0,10)}...` : 'No Token Found');

  // Construct the full URL
  const fullUrl = `${API_BASE_SPOTLIGHTS}${url}`;
  console.log(`fetchWithAuth Request: ${options.method || 'GET'} ${fullUrl}`);

  const res = await fetch(fullUrl, { // Use the absolute URL
    ...options,
    headers: {
      'Content-Type': 'application/json',
      // Ensure Authorization header is added correctly ONLY if token exists
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    let errorMessage = `Error ${res.status}: ${res.statusText}`;
     try {
       const errData = await res.json();
       errorMessage = errData.message || errorMessage;
     } catch {}
    console.error(`fetchWithAuth Error for ${url}: ${errorMessage}`); // Added logging
    throw new Error(errorMessage);
  }
  return res.json();
}

// POSTS
export async function getPosts(limit = 10, offset = 0) {
  return fetchWithAuth(`/getPosts?limit=${limit}&offset=${offset}`);
}

// Updated to accept mediaFileKeys
export async function addPost(text: string, mediaFileKeys: string[] = []) {
  return fetchWithAuth(`/addPost`, {
    method: 'POST',
    body: JSON.stringify({ text, mediaFileKeys }), // Send keys
  });
}

// COMMENTS
export async function getPostComments(postId: string, limit = 10, offset = 0) { // Changed postId to string based on PostBox
  return fetchWithAuth(
    `/getPostComments?limit=${limit}&offset=${offset}&postId=${postId}`
  );
}

export async function addComment(postId: string, text: string) { // Changed postId to string
  return fetchWithAuth(`/addComment`, {
    method: 'POST',
    body: JSON.stringify({ postId, text }),
  });
}

// LIKE
export async function toggleLike(postId: string, like: boolean) { // Changed postId to string
  return fetchWithAuth(`/like/increaseOrDecreaseCount`, {
    method: 'POST',
    body: JSON.stringify({ spotLightPostId: postId, like }),
  });
}

// SHARE
export async function increaseShare(postId: string) { // Changed postId to string
  return fetchWithAuth(`/share/increaseCount`, {
    method: 'POST',
    body: JSON.stringify({ spotLightPostId: postId }),
  });
}

