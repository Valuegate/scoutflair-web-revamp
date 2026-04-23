"use client";

import { Search, PencilLine, Trash2 } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

type GalleryEntry = {
  id: string;
  image: string;
  alt: string;
  dateLabel: string;
};

type NewsItem = {
  id: string;
  image: string;
  category: string;
  timeAgo: string;
  headline: string;
};

const galleryEntries: GalleryEntry[] = [
  { id: "g1", image: "/images/spotlight1.png", alt: "Players resting during a training break", dateLabel: "THURSDAY, AUGUST 29,2024" },
  { id: "g2", image: "/images/spotlight2.png", alt: "Football drills during match preparation", dateLabel: "THURSDAY, AUGUST 29,2024" },
  { id: "g3", image: "/images/post_1.png", alt: "Player making a forward run in training", dateLabel: "THURSDAY, AUGUST 29,2024" },
  { id: "g4", image: "/images/post_2.png", alt: "Late run into midfield space during a session", dateLabel: "THURSDAY, AUGUST 29,2024" },
  { id: "g5", image: "/images/scoutplayertwo.png", alt: "Attacking sequence on the edge of the area", dateLabel: "THURSDAY, AUGUST 29,2024" },
  { id: "g6", image: "/images/scoutplayerfour.png", alt: "Wide player carrying the ball forward", dateLabel: "THURSDAY, AUGUST 29,2024" },

  { id: "g7", image: "/images/allpone.png", alt: "Competitive play in a crowded final third", dateLabel: "THURSDAY, AUGUST 29,2024" },
  { id: "g8", image: "/images/updatesone.png", alt: "Goalkeeper preparing during a finishing drill", dateLabel: "THURSDAY, AUGUST 29,2024" },
  { id: "g9", image: "/images/updatestwo.png", alt: "Shot taken across goal during a scrimmage", dateLabel: "THURSDAY, AUGUST 29,2024" },
  { id: "g10", image: "/images/updatesthree.png", alt: "Player dribbling in open space", dateLabel: "THURSDAY, AUGUST 29,2024" },
  { id: "g11", image: "/images/grass.jpg", alt: "Wide pitch setup before an evening session", dateLabel: "THURSDAY, AUGUST 29,2024" },
  { id: "g12", image: "/images/actone.png", alt: "Training activity viewed from touchline level", dateLabel: "THURSDAY, AUGUST 29,2024" },

  { id: "g13", image: "/images/acttwo.png", alt: "Players holding shape in a line during drills", dateLabel: "WEDNESDAY, AUGUST 28,2024" },
  { id: "g14", image: "/images/actthree.png", alt: "Recovery work taking place beside the pitch", dateLabel: "WEDNESDAY, AUGUST 28,2024" },
  { id: "g15", image: "/images/actfour.png", alt: "Indoor football training session", dateLabel: "WEDNESDAY, AUGUST 28,2024" },
  { id: "g16", image: "/images/prosimgone.png", alt: "Youth players listening during a coaching block", dateLabel: "WEDNESDAY, AUGUST 28,2024" },
  { id: "g17", image: "/images/prosimgtwo.png", alt: "Senior player directing a buildup phase", dateLabel: "WEDNESDAY, AUGUST 28,2024" },
  { id: "g18", image: "/images/prosimgthree.png", alt: "Player striking the ball under pressure", dateLabel: "WEDNESDAY, AUGUST 28,2024" },

  { id: "g19", image: "/images/topone.png", alt: "Night training under floodlights", dateLabel: "TUESDAY, AUGUST 27,2024" },
  { id: "g20", image: "/images/toptwo.png", alt: "Small-sided game between academy players", dateLabel: "TUESDAY, AUGUST 27,2024" },
  { id: "g21", image: "/images/topthree.png", alt: "Touchline coaching during a team session", dateLabel: "TUESDAY, AUGUST 27,2024" },
];

const newsItems: NewsItem[] = [
  {
    id: "n1",
    image: "/images/round.png",
    category: "Sport News",
    timeAgo: "2 hours ago",
    headline: "Valuegate Football Academy unveils new 300-seater local stadium in Abuja, Nigeria.",
  },
  {
    id: "n2",
    image: "/images/dpone.png",
    category: "Sport News",
    timeAgo: "2 hours ago",
    headline: "Weekend development fixtures to spotlight emerging midfield talent across local academies.",
  },
  {
    id: "n3",
    image: "/images/scdp.png",
    category: "Sport News",
    timeAgo: "2 hours ago",
    headline: "Performance staff introduce recovery-focused microcycles ahead of the next trial window.",
  },
  {
    id: "n4",
    image: "/images/post_1.png",
    category: "Sport News",
    timeAgo: "2 hours ago",
    headline: "Coaches highlight smarter pressing triggers as a key development target for young players.",
  },
  {
    id: "n5",
    image: "/images/spotlight2.png",
    category: "Sport News",
    timeAgo: "2 hours ago",
    headline: "Training centres invest in match-realistic sessions to improve decision-making under pressure.",
  },
];

function groupGalleryByDate(entries: GalleryEntry[]) {
  return entries.reduce<Record<string, GalleryEntry[]>>((acc, entry) => {
    if (!acc[entry.dateLabel]) {
      acc[entry.dateLabel] = [];
    }
    acc[entry.dateLabel].push(entry);
    return acc;
  }, {});
}

