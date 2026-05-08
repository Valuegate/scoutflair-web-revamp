import { NextResponse } from "next/server";

const GALLERY_API_BASE_URL = "https://scoutflair.top/api/v1/gallery";

async function parseBackendResponse(response: Response) {
  const rawBody = await response.text();

  if (!rawBody) {
    return null;
  }

  try {
    return JSON.parse(rawBody);
  } catch {
    return rawBody;
  }
}

function jsonError(message: string, status: number, details?: unknown) {
  return NextResponse.json({ error: message, details }, { status });
}

function getAuthHeader(req: Request) {
  return req.headers.get("authorization") || "";
}

async function proxyGalleryRequest(url: URL, init: RequestInit) {
  const response = await fetch(url, init);
  const payload = await parseBackendResponse(response);

  return NextResponse.json(payload, { status: response.status });
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const authHeader = getAuthHeader(req);

    if (!authHeader) {
      return jsonError("Missing Authorization header", 401);
    }

    const backendUrl = new URL(`${GALLERY_API_BASE_URL}/getUserGallery`);
    backendUrl.searchParams.set("limit", searchParams.get("limit") || "12");
    backendUrl.searchParams.set("offset", searchParams.get("offset") || "0");

    const playeremail = searchParams.get("playeremail") || "";
    if (playeremail) {
      backendUrl.searchParams.set("playeremail", playeremail);
    }

    return proxyGalleryRequest(backendUrl, {
      method: "GET",
      headers: {
        Authorization: authHeader,
        Accept: "*/*",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown gallery fetch error";
    console.error("Error fetching gallery:", message);
    return jsonError("Failed to fetch gallery", 500, message);
  }
}

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const authHeader = getAuthHeader(req);

    if (!authHeader) {
      return jsonError("Missing Authorization header", 401);
    }

    const title = searchParams.get("title") || "";
    const description = searchParams.get("description") || "";
    const file = searchParams.get("file") || "";
    const category = searchParams.get("category") || "";

    if (!title || !description || !file) {
      return jsonError("title, description, and file are required", 400);
    }

    const backendUrl = new URL(`${GALLERY_API_BASE_URL}/createMedia`);
    backendUrl.searchParams.set("title", title);
    backendUrl.searchParams.set("description", description);
    backendUrl.searchParams.set("file", file);
    if (category) {
      backendUrl.searchParams.set("category", category);
    }

    return proxyGalleryRequest(backendUrl, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown gallery creation error";
    console.error("Error creating gallery:", message);
    return jsonError("Failed to create gallery", 500, message);
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const authHeader = getAuthHeader(req);

    if (!authHeader) {
      return jsonError("Missing Authorization header", 401);
    }

    const mediaId = searchParams.get("mediaId") || "";
    if (!mediaId) {
      return jsonError("mediaId is required", 400);
    }

    const backendUrl = new URL(`${GALLERY_API_BASE_URL}/deleteTactics`);
    backendUrl.searchParams.set("mediaId", mediaId);

    return proxyGalleryRequest(backendUrl, {
      method: "DELETE",
      headers: {
        Authorization: authHeader,
        Accept: "*/*",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown gallery deletion error";
    console.error("Error deleting gallery media:", message);
    return jsonError("Failed to delete gallery media", 500, message);
  }
}
