"use client";

import { useEffect, useState } from "react";
import { CupStarIcon, StarsIcon, StarsIconOutline } from "../ScoutIcons";
import { Loader2 } from "lucide-react";

const BASE_URL = "https://scoutflair.top";

function getToken() {
  return localStorage.getItem("authToken") || "";
}

async function getImageUrl(fileKey: string): Promise<string> {
  if (!fileKey || fileKey.trim() === "") return "";
  try {
    const res = await fetch(
      `${BASE_URL}/scoutflair/v1/storage/presign-download/${fileKey}`,
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    const data = await res.json();
    return data?.presignedUrl || "";
  } catch {
    return "";
  }
}

function PlayerAvatar({ src, name }: { src: string; name: string }) {
  const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name || "P"
  )}&size=80&background=fed7aa&color=7c2d12&bold=true`;

  return (
    <img
      src={src || fallback}
      alt={name}
      className="rounded-full -mr-2 border-2 border-white w-7 h-7 sm:w-8 sm:h-8 object-cover"
      onError={(e) => {
        const t = e.target as HTMLImageElement;
        t.onerror = null;
        t.src = fallback;
      }}
    />
  );
}

export default function StatsCard() {
  const [count, setCount] = useState<number | null>(null);
  const [avatars, setAvatars] = useState<{ name: string; image: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch scout's scouted players
        const res = await fetch(
          `${BASE_URL}/api/v1/profile/scout/getScoutPlayers?limit=50&offset=0`,
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );
        if (!res.ok) throw new Error();
        const data = await res.json();

        // API returns Response wrapper: { data: { obj: [...], totalCount: N } }
        const players = data?.data?.obj || [];
        const total = data?.data?.totalCount ?? players.length;

        setCount(total);

        // Get first 4 players for avatars
        const first4 = players.slice(0, 4);
        const withImages = await Promise.all(
          first4.map(async (p: any) => {
            const imageUrl =
              p.imageFileKey && p.imageFileKey.trim() !== ""
                ? await getImageUrl(p.imageFileKey)
                : "";
            return {
              name: p.fullName || "Player",
              image: imageUrl,
            };
          })
        );
        setAvatars(withImages);
      } catch {
        setCount(null);
        setAvatars([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="bg-white w-full sm:max-w-[350px] p-3 rounded-[12px] shadow-md h-[145px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm sm:text-base font-semibold text-gray-800">
          Total Players Scouted
        </h3>
        <CupStarIcon />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-20">
          <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
        </div>
      ) : (
        <>
          {/* Main content */}
          <div className="flex items-center justify-between">
            {/* Player avatars */}
            <div className="flex mt-8">
              {avatars.length > 0
                ? avatars.map((p, i) => (
                    <PlayerAvatar key={i} src={p.image} name={p.name} />
                  ))
                : // Placeholder avatars when no data
                  [1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="rounded-full -mr-2 border-2 border-white w-7 h-7 sm:w-8 sm:h-8 bg-gray-200"
                    />
                  ))}
            </div>

            {/* Count */}
            <div className="text-2xl sm:text-4xl font-bold text-gray-900 mt-5">
              {count ?? "—"}
            </div>
          </div>

          {/* Bottom stars */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex">
              {[...Array(4)].map((_, i) => (
                <StarsIcon key={i} />
              ))}
              <StarsIconOutline />
            </div>
            <p className="text-xs text-gray-500">Players Scouted</p>
          </div>
        </>
      )}
    </div>
  );
}
