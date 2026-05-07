"use client";

import { useState, useEffect } from "react";
import { ProspectsIcon } from "../ScoutIcons";
import { X, Loader2 } from "lucide-react";

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

type Prospect = {
  id: number;
  name: string;
  details: string;
  position: string;
  age: number;
  image: string;
  email: string;
};

function getAge(dob: string): number {
  if (!dob) return 0;
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

function ProspectAvatar({ src, name }: { src: string; name: string }) {
  const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name || "P"
  )}&size=80&background=fed7aa&color=7c2d12&bold=true`;
  return (
    <img
      src={src || fallback}
      alt={name}
      className="rounded-full mx-auto mb-1 w-9 h-9 object-cover"
      onError={(e) => {
        const t = e.target as HTMLImageElement;
        t.onerror = null;
        t.src = fallback;
      }}
    />
  );
}

function ProspectModal({
  prospect,
  onClose,
}: {
  prospect: Prospect;
  onClose: () => void;
}) {
  const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    prospect.name || "P"
  )}&size=80&background=fed7aa&color=7c2d12&bold=true`;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs overflow-hidden">
        <div className="relative bg-gradient-to-br from-[#0A2342] to-blue-700 p-5 text-white text-center">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 bg-white/20 hover:bg-white/30 rounded-full"
          >
            <X size={15} />
          </button>
          <img
            src={prospect.image || fallback}
            alt={prospect.name}
            className="w-16 h-16 rounded-full mx-auto mb-2 border-4 border-white/30 object-cover"
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              t.onerror = null;
              t.src = fallback;
            }}
          />
          <h2 className="text-lg font-bold">{prospect.name}</h2>
          <p className="text-blue-200 text-xs">{prospect.position || "—"}</p>
        </div>
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-base font-bold text-gray-900">
                {prospect.details || "—"}
              </p>
              <p className="text-xs text-gray-500">Goals / Assists</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-base font-bold text-gray-900">
                {prospect.age || "—"}
              </p>
              <p className="text-xs text-gray-500">Age</p>
            </div>
          </div>
          <button className="w-full py-2.5 bg-[#0A2342] text-white text-sm font-semibold rounded-xl hover:bg-blue-800 transition-colors">
            View Full Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TopProspects() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Prospect | null>(null);

  useEffect(() => {
    async function fetchProspects() {
      setLoading(true);
      try {
        const res = await fetch(
          `${BASE_URL}/api/v1/profile/scout/getScoutPlayerProspects`,
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );
        if (!res.ok) throw new Error();
        const data = await res.json();

        // Response wrapper: { data: { obj: [...] } }
        const list = data?.data?.obj || data?.data || [];

        const mapped: Prospect[] = await Promise.all(
          list.slice(0, 3).map(async (p: any) => {
            const imageUrl =
              p.imageFileKey && p.imageFileKey.trim() !== ""
                ? await getImageUrl(p.imageFileKey)
                : "";
            const goals = p.goals ?? 0;
            const assists = p.assist ?? 0;
            return {
              id: p.playerId || p.id,
              name: p.fullName || "Unknown",
              details: `${goals} G / ${assists} A`,
              position: p.position || "—",
              age: getAge(p.dob),
              image: imageUrl,
              email: p.email || "",
            };
          })
        );

        setProspects(mapped);
      } catch {
        setProspects([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProspects();
  }, []);

  return (
    <div className="bg-white rounded-[12px] shadow-md p-3 w-full sm:max-w-[350px] h-[145px]">
      {selected && (
        <ProspectModal prospect={selected} onClose={() => setSelected(null)} />
      )}

      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm sm:text-base font-semibold text-gray-800">
          Top Prospects
        </h3>
        <ProspectsIcon />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-20">
          <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
        </div>
      ) : prospects.length === 0 ? (
        <div className="flex items-center justify-center h-20 text-gray-400 text-xs">
          No prospects added yet
        </div>
      ) : (
        <div className="flex justify-between items-center gap-2">
          {prospects.map((prospect) => (
            <button
              key={prospect.id}
              onClick={() => setSelected(prospect)}
              className="flex-1 text-center bg-[rgba(255,250,250,1)] rounded-md py-2 hover:bg-blue-50 hover:ring-1 hover:ring-blue-200 transition-all cursor-pointer"
            >
              <ProspectAvatar src={prospect.image} name={prospect.name} />
              <p className="text-xs font-medium text-gray-800 leading-tight truncate">
                {prospect.name}
              </p>
              <p className="text-[10px] text-gray-500">{prospect.details}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
