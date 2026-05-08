import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const STORAGE_API_BASE_URL = "https://scoutflair.top/scoutflair/v1/storage";
const MAX_IMAGE_FILE_SIZE = 5 * 1024 * 1024;
const MAX_MEDIA_FILE_SIZE = 50 * 1024 * 1024;

// 1. Utility for Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type UnknownRecord = Record<string, unknown>;

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

async function parseResponseBody(response: Response) {
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

function extractFileUploadData(payload: unknown): {
  presignedUrl?: string;
  publicUrl?: string;
  fileKey?: string;
} {
  const queue: unknown[] = [payload];
  const seen = new Set<unknown>();

  while (queue.length > 0) {
    const current = queue.shift();

    if (!current || seen.has(current)) {
      continue;
    }

    seen.add(current);

    if (Array.isArray(current)) {
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

    const presignedUrl = pickString(
      current.presignedUrl,
      current.uploadUrl,
      current.signedUrl,
      current.url,
    );
    const publicUrl = pickString(
      current.publicUrl,
      current.uploadedFileUrl,
      current.fileUrl,
      current.imageUrl,
      current.url,
    );
    const fileKey = pickString(
      current.fileKey,
      current.key,
      current.imageFileKey,
      current.data,
      current.obj,
    );

    if (presignedUrl || publicUrl || fileKey) {
      return {
        presignedUrl: presignedUrl || undefined,
        publicUrl: publicUrl || undefined,
        fileKey: fileKey || undefined,
      };
    }

    ["data", "obj", "item", "result"].forEach((key) => {
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

  return {};
}

function validateImageFile(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files can be uploaded.");
  }

  if (file.size > MAX_IMAGE_FILE_SIZE) {
    throw new Error("Image must be 5MB or smaller.");
  }
}

function validateMediaFile(file: File) {
  if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
    throw new Error("Only image or video files can be uploaded.");
  }

  if (file.size > MAX_MEDIA_FILE_SIZE) {
    throw new Error("Media file must be 50MB or smaller.");
  }
}

function uploadToPresignedUrl(
  presignedUrl: string,
  file: File,
  onProgress?: (progress: number) => void,
) {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("PUT", presignedUrl);
    xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress?.(100);
        resolve();
        return;
      }

      reject(new Error(`Failed to upload file to R2 (${xhr.status}).`));
    };

    xhr.onerror = () => reject(new Error("Failed to upload file to R2."));
    xhr.send(file);
  });
}

// 2. Safe R2 Upload Function
export async function uploadFileToR2(
  file: File,
  onProgress?: (progress: number) => void,
): Promise<{ url: string; fileKey: string }> {
  return uploadFileToR2WithValidator(file, validateImageFile, onProgress);
}

export async function uploadMediaFileToR2(
  file: File,
  onProgress?: (progress: number) => void,
): Promise<{ url: string; fileKey: string }> {
  return uploadFileToR2WithValidator(file, validateMediaFile, onProgress);
}

async function uploadFileToR2WithValidator(
  file: File,
  validateFile: (file: File) => void,
  onProgress?: (progress: number) => void,
): Promise<{ url: string; fileKey: string }> {
  // SAFETY CHECK: Prevent running on the server
  if (typeof window === 'undefined') {
    throw new Error("Upload can only happen in the browser");
  }

  const token = localStorage.getItem("authToken");

  if (!token) {
    console.error("No authToken found in localStorage");
    throw new Error("No token found, please login again");
  }

  validateFile(file);

  try {
    const presignRes = await fetch(`${STORAGE_API_BASE_URL}/presign-upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        filename: file.name,
        contentType: file.type,
      }),
    });

    if (!presignRes.ok) {
      const errorText = await presignRes.text().catch(() => "Could not read error response");
      throw new Error(`Failed to get upload URL (${presignRes.status}): ${errorText}`);
    }

    const presignPayload = await parseResponseBody(presignRes);
    const uploadData = extractFileUploadData(presignPayload);

    if (!uploadData.presignedUrl || !uploadData.fileKey) {
      throw new Error("Upload URL response did not include a presignedUrl and fileKey.");
    }

    await uploadToPresignedUrl(uploadData.presignedUrl, file, onProgress);

    const completeRes = await fetch(`${STORAGE_API_BASE_URL}/upload-complete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fileKey: uploadData.fileKey,
      }),
    });

    if (!completeRes.ok) {
      const err = await completeRes.text().catch(() => "Could not read completion error");
      console.warn(`Upload complete notification failed (${completeRes.status}): ${err}`);
    }

    return {
      url: uploadData.publicUrl || URL.createObjectURL(file),
      fileKey: uploadData.fileKey,
    };

  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
}
