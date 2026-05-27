import { NextResponse } from "next/server";

const NEWS_API_KEY = "2c222e029d244094be9df92681f4fb55";

export async function GET() {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?category=sports&q=football&pageSize=5&language=en&apiKey=${NEWS_API_KEY}`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ articles: [] });
  }
}
