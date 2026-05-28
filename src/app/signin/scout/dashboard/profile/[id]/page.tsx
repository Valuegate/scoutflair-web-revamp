"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const BASE_URL = "https://scoutflair.top";

function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken") || "";
  }
  return "";
}

type PlayerProfile = {
  playerId: number;
  fullName: string;
  position: string;
  jerseyNumber: string;
  nationality: string;
  dob: string;
  height: string;
  weight: string;
  biography: string;
  preferredFoot: string;
  currentTeam: string;
  email: string;
  phone: string;
  location: string;
  imageFileKey: string;
  igUrl: string;
  ticTokUrl: string;
  facebookUrl: string;
  xurl: string;
  licenceNumber: string;
};

// ── Fixed getImageUrl using query parameter ───────────────────────────────────
async function getImageUrl(fileKey: string): Promise<string> {
  if (!fileKey || fileKey.trim() === "") return "";
  try {
    const res = await fetch(
      `${BASE_URL}/scoutflair/v1/storage/presign-download?fileKey=${encodeURIComponent(
        fileKey
      )}`,
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    if (!res.ok) return "";
    const data = await res.json();
    return data?.presignedUrl || "";
  } catch {
    return "";
  }
}

function getAge(dob: string): string {
  if (!dob) return "—";
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return `${age} years`;
}

function formatDob(dob: string): string {
  if (!dob) return "—";
  try {
    return new Date(dob).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dob;
  }
}

function InfoRow({ icon, value }: { icon: React.ReactNode; value: string }) {
  if (!value || value === "—") return null;
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 flex items-center justify-center bg-[#D2F0FA] rounded-md flex-shrink-0">
        {icon}
      </div>
      <span className="text-[12px] font-medium text-black leading-[18px]">
        {value}
      </span>
    </div>
  );
}

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [player, setPlayer] = useState<PlayerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      setError("");
      try {
        const listRes = await fetch(
          `${BASE_URL}/api/v1/profile/scout/getPlayers?limit=50&offset=0`,
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );
        if (!listRes.ok) throw new Error("Failed to fetch players");
        const list = await listRes.json();
        const found = Array.isArray(list)
          ? list.find((p: any) => String(p.playerId) === String(id))
          : null;

        if (!found) throw new Error("Player not found");

        const profileRes = await fetch(
          `${BASE_URL}/api/v1/profile/player/getProfile?playerEmail=${encodeURIComponent(
            found.email
          )}`,
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );
        if (!profileRes.ok) throw new Error("Failed to fetch profile");
        const profile = await profileRes.json();
        setPlayer(profile);

        // Resolve image using NEW query parameter endpoint — no path exclusions
        if (profile.imageFileKey && profile.imageFileKey.trim() !== "") {
          const url = await getImageUrl(profile.imageFileKey);
          if (url) setImageUrl(url);
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !player) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-gray-500">⚠️ {error || "Player not found"}</p>
        <button
          onClick={() => router.back()}
          className="text-sm text-blue-500 hover:underline"
        >
          ← Go back
        </button>
      </div>
    );
  }

  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    player.fullName || "Player"
  )}&size=150&background=fed7aa&color=7c2d12&bold=true`;

  const avatar = imageUrl || fallbackAvatar;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pb-10">
      {/* Profile Card */}
      <div className="relative w-full bg-white rounded-xl shadow-sm mb-6">
        <div className="relative w-full h-40 sm:h-48 md:h-56">
          <img
            src="/images/grass.jpg"
            alt="Profile Cover"
            className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-t-xl"
          />
          <div className="absolute bottom-0 left-4 transform translate-y-1/2">
            <img
              src={avatar}
              alt={player.fullName}
              className="w-16 h-16 mt-[-30px] sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover border-3 border-[#0A2A56] rounded-full bg-white"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.onerror = null;
                t.src = fallbackAvatar;
              }}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 pt-10 pb-4 gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-black">
              {player.fullName}
            </h1>
            <div className="flex flex-col gap-1 text-sm text-gray-600">
              <span>
                {player.position || "—"}
                {player.jerseyNumber ? `, No. ${player.jerseyNumber}` : ""}
              </span>
              <span>{getAge(player.dob)}</span>
              {player.currentTeam && (
                <span className="text-xs text-blue-600 font-medium">
                  {player.currentTeam}
                </span>
              )}
            </div>
          </div>

          <a
            href={`mailto:${player.email}`}
            className="w-full sm:w-auto px-6 py-2 bg-[#0A2A56] text-white rounded-lg font-semibold text-sm hover:opacity-90 text-center"
          >
            Contact Player
          </a>
        </div>
      </div>

      {/* Content Grid */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Player Details */}
        <div className="w-full lg:w-96 xl:w-[460px] bg-white rounded-xl shadow-sm p-4">
          <h2 className="text-lg font-bold text-black mb-4">Player Details</h2>

          {player.biography && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-black mb-2">Biography</h3>
              <p className="text-xs text-black opacity-80 leading-relaxed">
                {player.biography}
              </p>
            </div>
          )}

          <div className="border-t border-gray-200 pt-4 mb-6">
            <div className="text-sm font-medium text-black mb-4">About</div>
            <div className="flex flex-col gap-4">
              <InfoRow
                value={player.fullName}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="black"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5.121 17.804A10.97 10.97 0 0112 15c2.5 0 4.847.8 6.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                }
              />
              <InfoRow
                value={formatDob(player.dob)}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="black"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                }
              />
              <InfoRow
                value={player.nationality || "—"}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="black"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 21V5l9-2 9 2v16"
                    />
                  </svg>
                }
              />
              <InfoRow
                value={
                  player.preferredFoot ? `${player.preferredFoot} Foot` : "—"
                }
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="black"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                }
              />
              <InfoRow
                value={player.height || "—"}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="black"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 21V3h10v18H7z"
                    />
                  </svg>
                }
              />
              <InfoRow
                value={player.weight || "—"}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="black"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v8m8-8v8m-4-4h-8"
                    />
                  </svg>
                }
              />
              <InfoRow
                value={player.location || "—"}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="black"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                }
              />
              {player.licenceNumber && (
                <InfoRow
                  value={`Licence: ${player.licenceNumber}`}
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="black"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2"
                      />
                    </svg>
                  }
                />
              )}
            </div>
          </div>

          {(player.email || player.phone) && (
            <div className="border-t border-gray-200 pt-4 mb-6">
              <h3 className="text-sm font-medium text-black mb-4">Contact</h3>
              <div className="flex flex-col gap-3">
                {player.email && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-[#D2F0FA] rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="black"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-black break-all">
                      {player.email}
                    </span>
                  </div>
                )}
                {player.phone && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-[#D2F0FA] rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="black"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h2a2 2 0 012 2v1a2 2 0 01-.586 1.414l-1.293 1.293a16 16 0 006.586 6.586l1.293-1.293A2 2 0 0115 14h1a2 2 0 012 2v2a2 2 0 01-2 2h-1C7.82 20 4 16.18 4 11V9a2 2 0 012-2H5z"
                        />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-black">
                      {player.phone}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {(player.igUrl ||
            player.ticTokUrl ||
            player.facebookUrl ||
            player.xurl) && (
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium text-black mb-4">
                Social Media
              </h3>
              <div className="flex flex-wrap gap-2">
                {player.igUrl && (
                  <a
                    href={player.igUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-3 py-1.5 border border-gray-300 rounded-xl bg-white gap-2 hover:bg-gray-50 transition"
                  >
                    <div className="w-3 h-3 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-full h-full"
                      >
                        <defs>
                          <linearGradient
                            id="ig-gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop
                              offset="0%"
                              style={{ stopColor: "#f09433" }}
                            />
                            <stop
                              offset="50%"
                              style={{ stopColor: "#dc2743" }}
                            />
                            <stop
                              offset="100%"
                              style={{ stopColor: "#bc1888" }}
                            />
                          </linearGradient>
                        </defs>
                        <path
                          fill="url(#ig-gradient)"
                          d="M349.33 69.33H162.67A93.34 93.34 0 0 0 69.33 162.67v186.66a93.34 93.34 0 0 0 93.34 93.34h186.66a93.34 93.34 0 0 0 93.34-93.34V162.67a93.34 93.34 0 0 0-93.34-93.34ZM256 346.67a90.67 90.67 0 1 1 90.67-90.67 90.76 90.76 0 0 1-90.67 90.67Zm93.33-162.67a21.33 21.33 0 1 1 21.34-21.33 21.34 21.34 0 0 1-21.34 21.33Z"
                        />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-black">
                      Instagram
                    </span>
                  </a>
                )}
                {player.ticTokUrl && (
                  <a
                    href={player.ticTokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-3 py-1.5 border border-gray-300 rounded-xl bg-white gap-2 hover:bg-gray-50 transition"
                  >
                    <div className="w-3 h-3 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-full h-full"
                      >
                        <path
                          d="M12 0h4a6 6 0 0 0 6 6v4a9.99 9.99 0 0 1-6-2v10a6 6 0 1 1-6-6h2v4a2 2 0 1 0 2 2V0z"
                          fill="#000"
                        />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-black">
                      TikTok
                    </span>
                  </a>
                )}
                {player.facebookUrl && (
                  <a
                    href={player.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-3 py-1.5 border border-gray-300 rounded-xl bg-white gap-2 hover:bg-gray-50 transition"
                  >
                    <div className="w-3 h-3 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-full h-full"
                      >
                        <path
                          d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                          fill="#1877F2"
                        />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-black">
                      Facebook
                    </span>
                  </a>
                )}
                {player.xurl && (
                  <a
                    href={player.xurl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-3 py-1.5 border border-gray-300 rounded-xl bg-white gap-2 hover:bg-gray-50 transition"
                  >
                    <div className="w-3 h-3 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-full h-full"
                      >
                        <path
                          d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                          fill="#000"
                        />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-black">
                      X (Twitter)
                    </span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Activity Feed */}
        <div className="flex-1 space-y-6">
          <SpotlightPosts
            playerEmail={player.email}
            playerName={player.fullName}
            playerAvatar={avatar}
          />
        </div>
      </div>
    </div>
  );
}

// ── Spotlight Posts ───────────────────────────────────────────────────────────
type Post = {
  id: number;
  text: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  mediaFileKeys: string[];
};

function SpotlightPosts({
  playerEmail,
  playerName,
  playerAvatar,
}: {
  playerEmail: string;
  playerName: string;
  playerAvatar: string;
}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postImages, setPostImages] = useState<Record<number, string[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(
          `${BASE_URL}/api/v1/spotLights/getUserPostsByScout?limit=10&offset=0&playerMail=${encodeURIComponent(
            playerEmail
          )}`,
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );
        if (!res.ok) throw new Error();
        const data = await res.json();
        const list: Post[] = data?.data?.obj || data?.data || [];
        const postList = Array.isArray(list) ? list : [];
        setPosts(postList);

        // Resolve all media file keys for all posts in parallel
        const imageMap: Record<number, string[]> = {};
        await Promise.all(
          postList.map(async (post) => {
            if (post.mediaFileKeys?.length > 0) {
              const urls = await Promise.all(
                post.mediaFileKeys.map(async (key: string) => {
                  if (key.startsWith("http")) return key;
                  return await getImageUrl(key);
                })
              );
              imageMap[post.id] = urls.filter(Boolean);
            }
          })
        );
        setPostImages(imageMap);
      } catch {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    if (playerEmail) fetchPosts();
    else setLoading(false);
  }, [playerEmail]);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-400">
        <p className="text-3xl mb-2">📸</p>
        <p className="text-sm">No posts yet</p>
        <p className="text-xs mt-1">
          This player hasn't shared any spotlight posts
        </p>
      </div>
    );
  }

  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-xl shadow-sm p-4">
          {/* Post Header */}
          <div className="flex items-center gap-3 mb-4">
            <img
              src={playerAvatar}
              alt={playerName}
              className="w-9 h-9 rounded object-cover"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.onerror = null;
                t.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  playerName
                )}&size=40&background=fed7aa&color=7c2d12&bold=true`;
              }}
            />
            <div className="flex flex-col">
              <div className="text-sm font-bold text-black">{playerName}</div>
              <div className="text-xs text-gray-500">
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : ""}
              </div>
            </div>
          </div>

          {/* Post Text */}
          {post.text && (
            <p className="text-xs text-black mb-4 leading-relaxed">
              {post.text}
            </p>
          )}

          {/* Post Media — resolved presigned URLs */}
          {postImages[post.id]?.length > 0 && (
            <div
              className={`grid gap-2 mb-4 ${
                postImages[post.id].length > 1 ? "grid-cols-2" : "grid-cols-1"
              }`}
            >
              {postImages[post.id].map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Post media ${i + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ))}
            </div>
          )}

          {/* Engagement counts */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs text-gray-500">
              {(post.likeCount || 0) > 0 && <span>{post.likeCount} likes</span>}
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              {(post.commentCount || 0) > 0 && (
                <span>{post.commentCount} Comments</span>
              )}
              {(post.shareCount || 0) > 0 && (
                <span>{post.shareCount} Shares</span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="border-t border-gray-200 pt-3">
            <div className="flex items-center justify-around">
              {[
                {
                  label: "Like",
                  icon: (
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 14.25l-1.45-1.32C3.4 9.36 1 7.28 1 4.5 1 2.42 2.42 1 4.5 1c1.74 0 3.41.81 4.5 2.09C10.09 1.81 11.76 1 13.5 1 15.58 1 17 2.42 17 4.5c0 2.78-2.4 4.86-5.55 8.43L8 14.25z"
                        stroke="black"
                        strokeWidth="1"
                        fill="none"
                      />
                    </svg>
                  ),
                },
                {
                  label: "Comment",
                  icon: (
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M14 2H2C1.45 2 1 2.45 1 3v7c0 .55.45 1 1 1h9l3 3V3c0-.55-.45-1-1-1z"
                        stroke="black"
                        strokeWidth="0.76"
                        fill="none"
                      />
                    </svg>
                  ),
                },
                {
                  label: "Share",
                  icon: (
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 1.5L12 5.5H9v6H7v-6H4l4-4z"
                        stroke="black"
                        strokeWidth="1"
                        fill="black"
                      />
                    </svg>
                  ),
                },
              ].map(({ label, icon }) => (
                <button
                  key={label}
                  className="flex items-center gap-2 text-xs font-medium text-black hover:bg-gray-50 px-3 py-2 rounded"
                >
                  {icon}
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
