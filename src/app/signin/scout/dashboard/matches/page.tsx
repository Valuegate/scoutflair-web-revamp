"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Loader2, ExternalLink, Plus, X } from "lucide-react";

const BASE_URL = "https://scoutflair.top";

function getToken() {
  return localStorage.getItem("authToken") || "";
}

type Match = {
  matchName: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamScore: number | null;
  awayTeamScore: number | null;
  dateTime: string;
  stadiumPitch: string;
  competition: string;
  status: "FT" | "NS";
};

type ScoutPlayer = {
  playerId: number;
  fullName: string;
  position: string;
  currentTeam: string;
  nationality: string;
  goals?: number;
  assist?: number;
  appearances?: number;
};

type NewsArticle = {
  title: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: { name: string };
};

function formatMatchTime(dateTime: string): string {
  if (!dateTime) return "";
  try {
    const date = new Date(dateTime);
    return (
      date.toLocaleDateString("en-GB", {
        day: "numeric", month: "short", year: "numeric",
      }) + " • " +
      date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
    );
  } catch {
    return dateTime;
  }
}

function formatNewsDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "numeric", month: "long", year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function getInitials(name: string): string {
  return (name || "?").split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

// ── Add Match Modal ───────────────────────────────────────────────────────────
function AddMatchModal({
  onClose,
  onAdded,
}: {
  onClose: () => void;
  onAdded: () => void;
}) {
  const [form, setForm] = useState({
    homeTeam: "",
    awayTeam: "",
    competition: "",
    dateTime: "",
    pitch: "",
    referee: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleChange(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit() {
    if (!form.homeTeam.trim() || !form.awayTeam.trim()) {
      setError("Home and away team names are required.");
      return;
    }
    if (!form.dateTime) {
      setError("Match date and time is required.");
      return;
    }

    // Convert "2026-05-15T16:00" → "2026-05-15 16:00:00"
    const formattedDateTime = form.dateTime.replace("T", " ") + ":00";

    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`${BASE_URL}/api/v1/matches/addMatches`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          homeTeam: form.homeTeam,
          awayTeam: form.awayTeam,
          competition: form.competition,
          dateTime: formattedDateTime,
          pitch: form.pitch,
          referee: form.referee,
          homeTeamLogoFileKey: "",
          awayTeamLogoUrlFileKey: "",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || `Failed (${res.status})`);
      onAdded();
      onClose();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-5 bg-[#041931] text-white">
          <h2 className="text-lg font-bold">Add New Match</h2>
          <button
            onClick={onClose}
            className="p-1.5 bg-white/20 hover:bg-white/30 rounded-full"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          {[
            { label: "Home Team *", key: "homeTeam", placeholder: "e.g. Valuegate Academy" },
            { label: "Away Team *", key: "awayTeam", placeholder: "e.g. FC Jabi" },
            { label: "Competition", key: "competition", placeholder: "e.g. Fayomi's Cup" },
            { label: "Pitch / Stadium", key: "pitch", placeholder: "e.g. Old Jabi Township Stadium" },
            { label: "Referee", key: "referee", placeholder: "e.g. John Doe" },
          ].map(({ label, key, placeholder }) => (
            <div key={key}>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                {label}
              </label>
              <input
                type="text"
                placeholder={placeholder}
                value={form[key as keyof typeof form]}
                onChange={(e) => handleChange(key, e.target.value)}
                className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Match Date & Time *
            </label>
            <input
              type="datetime-local"
              value={form.dateTime}
              onChange={(e) => handleChange("dateTime", e.target.value)}
              className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {error && <p className="text-red-500 text-xs">⚠️ {error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex-1 py-2.5 bg-[#041931] text-white text-sm font-semibold rounded-xl hover:bg-blue-900 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting && <Loader2 size={14} className="animate-spin" />}
              {submitting ? "Adding..." : "Add Match"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [previousMatches, setPreviousMatches] = useState<Match[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [scoutPlayers, setScoutPlayers] = useState<ScoutPlayer[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [featuredMatch, setFeaturedMatch] = useState<Match | null>(null);
  const [matchesLoading, setMatchesLoading] = useState(true);
  const [playersLoading, setPlayersLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(true);
  const [competition, setCompetition] = useState("");
  const [showAddMatch, setShowAddMatch] = useState(false);

  const fetchMatches = useCallback(async () => {
    setMatchesLoading(true);
    try {
      const headers = { Authorization: `Bearer ${getToken()}` };
      const [prevRes, upcomingRes] = await Promise.allSettled([
        fetch(
          `${BASE_URL}/api/v1/matches/previous/getMatches?limit=10&offset=0&newest=true`,
          { headers }
        ).then((r) => r.json()),
        fetch(
          `${BASE_URL}/api/v1/matches/upcoming/getMatches?limit=10&offset=0&newest=true`,
          { headers }
        ).then((r) => r.json()),
      ]);

      const prev: Match[] =
        prevRes.status === "fulfilled" && Array.isArray(prevRes.value)
          ? prevRes.value.map((m: any) => ({ ...m, status: "FT" as const }))
          : [];

      const upcoming: Match[] =
        upcomingRes.status === "fulfilled" && Array.isArray(upcomingRes.value)
          ? upcomingRes.value.map((m: any) => ({ ...m, status: "NS" as const }))
          : [];

      setPreviousMatches(prev);
      setUpcomingMatches(upcoming);
      setFeaturedMatch(upcoming[0] || prev[0] || null);

      const firstMatch = upcoming[0] || prev[0];
      if (firstMatch?.competition) setCompetition(firstMatch.competition);
    } catch {
      // silent
    } finally {
      setMatchesLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  useEffect(() => {
    async function fetchScoutPlayers() {
      setPlayersLoading(true);
      try {
        const res = await fetch(
          `${BASE_URL}/api/v1/profile/scout/getScoutPlayers?limit=5&offset=0`,
          { headers: { Authorization: `Bearer ${getToken()}` } }
        );
        if (!res.ok) throw new Error();
        const data = await res.json();
        setScoutPlayers(data?.data?.obj || []);
      } catch {
        setScoutPlayers([]);
      } finally {
        setPlayersLoading(false);
      }
    }
    fetchScoutPlayers();
  }, []);

  useEffect(() => {
    async function fetchNews() {
      setNewsLoading(true);
      try {
        const res = await fetch("/api/news");
        if (!res.ok) throw new Error();
        const data = await res.json();
        const articles = (data.articles || []).filter(
          (a: NewsArticle) => a.title && a.url && a.title !== "[Removed]"
        );
        setNews(articles.slice(0, 5));
      } catch {
        setNews([]);
      } finally {
        setNewsLoading(false);
      }
    }
    fetchNews();
  }, []);

  const allMatches = [...previousMatches, ...upcomingMatches];

  return (
    <>
      {showAddMatch && (
        <AddMatchModal
          onClose={() => setShowAddMatch(false)}
          onAdded={fetchMatches}
        />
      )}

      <div className="p-3 md:p-6 min-h-screen bg-gray-50">
        <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">

          {/* ── Left Column ── */}
          <div className="flex-1 lg:max-w-2xl space-y-6">

            {/* Featured Match Card */}
            <div className="relative w-full h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden shadow-2xl">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#041931] via-[#041931]/90 to-transparent" />
              <div className="relative h-full p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <h2 className="text-white text-xl md:text-3xl font-bold leading-tight max-w-xs">
                    {featuredMatch
                      ? `${featuredMatch.homeTeam} vs ${featuredMatch.awayTeam}`
                      : "No upcoming matches"}
                  </h2>
                  {featuredMatch && (
                    <div className="space-y-2">
                      {featuredMatch.dateTime && (
                        <div className="flex items-center gap-2 text-white/90">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
                          </svg>
                          <span className="text-sm font-medium">
                            {formatMatchTime(featuredMatch.dateTime)}
                          </span>
                        </div>
                      )}
                      {featuredMatch.stadiumPitch && (
                        <div className="flex items-center gap-2 text-white/90">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-sm font-medium">
                            {featuredMatch.stadiumPitch}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <button className="w-fit px-6 py-2 rounded-lg bg-orange-500 text-white font-bold text-sm tracking-widest hover:bg-orange-600 transition shadow-lg">
                  MATCH PREVIEW
                </button>
              </div>
            </div>

            {/* Matches List */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h3 className="text-black font-bold text-lg">Recent Matches</h3>
                  {competition && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-xs">
                        ⚽
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900 leading-none">
                          {competition}
                        </p>
                        <p className="text-[10px] text-gray-500">2026 Season</p>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setShowAddMatch(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#041931] text-white text-xs font-semibold rounded-lg hover:bg-blue-900 transition"
                >
                  <Plus size={12} />
                  Add Match
                </button>
              </div>

              {matchesLoading ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                </div>
              ) : allMatches.length === 0 ? (
                <div className="text-center py-10 text-gray-400 text-sm">
                  <p className="text-3xl mb-2">⚽</p>
                  <p>No matches yet</p>
                  <button
                    onClick={() => setShowAddMatch(true)}
                    className="mt-3 text-xs text-blue-500 hover:underline"
                  >
                    Add the first match
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {allMatches.map((match, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 hover:bg-gray-50 transition"
                    >
                      <span
                        className={`text-[10px] font-bold w-6 ${
                          match.status === "FT" ? "text-gray-400" : "text-green-600"
                        }`}
                      >
                        {match.status}
                      </span>
                      <div className="flex-1 flex items-center justify-center gap-4">
                        <div className="flex items-center gap-2 w-1/3 justify-end">
                          <span className="text-xs font-medium text-gray-800 text-right truncate">
                            {match.homeTeam}
                          </span>
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0" />
                        </div>
                        <div
                          className={`px-3 py-1 rounded text-xs font-bold ${
                            match.status === "FT"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-blue-600 text-white"
                          }`}
                        >
                          {match.status === "FT"
                            ? `${match.homeTeamScore ?? 0} : ${match.awayTeamScore ?? 0}`
                            : "v"}
                        </div>
                        <div className="flex items-center gap-2 w-1/3">
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0" />
                          <span className="text-xs font-medium text-gray-800 truncate">
                            {match.awayTeam}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-400 ml-2 hidden sm:block">
                        {match.competition}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Right Column ── */}
          <div className="flex-1 lg:max-w-md space-y-6">

            {/* Football News */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="text-gray-900 font-bold text-lg mb-4">⚽ Top Football News</h3>
              {newsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                </div>
              ) : news.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-sm">
                  <p className="text-2xl mb-2">📰</p>
                  <p>No news available</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {news.map((article, idx) => (
                    <a
                      key={idx}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-3 group cursor-pointer hover:bg-gray-50 rounded-lg p-1 transition"
                    >
                      {article.urlToImage ? (
                        <img
                          src={article.urlToImage}
                          alt="news"
                          className="w-20 h-16 rounded-md object-cover flex-shrink-0 shadow-sm group-hover:opacity-80 transition"
                          onError={(e) => {
                            const t = e.target as HTMLImageElement;
                            t.onerror = null;
                            t.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-20 h-16 rounded-md bg-gray-100 flex-shrink-0 flex items-center justify-center text-2xl">
                          ⚽
                        </div>
                      )}
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs font-bold text-gray-800 leading-snug group-hover:text-blue-600 transition line-clamp-2">
                            {article.title}
                          </h4>
                          <ExternalLink
                            size={10}
                            className="flex-shrink-0 mt-0.5 text-gray-300 group-hover:text-blue-400"
                          />
                        </div>
                        <p className="text-[10px] text-gray-400 font-medium">
                          {article.source.name}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          {formatNewsDate(article.publishedAt)}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Scouted Players */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-5 bg-gray-900">
                <h3 className="text-white font-bold text-lg">Scouted Players</h3>
              </div>

              {playersLoading ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                </div>
              ) : scoutPlayers.length === 0 ? (
                <div className="text-center py-10 text-gray-400 text-sm">
                  <p className="text-3xl mb-2">📋</p>
                  <p>No scouted players yet</p>
                  <p className="text-xs mt-1 text-gray-300">
                    Players you scout will appear here
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {scoutPlayers.map((player, idx) => (
                    <div key={idx} className="p-4 hover:bg-blue-50/30 transition">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center font-bold text-orange-700 text-sm flex-shrink-0">
                          {getInitials(player.fullName)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider truncate">
                            {player.currentTeam || "Unknown Team"}
                          </p>
                          <p className="text-sm font-bold text-gray-900 truncate">
                            {player.fullName}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            {player.position || "—"}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          {player.goals != null && (
                            <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-medium">
                              {player.goals} Goals
                            </span>
                          )}
                          {player.assist != null && (
                            <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-[10px] font-medium">
                              {player.assist} Assists
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="p-4 bg-gray-50 text-center">
                <button className="text-xs font-bold text-gray-600 hover:text-gray-900 transition">
                  VIEW ALL SCOUTED PLAYERS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}