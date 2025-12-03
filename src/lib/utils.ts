import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ✅ Upload to R2 / backend
export async function uploadFileToR2(file: File) {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Missing auth token");

    // 1️⃣ Get presigned upload URL
    const presignRes = await fetch("https://scoutflair.top/scoutflair/v1/file/picture/presign-upload", {
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

    if (!presignRes.ok) throw new Error(`Presign failed (${presignRes.status})`);

    const presignData = await presignRes.json();
    console.log("Presign response:", presignData);

    const uploadUrl = presignData.presignedUrl || presignData.uploadUrl;
    if (!uploadUrl) throw new Error("No upload URL in response");

    // 2️⃣ Upload the actual file to R2
    const uploadRes = await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });

    if (!uploadRes.ok) throw new Error(`Upload failed (${uploadRes.status})`);

    // 3️⃣ Notify backend that upload is done
   const completeRes = await fetch("https://scoutflair.top/scoutflair/v1/file/picture/upload-complete", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    fileKey: presignData.fileKey,
    publicUrl: presignData.publicUrl,
  }),
});

    if (!completeRes.ok) throw new Error(`Upload complete failed (${completeRes.status})`);

    const completeData = await completeRes.json();
    console.log("✅ Upload complete:", completeData);

    // ✅ Return usable URL
    return { success: true, url: uploadUrl };
  } catch (err) {
    console.error("❌ Error uploading to R2:", err);
    throw err;
  }
}


export async function uploadFileToR2(file: File): Promise<{ url: string; fileKey: string }> {
  // Get token using the correct key that matches your other components
  const token = localStorage.getItem("authToken");

  
  if (!token) {
    console.error("No authToken found in localStorage");
    throw new Error("No token found, please login again");
  }

  try {
    // Step 1: Get presigned URL from backend
    console.log("=== STEP 1: Getting presigned URL ===");
    const body = {
      filename: file.name,
      contentType: file.type,
    };
    console.log("Request body:", body);
    console.log("Request URL:", "https://scoutflair.top/scoutflair/v1/storage/presign-upload");
    console.log("Authorization header:", `Bearer ${token.substring(0, 20)}...`);

    const res = await fetch("https://scoutflair.top/scoutflair/v1/storage/presign-upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    

    if (!res.ok) {
      console.error("=== PRESIGNED URL FAILED ===");
      console.error("Status:", res.status);
      console.error("Status Text:", res.statusText);
      
      let errorText;
      try {
        errorText = await res.text();
        console.error("Error response body:", errorText);
      } catch (e) {
        console.error("Could not read error response:", e);
        errorText = "Unable to read error response";
      }
      
      // Try to parse as JSON for more details
      try {
        const errorJson = JSON.parse(errorText);
        console.error("Parsed error JSON:", errorJson);
      } catch (e) {
        console.error("Error response is not JSON");
      }
      
      throw new Error(`Failed to get presigned URL (${res.status}): ${errorText}`);
    }

    let uploadData;
    try {
      uploadData = await res.json();
      console.log("=== PRESIGNED URL SUCCESS ===");
      console.log("Upload data received:", uploadData);
    } catch (e) {
      console.error("Failed to parse success response as JSON:", e);
      throw new Error("Invalid response from presign-upload endpoint");
    }
    const { presignedUrl, publicUrl, fileKey } = uploadData;

    // Step 2: Upload file directly to R2
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
      console.error("R2 error response:", errorText);
      throw new Error(`Failed to upload file to R2 (${uploadRes.status}): ${errorText}`);
    }

    console.log("File uploaded to R2 successfully");

    // Step 3: Notify backend that upload is complete
    console.log("Notifying backend of upload completion...");
    const completeRes = await fetch("https://scoutflair.top/scoutflair/v1/storage/upload-complete", {
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
      // Don't throw here - file is uploaded successfully, just notification failed
    }

    // Return both public URL and fileKey for future reference
    return { 
      url: publicUrl,
      fileKey: fileKey
    };

  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
}