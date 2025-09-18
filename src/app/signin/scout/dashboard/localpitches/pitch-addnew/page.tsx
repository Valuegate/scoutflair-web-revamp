"use client";


import React from "react";
import { useRouter } from "next/navigation";

export default function Home(){
     const router = useRouter();
    return(
        <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* Left Side: Form */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Top header with Add New / Edit Profile */}
<div className="flex justify-between items-center bg-white rounded-xl border border-gray-300 shadow p-3">
  <span className="font-bold text-sm">Add New</span>
  <span
    className="font-bold text-sm text-red-500 cursor-pointer hover:underline"
    onClick={() => router.push("/signin/scout/dashboard/localpitches/pitch-edit")}
  >
    Edit Profile
  </span>
</div>

        {/* Info Section */}
<div className="bg-white rounded-lg shadow p-5 flex flex-col mt-[-10px] gap-4">
  <h2 className="font-semibold text-lg text-black">Information</h2>

  {[
        { label: "Name", type: "text" },
    { label: "Address", type: "text" },
    { label: "G.P.S Coordinates", type: "text" },
    { label: "Team Size", type: "text" },
    { label: "Facilities", type: "text" },
    { label: "Age Range", type: "text" },
    { label: "Country", type: "dropdown" },
    { label: "State", type: "dropdown" },
  ].map((field, i) => (
    <div key={i} className="flex flex-col gap-1">
      <span className="text-sm font-normal text-black opacity-80">{field.label}:</span>
      <div className="relative">
        <input
          type="text"
          className="w-full h-10 border border-gray-400 rounded px-2 text-sm"
          placeholder={field.label}
          readOnly={field.type === "dropdown"} // optional
        />
        {field.type === "dropdown" && (
          <svg
            className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </div>
    </div>
  ))}

   {/* Gallery Section */}
        <div className=" p-1  flex flex-col gap-4">
          <h3 className="font-medium text-sm">Gallery</h3>
          <p className="font-semibold text-sm">Upload image</p>

          {/* Drag & Drop Box */}
<div className="border border-dashed border-gray-600 rounded p-5 flex flex-col items-center gap-2 text-center">
  {/* SVG Icon */}
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.72">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.75 2.5C14.75 2.4337 14.7237 2.37011 14.6768 2.32322C14.6299 2.27634 14.5663 2.25 14.5 2.25H7.5C6.77065 2.25 6.07118 2.53973 5.55546 3.05546C5.03973 3.57118 4.75 4.27065 4.75 5V19C4.75 19.7293 5.03973 20.4288 5.55546 20.9445C6.07118 21.4603 6.77065 21.75 7.5 21.75H17.5C18.2293 21.75 18.9288 21.4603 19.4445 20.9445C19.9603 20.4288 20.25 19.7293 20.25 19V9.147C20.25 9.0807 20.2237 9.01711 20.1768 8.97022C20.1299 8.92334 20.0663 8.897 20 8.897H15.5C15.3011 8.897 15.1103 8.81798 14.9697 8.67733C14.829 8.53668 14.75 8.34591 14.75 8.147V2.5ZM14.531 13.336C14.6864 13.4604 14.8849 13.5179 15.0827 13.496C15.2806 13.4741 15.4616 13.3744 15.586 13.219C15.7104 13.0636 15.7679 12.8651 15.746 12.6673C15.7241 12.4694 15.6244 12.2884 15.469 12.164L12.975 10.169C12.8416 10.0598 12.6744 10 12.502 10H12.494C12.3247 10.001 12.1607 10.0596 12.029 10.166L9.532 12.164C9.37658 12.2883 9.27689 12.4692 9.25486 12.6669C9.23282 12.8647 9.29025 13.0631 9.4145 13.2185C9.53875 13.3739 9.71966 13.4736 9.91742 13.4956C10.1152 13.5177 10.3136 13.4603 10.469 13.336L11.75 12.31V15.75C11.75 15.8485 11.7694 15.946 11.8071 16.037C11.8448 16.128 11.9 16.2107 11.9697 16.2803C12.0393 16.35 12.122 16.4052 12.213 16.4429C12.304 16.4806 12.4015 16.5 12.5 16.5C12.5985 16.5 12.696 16.4806 12.787 16.4429C12.878 16.4052 12.9607 16.35 13.0303 16.2803C13.1 16.2107 13.1552 16.128 13.1929 16.037C13.2306 15.946 13.25 15.8485 13.25 15.75V12.31L14.531 13.336Z"
        fill="#222222"
      />
      <path
        d="M16.25 2.82444C16.25 2.64044 16.443 2.52345 16.586 2.63845C16.707 2.73645 16.816 2.85045 16.909 2.98045L19.922 7.17744C19.99 7.27345 19.916 7.39744 19.798 7.39744H16.5C16.4337 7.39744 16.3701 7.37111 16.3232 7.32422C16.2763 7.27734 16.25 7.21375 16.25 7.14744V2.82444Z"
        fill="black"
      />
    </g>
  </svg>

  <span className="text-xs">
    Drag & drop your files here or <span className="font-extrabold">choose file</span>
  </span>
</div>

        </div>
      </div>
         {/* Action Buttons */}
          <div className="flex gap-4 mt-4">
            <button className="flex-1 border border-red-500 rounded-lg py-2 font-semibold text-black">
              Cancel
            </button>
            <button className="flex-1 bg-[#0A2A56] rounded-lg py-2 font-semibold text-white">
              Save
            </button>
          </div>

</div>


       
      {/* Right Side: Image */}
      <div className="flex-1">
        <img
          src="/images/map-copy.png"
          alt="Academy Preview"
          className="w-full xl:h-[873px] md:h-[873px] sm:h-auto rounded-xl object-cover"
        />
      </div>
    </div>
    )
}