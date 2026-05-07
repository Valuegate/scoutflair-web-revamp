import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit") || "10";
    const offset = searchParams.get("offset") || "0";

    const token = req.headers.get("authorization");

    console.log("Proxy route called with token:", token);

    const response = await axios.get(
      "https://scoutflair.top/api/v1/notifications/getNotifications",
      {
        headers: {
          Authorization: token || "",
        },
        params: { limit, offset },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Proxy error details:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    return NextResponse.json(
      {
        error: "Failed to fetch notifications",
        details: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}
