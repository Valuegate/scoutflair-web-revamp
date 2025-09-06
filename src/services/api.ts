export async function uploadMedia(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/v1/spotLights/media/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Media upload failed");
  const data = await res.json();
  return data.url; // backend should return uploaded file URL
}

export async function addPost(post: any) {
  const res = await fetch("/api/v1/spotLights/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });

  if (!res.ok) throw new Error("Post creation failed");
  return res.json();
}
