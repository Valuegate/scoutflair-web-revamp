"use client";

import { usePlayerAvatar, usePlayerDisplayName } from "./usePlayerAvatar";
import { playerProfile } from "./profileData";

const recommendationItems = [
  {
    value: playerProfile.recommendation.name,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 14c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4zm0-4a4 4 0 100-8 4 4 0 000 8z"
      />
    ),
  },
  {
    value: playerProfile.recommendation.email,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M16 12H8m8 0l-4-4m4 4l-4 4M3 8v8a5 5 0 005 5h8a5 5 0 005-5V8a5 5 0 00-5-5H8a5 5 0 00-5 5z"
      />
    ),
  },
  {
    value: playerProfile.recommendation.phone,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 5a2 2 0 012-2h2a2 2 0 012 2v1a2 2 0 01-.586 1.414l-1.293 1.293a16 16 0 006.586 6.586l1.293-1.293A2 2 0 0115 14h1a2 2 0 012 2v2a2 2 0 01-2 2h-1C7.82 20 4 16.18 4 11V9a2 2 0 012-2H5z"
      />
    ),
  },
] as const;

const socialPlatforms = [
  {
    label: "Instagram",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-full h-full">
        <defs>
          <linearGradient id="ig-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#f09433" }} />
            <stop offset="25%" style={{ stopColor: "#e6683c" }} />
            <stop offset="50%" style={{ stopColor: "#dc2743" }} />
            <stop offset="75%" style={{ stopColor: "#cc2366" }} />
            <stop offset="100%" style={{ stopColor: "#bc1888" }} />
          </linearGradient>
        </defs>
        <path
          fill="url(#ig-gradient)"
          d="M349.33 69.33H162.67A93.34 93.34 0 0 0 69.33 162.67v186.66a93.34 93.34 0 0 0 93.34 93.34h186.66a93.34 93.34 0 0 0 93.34-93.34V162.67a93.34 93.34 0 0 0-93.34-93.34ZM256 346.67a90.67 90.67 0 1 1 90.67-90.67 90.76 90.76 0 0 1-90.67 90.67Zm93.33-162.67a21.33 21.33 0 1 1 21.34-21.33 21.34 21.34 0 0 1-21.34 21.33Z"
        />
      </svg>
    ),
  },
  {
    label: "TikTok",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full">
        <path d="M12 0h4a6 6 0 0 0 6 6v4a9.99 9.99 0 0 1-6-2v10a6 6 0 1 1-6-6h2v4a2 2 0 1 0 2 2V0z" fill="#000" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full">
        <path
          d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
          fill="#1877F2"
        />
      </svg>
    ),
  },
  {
    label: "Twitter",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full">
        <path
          d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.027 10.027 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"
          fill="#1DA1F2"
        />
      </svg>
    ),
  },
] as const;