export default function GalleryPage() {
  const [query, setQuery] = useState("");

  const filteredEntries = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return galleryEntries;
    }

    return galleryEntries.filter((entry) => entry.alt.toLowerCase().includes(normalized));
  }, [query]);

  const groupedEntries = useMemo(() => groupGalleryByDate(filteredEntries), [filteredEntries]);

  return (
    <div className="px-2 py-7 md:px-1">
      <div className="flex flex-col gap-6 xl:flex-row">
        <div className="min-w-0 flex-1">
          <div className="rounded-[22px] bg-white p-4 shadow-[0_14px_32px_rgba(15,23,42,0.08)]">
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="flex h-12 flex-1 items-center rounded-xl bg-[#F5F5F5] px-4">
                <Search className="mr-3 h-4 w-4 text-[#9CA3AF]" strokeWidth={1.7} />
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="search..."
                  className="w-full bg-transparent text-sm text-[#374151] outline-none placeholder:text-[#9CA3AF]"
                />
                <div className="ml-3 flex items-center gap-3 text-[#6B7280]">
                  <button type="button" className="transition hover:text-[#0A2342]">
                    <PencilLine className="h-4 w-4" strokeWidth={1.8} />
                  </button>
                  <button type="button" className="transition hover:text-[#0A2342]">
                    <Trash2 className="h-4 w-4" strokeWidth={1.8} />
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="h-12 min-w-[90px] rounded-[10px] border border-[#A7B2C3] px-6 text-sm font-medium text-[#384152] transition hover:bg-[#F8FAFC]"
              >
                Filter
              </button>
            </div>
          </div>

          <div className="mt-6 rounded-[24px] bg-white p-4 shadow-[0_14px_32px_rgba(15,23,42,0.08)] sm:p-5">
            {filteredEntries.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#D1D5DB] px-6 py-12 text-center text-sm text-[#6B7280]">
                No gallery items match your search.
              </div>
            ) : (
              Object.entries(groupedEntries).map(([dateLabel, entries]) => (
                <section key={dateLabel} className="mb-6 last:mb-0">
                  <h2 className="mb-4 text-[15px] font-semibold uppercase tracking-tight text-[#404040]">
                    {dateLabel}
                  </h2>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {entries.map((entry) => (
                      <div
                        key={entry.id}
                        className="overflow-hidden rounded-[10px] bg-[#F5F5F5]"
                      >
                        <Image
                          src={entry.image}
                          alt={entry.alt}
                          width={520}
                          height={320}
                          className="h-[138px] w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              ))
            )}
          </div>
        </div>

        <aside className="w-full xl:w-[340px]">
          <div className="rounded-[24px] bg-white p-4 shadow-[0_14px_32px_rgba(15,23,42,0.08)]">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-[18px] font-bold text-[#222222]">News Feed</h3>
              <button type="button" className="text-xs text-[#6B7280] transition hover:text-[#0A2342]">
                View All
              </button>
            </div>

            <div className="relative mb-6 overflow-hidden rounded-[14px]">
              <Image
                src="/images/grass.jpg"
                alt="Featured football news"
                width={680}
                height={380}
                className="h-[160px] w-full object-cover"
              />
              <div className="absolute inset-0 flex items-start justify-between bg-[linear-gradient(180deg,rgba(4,25,49,0.76)_0%,rgba(4,25,49,0.88)_100%)] p-4">
                <div className="max-w-[66%]">
                  <div className="mb-3 flex items-center gap-2 text-[10px] text-white">
                    <span className="font-semibold">Local News</span>
                    <span className="h-1 w-1 rounded-full bg-white/80" />
                    <span>2 hours ago</span>
                  </div>
                  <p className="text-sm leading-6 text-white">
                    Valuegate Football Academy unveils new 300-seater local stadium, located in Abuja, Nigeria.
                  </p>
                </div>
                <Image
                  src="/images/round.png"
                  alt="Featured story thumbnail"
                  width={92}
                  height={70}
                  className="h-[70px] w-[92px] rounded-md object-cover"
                />
              </div>
            </div>

            <div>
              {newsItems.map((item, index) => (
                <div key={item.id} className={`${index < newsItems.length - 1 ? "border-b border-[#ECECEC] pb-4 mb-4" : ""}`}>
                  <div className="flex gap-4">
                    <Image
                      src={item.image}
                      alt={item.headline}
                      width={72}
                      height={72}
                      className="h-[62px] w-[62px] rounded-md object-cover"
                    />
                    <div className="min-w-0">
                      <div className="mb-2 flex items-center gap-2 text-[10px] text-[#6B7280]">
                        <span className="font-semibold text-[#404040]">{item.category}</span>
                        <span className="h-1 w-1 rounded-full bg-[#9CA3AF]" />
                        <span>{item.timeAgo}</span>
                      </div>
                      <p className="text-xs leading-5 text-[#666666]">{item.headline}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-[24px] bg-white p-4 shadow-[0_14px_32px_rgba(15,23,42,0.08)]">
            <div className="flex h-full gap-4">
              <div className="flex flex-1 flex-col justify-between py-2">
                <div>
                  <h3 className="mb-10 text-[18px] font-bold text-[#222222]">Featured Ads</h3>
                  <h4 className="mb-3 max-w-[180px] text-[18px] font-semibold leading-6 text-[#222222]">
                    Subscribe to Scoutflair Premium Plan
                  </h4>
                  <p className="mb-6 max-w-[190px] text-xs leading-5 text-[#666666]">
                    Unlock verified exposure tools, richer player analytics, and premium promotion features built to help standout performances reach the right audience.
                  </p>
                </div>

                <button
                  type="button"
                  className="h-11 w-full max-w-[132px] rounded-[10px] bg-[#0A2342] px-6 text-sm font-semibold text-white transition hover:opacity-95"
                >
                  Subscribe
                </button>
              </div>

              <div className="flex w-[132px] items-end justify-end">
                <Image
                  src="/images/image.png"
                  alt="Featured premium ad player"
                  width={240}
                  height={320}
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
