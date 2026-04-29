// src/lib/api.ts

// --- Define the FULL BASE URL for ALL endpoints ---
// We assume all API calls should go directly to the production backend
const API_BASE_URL = 'https://scoutflair.top/api/v1';

type QueryValue = string | number | boolean | null | undefined;

function buildQueryString(params: Record<string, QueryValue>) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    searchParams.set(key, String(value));
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

async function parseApiResponse(res: Response) {
  const rawBody = await res.text();

  if (!rawBody) {
    return null;
  }

  try {
    return JSON.parse(rawBody);
  } catch {
    return rawBody;
  }
}

// --- apiFetch ---
// Now uses the absolute URL
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  // Construct the full URL using the base URL
  const fullUrl = `${API_BASE_URL}/${endpoint}`;
  console.log(`apiFetch Request: ${options.method || 'GET'} ${fullUrl}`); // Log the full URL

  const res = await fetch(fullUrl, { // Use the absolute URL
    ...options,
    headers,
  });

  const responseBody = await parseApiResponse(res);

  if (!res.ok) {
    let errorMessage = `Error ${res.status}`;
    if (responseBody && typeof responseBody === "object" && "message" in responseBody) {
      errorMessage = String(responseBody.message || errorMessage);
    }
    console.error(`apiFetch Error for ${endpoint}: ${errorMessage}`);
    throw new Error(errorMessage);
  }

  return responseBody;
}


// --- fetchWithAuth ---
// Also uses the consistent base URL for clarity (although only for spotlights currently)
// If you add non-spotlight endpoints later, you might call apiFetch instead
const API_BASE_SPOTLIGHTS = `${API_BASE_URL}/spotLights`; // Use the main base URL

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('authToken');
  
  console.log("fetchWithAuth using token:", token ? `Bearer ${token.substring(0,10)}...` : 'No Token Found');

  const fullUrl = `${API_BASE_SPOTLIGHTS}${url}`;
  console.log(`fetchWithAuth Request: ${options.method || 'GET'} ${fullUrl}`);

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const responseBody = await parseApiResponse(res);

  if (!res.ok) {
    let errorMessage = `Error ${res.status}: ${res.statusText}`;
    if (responseBody && typeof responseBody === "object" && "message" in responseBody) {
      errorMessage = String(responseBody.message || errorMessage);
    }
    console.error(`fetchWithAuth Error for ${url}: ${errorMessage}`);
    throw new Error(errorMessage);
  }

  return responseBody;
}

// POSTS
export async function getPosts(limit = 10, offset = 0) {
  return fetchWithAuth(`/getPosts?limit=${limit}&offset=${offset}`);
}

export async function getUserPosts(limit = 10, offset = 0) {
  return fetchWithAuth(`/getUserPosts?limit=${limit}&offset=${offset}`);
}

export async function getUserPostsByScout(params: {
  limit?: number;
  offset?: number;
  playerMail?: string;
} = {}) {
  const { limit = 10, offset = 0, playerMail } = params;
  const query = buildQueryString({ limit, offset, playerMail });
  return fetchWithAuth(`/getUserPostsByScout${query}`);
}

// Updated to accept mediaFileKeys
export async function addPost(text: string, mediaFileKeys: string[] = []) {
  return fetchWithAuth(`/addPost`, {
    method: 'POST',
    body: JSON.stringify({ text, mediaFileKeys }), // Send keys
  });
}

// COMMENTS
export async function getPostComments(postId: string, limit = 10, offset = 0) {
  return fetchWithAuth(
    `/getPostComments?limit=${limit}&offset=${offset}&postId=${postId}`
  );
}

export async function addComment(postId: string, text: string) {
  return fetchWithAuth(`/addComment`, {
    method: 'POST',
    body: JSON.stringify({ postId, text }),
  });
}

// LIKE
export async function toggleLike(postId: string, like: boolean) {
  return fetchWithAuth(`/like/increaseOrDecreaseCount`, {
    method: 'PUT',
    body: JSON.stringify({ spotLightPostId: postId, like }),
  });
}

// SHARE
export async function increaseShare(postId: string) {
  return fetchWithAuth(`/share/increaseCount`, {
    method: 'PUT',
    body: JSON.stringify({ spotLightPostId: postId }),
  });
}