export default function ProfilePage() {
  const playerAvatar = usePlayerAvatar();
  const playerName = usePlayerDisplayName();
  const aboutItems = [
    {
      label: "Name",
      value: playerName,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5.121 17.804A10.97 10.97 0 0112 15c2.5 0 4.847.8 6.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      ),
    },
    {
      label: "Date of Birth",
      value: playerProfile.dateOfBirth,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      ),
    },
    {
      label: "Nationality",
      value: playerProfile.nationality,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 5v14m0-14a5 5 0 015-5h8v6h-8a5 5 0 01-5-5z"
        />
      ),
    },
    {
      label: "Preferred Foot",
      value: playerProfile.preferredFoot,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5l7 7-7 7"
        />
      ),
    },
    {
      label: "Height",
      value: playerProfile.height,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M7 21V3h10v18H7z"
        />
      ),
    },
    {
      label: "Weight",
      value: playerProfile.weight,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v8m8-8v8m-4-4h-8"
        />
      ),
    },
    {
      label: "Status",
      value: playerProfile.status,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 12l5-5 5 5-5 5-5-5z"
        />
      ),
    },
  ] as const;

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="relative mb-6 w-full rounded-xl bg-white shadow-sm">
        <div className="relative h-40 w-full sm:h-48 md:h-56">
          <img
            src="/images/grass.jpg"
            alt="Profile cover"
            className="h-32 w-full rounded-t-xl object-cover sm:h-40 md:h-48"
          />

          <div className="absolute bottom-0 left-4 translate-y-1/2 transform">
            <img
              src={playerAvatar}
              alt={playerName}
              className="mt-[-30px] h-16 w-16 rounded-full border-3 border-[#0A2A56] bg-white object-cover sm:h-20 sm:w-20 md:h-24 md:w-24"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 px-4 pt-10 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-lg font-bold text-black sm:text-xl">{playerName}</h1>
            <div className="flex flex-col gap-1 text-sm text-gray-600">
              <span>
                {playerProfile.position}, No. {playerProfile.shirtNumber}
              </span>
              <span>{playerProfile.age} yrs</span>
            </div>
          </div>

          <button className="w-full rounded-lg bg-[#0A2A56] px-6 py-2 text-sm font-semibold text-white hover:opacity-90 sm:w-auto">
            Contact Player
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="w-full rounded-xl bg-white p-4 shadow-sm lg:w-96 xl:w-[460px]">
          <h2 className="mb-4 text-lg font-bold text-black">Player Details</h2>

          <div className="mb-6">
            <h3 className="mb-2 text-sm font-medium text-black">Biography</h3>
            <p className="text-xs leading-relaxed text-black opacity-80">{playerProfile.bio}</p>
          </div>

          <div className="mb-6 border-t border-gray-200 pt-4">
            <div
              style={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 500,
                fontSize: 14,
                color: "#000000",
                marginBottom: "16px",
              }}
            >
              About
            </div>

            <div className="flex flex-col gap-4">
              {aboutItems.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#D2F0FA]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="black">
                      {item.icon}
                    </svg>
                  </div>
                  <span className="text-[12px] font-medium leading-[18px] text-black">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6 border-t border-gray-200 pt-4">
            <h3 className="mb-4 text-sm font-medium text-black">Recommendations</h3>

            <div className="flex flex-col gap-3">
              {recommendationItems.map((item) => (
                <div key={item.value} className="flex items-center gap-3">
                  <div
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center bg-[#D2F0FA]"
                    style={{
                      clipPath:
                        "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="black">
                      {item.icon}
                    </svg>
                  </div>
                  <span className="break-all text-xs font-medium leading-relaxed text-black">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="mb-4 text-sm font-medium text-black">Social Media</h3>

            <div className="flex flex-wrap gap-2">
              {socialPlatforms.map((platform) => (
                <div
                  key={platform.label}
                  className="flex items-center justify-center gap-1 rounded-xl border border-gray-300 bg-white px-2 py-1 md:gap-2 md:px-3 md:py-1.5"
                >
                  <div className="h-3 w-3 flex-shrink-0 md:h-3 md:w-3">{platform.icon}</div>
                  <span className="text-xs font-medium text-black md:text-xs">{platform.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-6">
          {playerProfile.activityPosts.map((post) => (
            <div key={post.id} className="rounded-xl bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <img
                  src={playerAvatar}
                  alt={playerName}
                  className="h-9 w-9 rounded object-cover"
                />

                <div className="flex flex-col">
                  <div className="text-sm font-bold text-black">{playerName}</div>
                  <div className="text-xs text-gray-500">{post.date}</div>
                </div>
              </div>

              <p className="mb-4 text-xs leading-relaxed text-black">{post.content}</p>

              <img
                src={post.image}
                alt={`${playerName} post`}
                className="mb-4 h-40 w-full rounded-lg object-cover sm:h-48"
              />

              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center -space-x-1">
                  <img src="/images/round.png" alt="Supporter 1" className="h-5 w-5 rounded-full border border-white" />
                  <img src="/images/round.png" alt="Supporter 2" className="h-5 w-5 rounded-full border border-white" />
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>2 Comments</span>
                  <span>5 Shares</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <div className="flex items-center justify-around">
                  <button className="flex items-center gap-2 rounded px-3 py-2 text-xs font-medium text-black hover:bg-gray-50">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 14.25l-1.45-1.32C3.4 9.36 1 7.28 1 4.5 1 2.42 2.42 1 4.5 1c1.74 0 3.41.81 4.5 2.09C10.09 1.81 11.76 1 13.5 1 15.58 1 17 2.42 17 4.5c0 2.78-2.4 4.86-5.55 8.43L8 14.25z" stroke="black" strokeWidth="1" fill="none" />
                    </svg>
                    <span>Like</span>
                  </button>

                  <button className="flex items-center gap-2 rounded px-3 py-2 text-xs font-medium text-black hover:bg-gray-50">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2H2C1.45 2 1 2.45 1 3v7c0 .55.45 1 1 1h9l3 3V3c0-.55-.45-1-1-1z" stroke="black" strokeWidth="0.76" fill="none" />
                    </svg>
                    <span>Comment</span>
                  </button>

                  <button className="flex items-center gap-2 rounded px-3 py-2 text-xs font-medium text-black hover:bg-gray-50">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 1.5L12 5.5H9v6H7v-6H4l4-4z" stroke="black" strokeWidth="1" fill="black" />
                    </svg>
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
