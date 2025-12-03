import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // 1️⃣ Call Scout Flair presign/upload endpoint
    const presignRes = await fetch("https://scoutflair.top/api/v1/file/picture/presign-upload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: req.headers.get("Authorization") || "",
        Accept: "*/*",
      },
    });

    if (!presignRes.ok) {
      const errorText = await presignRes.text();
      throw new Error(`Presign upload failed: ${presignRes.status} - ${errorText}`);
    }

    const presignData = await presignRes.json();

    // 2️⃣ Return the presigned/public URL to frontend
    return NextResponse.json({
      success: true,
      url: presignData.url || presignData.uploadedFileUrl, // adapt based on Scout Flair API response
      raw: presignData,
    });
  } catch (err: any) {
    console.error("❌ Proxy upload failed:", err);
    return NextResponse.json(
      { error: "Proxy upload failed", details: err.message },
      { status: 500 }
    );
  }
}