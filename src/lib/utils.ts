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
