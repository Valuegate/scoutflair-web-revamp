import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// 1. Utility for Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 2. Safe R2 Upload Function
export async function uploadFileToR2(file: File): Promise<{ url: string; fileKey: string }> {
  // SAFETY CHECK: Prevent running on the server
  if (typeof window === 'undefined') {
    throw new Error("Upload can only happen in the browser");
  }

  const token = localStorage.getItem("authToken");

  if (!token) {
    console.error("No authToken found in localStorage");
    throw new Error("No token found, please login again");
  }

  try {
    // Step 1: Get presigned URL
    console.log("=== STEP 1: Getting presigned URL ===");
    const body = {
      filename: file.name,
      contentType: file.type,
    };
    
    const res = await fetch("/scoutflair/v1/storage/presign-upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.error("=== PRESIGNED URL FAILED ===");
      const errorText = await res.text().catch(() => "Could not read error response");
      console.error("Error response body:", errorText);
      throw new Error(`Failed to get presigned URL (${res.status}): ${errorText}`);
    }

    let uploadData;
    try {
      uploadData = await res.json();
    } catch (e) {
      console.error("Failed to parse success response as JSON:", e);
      throw new Error("Invalid response from presign-upload endpoint");
    }
    
    const { presignedUrl, publicUrl, fileKey } = uploadData;

    // Step 2: Upload file to R2
    console.log("Uploading file to R2...");
    const uploadRes = await fetch(presignedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!uploadRes.ok) {
      console.error("R2 upload failed:", uploadRes.status, uploadRes.statusText);
      const errorText = await uploadRes.text().catch(() => "Could not read error");
      throw new Error(`Failed to upload file to R2 (${uploadRes.status}): ${errorText}`);
    }

    console.log("File uploaded to R2 successfully");

    // Step 3: Notify backend
    console.log("Notifying backend of upload completion...");
    const completeRes = await fetch("/scoutflair/v1/storage/upload-complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fileKey: fileKey,
      }),
    });

    if (!completeRes.ok) {
      const err = await completeRes.text();
      console.warn(`Upload complete notification failed (${completeRes.status}): ${err}`);
    }

    return { 
      url: publicUrl,
      fileKey: fileKey
    };

  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
}