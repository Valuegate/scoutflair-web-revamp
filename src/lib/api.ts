// src/lib/api.ts

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`https://scoutflair.top/api/v1/${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let errorMessage = `Error ${res.status}`;
    try {
      const errData = await res.json();
      errorMessage = errData.message || errorMessage;
    } catch {}
    throw new Error(errorMessage);
  }

  return res.json();
}

const API_BASE = '/api/v1/spotLights';

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  return res.json();
}

// POSTS
export async function getPosts(limit = 10, offset = 0) {
  return fetchWithAuth(`/getPosts?limit=${limit}&offset=${offset}`);
}

export async function addPost(text: string, mediaUrls: string[] = []) {
  return fetchWithAuth(`/addPost`, {
    method: 'POST',
    body: JSON.stringify({ text, mediaUrls }),
  });
}

// COMMENTS
export async function getPostComments(postId: number, limit = 10, offset = 0) {
  return fetchWithAuth(
    `/getPostComments?limit=${limit}&offset=${offset}&postId=${postId}`
  );
}

export async function addComment(postId: number, text: string) {
  return fetchWithAuth(`/addComment`, {
    method: 'POST',
    body: JSON.stringify({ postId, text }),
  });
}

// LIKE
export async function toggleLike(postId: number, like: boolean) {
  return fetchWithAuth(`/like/increaseOrDecreaseCount`, {
    method: 'POST',
    body: JSON.stringify({ spotLightPostId: postId, like }),
  });
}

// SHARE
export async function increaseShare(postId: number) {
  return fetchWithAuth(`/share/increaseCount`, {
    method: 'POST',
    body: JSON.stringify({ spotLightPostId: postId }),
  });
}