"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface GalleryItem {
  id: string;
  url?: string;
  imageUrl?: string;
  category?: string;
  username?: string;
}

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        // 🔥 Use the correct token key — your localStorage showed "authToken"
        const token = localStorage.getItem("authToken");
        const userSession = JSON.parse(localStorage.getItem("userSession") || "{}");

        if (!token) {
          throw new Error("No token found. Please log in again.");
        }

        console.log("🎟 Token found:", token);
        console.log("👤 User session:", userSession);

        // 🔥 Send the request to your local API route (proxy)
        const response = await axios.get("/api/gallery", {
          params: {
            category: "players",
            limit: 5,
            offset: 0,
            playeremail: userSession?.email || "shuniegold@gmail.com", // fallback
          },
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "*/*",
          },
        });

        console.log("📸 Full API Response:", response.data);

        if (response.data?.data?.obj) {
          setGallery(response.data.data.obj as GalleryItem[]);
        } else {
          setGallery([]);
        }
      } catch (err: any) {
        console.error("❌ Error fetching gallery:", err.response || err.message);
        setError("Failed to load gallery.");
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) return <p className="text-center">Loading gallery...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  return (
    <div className="flex flex-col px-4 py-8 md:ml-[-18px]">
      {/* Search Bar */}
      <div className="w-full mt-[-20px] md:max-w-[805px] h-auto md:h-16 rounded-xl bg-white shadow-md px-3 md:px-4 py-3 md:py-0 md:mt-[-35px] flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-0 relative z-10">
        <div className="w-full max-w-[805px] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 md:gap-0">
          {/* Search Box */}
          <div className="w-full md:max-w-[650px] h-[40px] md:h-[30px] rounded-md bg-[#EFEFEF] px-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 md:w-3 md:h-3 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 md:h-3 md:w-3 text-[#555555]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M17 10.5A6.5 6.5 0 104 10.5a6.5 6.5 0 0013 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="search.."
                className="bg-[#EFEFEF] outline-none text-black placeholder-gray-400 text-sm w-full"
              />
            </div>

            {/* Edit + Delete Icons */}
            <div className="flex items-center space-x-4 md:space-x-5">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 md:h-4 md:w-4 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"
                  />
                </svg>
              </button>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 md:h-4 md:w-4 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          <button className="border border-gray-400 rounded-md px-6 md:px-7 py-2 md:py-1 text-gray-700 hover:bg-gray-100 w-full md:w-auto">
            Filter
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6 mt-6 md:mt-8">
        {/* LEFT SIDE - Gallery */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
        {gallery.length > 0 ? (
  gallery.map((item: GalleryItem) => (
    <div
      key={item.id}
      className="border rounded-lg overflow-hidden shadow-sm"
    >
      <img
        src={item.url || item.imageUrl || "/images/placeholder.png"}
        alt="gallery"
        className="w-full h-40 object-cover"
      />
    </div>
  ))
) : (
  <p className="text-gray-500">No gallery items found.</p>
)}
        </div>
                {/* RIGHT SIDE - News Panel (stacked) */}
        <div className="flex flex-col gap-4 md:gap-6 w-full md:w-[350px] lg:w-[35%] lg:max-w-[400px] order-2 lg:order-none md:mt-[-95px] lg:mt-[-95px]">

          {/* Top Container - News Feed */}
          <div className="w-full bg-white rounded-xl shadow-md p-4 relative min-h-[400px] md:h-[780px] lg:h-[600px] xl:h-[730px]">

            {/* Top Frame */}
            <div className="flex justify-between items-center mb-4 md:absolute md:w-[315px] lg:w-full lg:relative md:top-5 md:left-4 lg:top-0 lg:left-0">
              {/* Left: News Feed */}
              <span className="font-bold text-lg md:text-[18px] text-[#222222]">
                News Feed
              </span>

              {/* Right: View All */}
              <span className="text-xs md:text-[12px] text-[#222222]">
                View All
              </span>
            </div>

            {/* Featured Article */}
            <div className="relative mb-6 md:absolute md:top-[60px] lg:relative lg:top-0 md:left-4 lg:left-0 md:w-[315px] lg:w-full md:h-[140px] lg:h-auto">
              {/* Background Image */}
              <div className="w-full h-32 md:h-[140px] lg:h-[160px] rounded-lg overflow-hidden relative">
                <img 
                  src="/images/grass.jpg"
                  alt="News"
                  className="w-full h-full object-cover rounded-lg"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-[#041931B8] rounded-lg p-4">
                  {/* Top Bars */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="w-4 h-0.5 bg-white rounded"></div>
                    <div className="w-8 h-0.5 bg-gray-400 rounded"></div>
                  </div>

                  {/* Content */}
                  <div className="flex justify-between items-start">
                    {/* Left: Text Content */}
                    <div className="flex flex-col gap-2 flex-1 pr-3">
                      {/* Category + Time */}
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold text-xs">Local News</span>
                        <div className="flex items-center gap-1">
                          <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
                          <span className="text-white text-[10px]">2 hours ago</span>
                        </div>
                      </div>

                      {/* Headline */}
                      <p className="text-white text-xs leading-tight opacity-90">
                        Valuegate Football Academy Unveils New 300-Seater Local Stadium, Located in Abuja, Nigeria
                      </p>
                    </div>

                    {/* Right: Thumbnail */}
                    <img 
                      src="/images/round.png"
                      alt="Thumbnail"
                      className="w-16 h-12 md:w-[84px] md:h-[65px] lg:w-[90px] lg:h-[70px] rounded object-cover flex-shrink-0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* News List */}
            <div className="space-y-3 md:absolute md:top-[220px] lg:relative lg:top-0 md:left-4 lg:left-0 md:w-[284px] lg:w-full">
              {[...Array(5)].map((_, index) => (
                <div key={index}>
                  <div className="flex gap-3 p-2">
                    {/* Left Thumbnail */}
                    <img 
                      src="/images/round.png" 
                      alt="Thumb" 
                      className="w-12 h-12 md:w-[65px] md:h-[65px] lg:w-[60px] lg:h-[60px] rounded object-cover flex-shrink-0"
                    />

                    {/* Right Text Block */}
                    <div className="flex-1 flex flex-col gap-2">
                      {/* Category + Time */}
                      <div className="flex gap-2 items-center text-xs font-semibold">
                        <span>Sport News</span>
                        <div className="flex gap-1 items-center">
                          <div className="w-0.5 h-0.5 bg-black rounded-full"></div>
                          <span className="text-[10px] font-normal">2 hours ago</span>
                        </div>
                      </div>

                      {/* Headline */}
                      <p className="text-xs leading-tight text-[#222] opacity-90">
                        Valuegate Football Academy Unveils New 300-Seater Local Stadium, Located in Abuja, Nigeria
                      </p>
                    </div>
                  </div>
                  {index < 4 && <hr className="border-t border-gray-200 my-2 lg:w-full" />}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Container - Featured Ads */}
          <div className="w-full mt-[2px] bg-white rounded-xl shadow-md p-4 flex md:h-[342px] lg:h-[280px] xl:h-[330px]">
            {/* Left Side Content */}
            <div className="flex-1 md:p-4 lg:p-2 md:pr-2">
              {/* Featured Ads Header */}
              <div className="mb-6 md:mb-12 lg:mb-12">
                <h3 className="text-gray-800 font-bold text-base">
                  Featured Ads
                </h3>
              </div>

              {/* Subscription Content */}
              <div className="mb-6 lg:mb-4">
                {/* Title */}
                <h4 className="text-gray-800 font-semibold text-base mb-3 leading-tight">
                  Subscribe to Scoutflair Premium Plan
                </h4>

                {/* Description */}
                <p className="text-gray-600 text-xs leading-tight mb-4">
                  Lorem ipsum dolor sit amet consectetur. Nunc malesuada ultricies amet metus vive at.
                </p>
              </div>

              {/* Subscribe Button */}
              <button
                className="bg-[#0A2A56] rounded px-8 md:px-12 lg:px-8 py-2 text-white font-semibold text-sm transition-colors hover:bg-blue-800 w-full md:w-auto lg:w-full  xl:w-auto"
              >
                Subscribe
              </button>
            </div>

            {/* Right Side Image */}
            <div className="w-48 h-50 md:w-[300px] md:h-[239px] lg:w-[180px] lg:h-[200px] xl:w-[220px] xl:h-[270px] relative md:mt-0 md:ml-[-115px] lg:ml-[-60px] xl:ml-[-80px] flex-shrink-0 ml-[-28px]">
              <img 
                src="/images/image.png" 
                alt="Player" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}