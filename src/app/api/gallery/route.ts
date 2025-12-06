// app/api/gallery/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || "players";
    const limit = searchParams.get("limit") || "5";
    const offset = searchParams.get("offset") || "0";
    const playeremail = searchParams.get("playeremail") || "";
    const authHeader = req.headers.get("authorization"); // ✅ get token from frontend

    if (!authHeader) {
      return NextResponse.json(
        { error: "Missing Authorization header" },
        { status: 401 }
      );
    }

    const res = await axios.get(
      "https://scoutflair.top/api/v1/gallery/getUserGallery", // ✅ player endpoint, not admin
      {
        params: { category, limit, offset, playeremail },
        headers: {
          Authorization: authHeader,
          Accept: "*/*",
        },
      }
    );

    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error("Error fetching gallery:", error.response?.data || error.message);
    return NextResponse.json(
      {
        error: "Failed to fetch gallery",
        details: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}
