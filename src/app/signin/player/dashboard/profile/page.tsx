     export default function ProfilePage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Main Profile Card */}
      <div className="relative w-full bg-white rounded-xl shadow-sm mb-6">
        {/* Cover */}
        <div className="relative w-full h-40 sm:h-48 md:h-56">
          <img
            src="/images/grass.jpg"
            alt="Profile Cover"
            className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-t-xl"
          />

          {/* Avatar */}
          <div className="absolute bottom-0 left-4 transform translate-y-1/2">
            <img
              src="/images/round.png"
              alt="Player"
              className="w-16 h-16 mt-[-30px] sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover border-3 border-[#0A2A56] rounded-full bg-white"
            />
          </div>
        </div>

        {/* Bottom section: text + button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 pt-10 pb-4 gap-4">
          {/* Left text stack */}
          <div className="flex flex-col gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-black">
              Peter Abbas
            </h1>
            <div className="flex flex-col gap-1 text-sm text-gray-600">
              <span>Midfielder, No. 8</span>
              <span>22 yrs</span>
            </div>
          </div>

          {/* CTA */}
          <button className="w-full sm:w-auto px-6 py-2 bg-[#0A2A56] text-white rounded-lg font-semibold text-sm hover:opacity-90">
            Contact Player
          </button>
        </div>
      </div>

      {/* Content Grid - Mobile: stacked, Desktop: side-by-side */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Player Details Container */}
        <div className="w-full lg:w-96 xl:w-[460px] bg-white rounded-xl shadow-sm p-4">
          {/* Title */}
          <h2 className="text-lg font-bold text-black mb-4">Player Details</h2>

          {/* Biography Section */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-black mb-2">Biography</h3>
            <p className="text-xs text-black opacity-80 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Nunc malesuada ultricies amet metus viverra
              posuere a elit id. Ut vitae in diam risus urna. Mattis tempor convallis in eget
              suspendisse est eu. Odio fermentum at laoreet feugiat. Odio fermentum at.
            </p>
          </div>

          <div className="border-t border-gray-200 pt-4 mb-6">
            {/* About Section */}
          <div className="mb-6">
            <div
              style={{
                fontFamily: 'Lato, sans-serif',
                fontWeight: 500,
                fontSize: 14,
                color: '#000000',
                marginBottom: '16px',
              }}
            >
              About
            </div>

            <div className="flex flex-col gap-4">
              {/* Name */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-[#D2F0FA] rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="black">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A10.97 10.97 0 0112 15c2.5 0 4.847.8 6.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-[12px] font-medium text-black leading-[18px]">Peter Adedamola Abbas</span>
              </div>

              {/* Date of Birth */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-[#D2F0FA] rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="black">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-[12px] font-medium text-black leading-[18px]">August 21, 2002</span>
              </div>

              {/* Nationality */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-[#D2F0FA] rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="black">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5v14m0-14a5 5 0 015-5h8v6h-8a5 5 0 01-5-5z" />
                  </svg>
                </div>
                <span className="text-[12px] font-medium text-black leading-[18px]">Nigerian</span>
              </div>

              {/* Preferred Foot */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-[#D2F0FA] rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="black">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <span className="text-[12px] font-medium text-black leading-[18px]">Left</span>
              </div>

              {/* Height */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-[#D2F0FA] rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="black">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21V3h10v18H7z" />
                  </svg>
                </div>
                <span className="text-[12px] font-medium text-black leading-[18px]">167cm</span>
              </div>

              {/* Weight */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-[#D2F0FA] rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="black">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v8m8-8v8m-4-4h-8" />
                  </svg>
                </div>
                <span className="text-[12px] font-medium text-black leading-[18px]">200lbs</span>
              </div>

              {/* Status */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-[#D2F0FA] rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="black">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12l5-5 5 5-5 5-5-5z" />
                  </svg>
                </div>
                <span className="text-[12px] font-medium text-black leading-[18px]">Independent</span>
              </div>
            </div>
          </div>
           </div>
          <div className="border-t border-gray-200 pt-4 mb-6">
            {/* Recommendations Section */}
            <h3 className="text-sm font-medium text-black mb-4">Recommendations</h3>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-[#D2F0FA] flex-shrink-0" style={{
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="black">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4zm0-4a4 4 0 100-8 4 4 0 000 8z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-black leading-relaxed">Joshua Fayomi</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-[#D2F0FA] flex-shrink-0" style={{
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="black">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H8m8 0l-4-4m4 4l-4 4M3 8v8a5 5 0 005 5h8a5 5 0 005-5V8a5 5 0 00-5-5H8a5 5 0 00-5 5z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-black leading-relaxed break-all">joshuafayomi@gmail.com</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-[#D2F0FA] flex-shrink-0" style={{
                  clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="black">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h2a2 2 0 012 2v1a2 2 0 01-.586 1.414l-1.293 1.293a16 16 0 006.586 6.586l1.293-1.293A2 2 0 0115 14h1a2 2 0 012 2v2a2 2 0 01-2 2h-1C7.82 20 4 16.18 4 11V9a2 2 0 012-2H5z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-black leading-relaxed">+2347067******</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
  {/* Social Media Section */}
  <h3 className="text-sm font-medium text-black mb-4">Social Media</h3>

  <div className="flex flex-wrap gap-2">
    {/* Instagram Button */}
    <div className="flex items-center justify-center px-2 py-1 md:px-3 md:py-1.5 border border-gray-300 rounded-xl bg-white gap-1 md:gap-2">
      <div className="w-3 h-3 md:w-3 md:h-3 flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-full h-full">
          <defs>
            <linearGradient id="ig-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#f09433'}} />
              <stop offset="25%" style={{stopColor: '#e6683c'}} />
              <stop offset="50%" style={{stopColor: '#dc2743'}} />
              <stop offset="75%" style={{stopColor: '#cc2366'}} />
              <stop offset="100%" style={{stopColor: '#bc1888'}} />
            </linearGradient>
          </defs>
          <path fill="url(#ig-gradient)" d="M349.33 69.33H162.67A93.34 93.34 0 0 0 69.33 162.67v186.66a93.34 93.34 0 0 0 93.34 93.34h186.66a93.34 93.34 0 0 0 93.34-93.34V162.67a93.34 93.34 0 0 0-93.34-93.34ZM256 346.67a90.67 90.67 0 1 1 90.67-90.67 90.76 90.76 0 0 1-90.67 90.67Zm93.33-162.67a21.33 21.33 0 1 1 21.34-21.33 21.34 21.34 0 0 1-21.34 21.33Z" />
        </svg>
      </div>
      <span className="text-xs md:text-xs font-medium text-black">Instagram</span>
    </div>

    {/* TikTok Button */}
    <div className="flex items-center justify-center px-2 py-1 md:px-3 md:py-1.5 border border-gray-300 rounded-xl bg-white gap-1 md:gap-2">
      <div className="w-3 h-3 md:w-3 md:h-3 flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full">
          <path d="M12 0h4a6 6 0 0 0 6 6v4a9.99 9.99 0 0 1-6-2v10a6 6 0 1 1-6-6h2v4a2 2 0 1 0 2 2V0z" fill="#000" />
        </svg>
      </div>
      <span className="text-xs md:text-xs font-medium text-black">TikTok</span>
    </div>

    {/* Facebook Button */}
    <div className="flex items-center justify-center px-2 py-1 md:px-3 md:py-1.5 border border-gray-300 rounded-xl bg-white gap-1 md:gap-2">
      <div className="w-3 h-3 md:w-3 md:h-3 flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2" />
        </svg>
      </div>
      <span className="text-xs md:text-xs font-medium text-black">Facebook</span>
    </div>

    {/* Twitter Button */}
    <div className="flex items-center justify-center px-2 py-1 md:px-3 md:py-1.5 border border-gray-300 rounded-xl bg-white gap-1 md:gap-2">
      <div className="w-3 h-3 md:w-3 md:h-3 flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.027 10.027 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" fill="#1DA1F2" />
        </svg>
      </div>
      <span className="text-xs md:text-xs font-medium text-black">Twitter</span>
    </div>
  </div>
</div> 
</div>
       {/* Activity Feed Container */}
        <div className="flex-1 space-y-6">
          {/* First Post Card */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            {/* Author Info */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/round.png"
                alt="Peters Samuel"
                className="w-9 h-9 rounded object-cover"
              />
              
              <div className="flex flex-col">
                <div className="text-sm font-bold text-black">Peters Samuel</div>
                <div className="text-xs text-gray-500">August 21, 2024 | 9:30PM</div>
              </div>
            </div>

            {/* Post Text */}
            <p className="text-xs text-black mb-4 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Nunc malesuada ultricies amet metus viverra posuere a elit id. Ut vitae in diam risus urna. Mattis tempor convallis in eget suspendisse est eu. Odio fermentum at laoreet feugiat. Odio fermentum at.
            </p>

            {/* Post Image */}
            <img
              src="/images/grass.jpg"
              alt="Post Image"
              className="w-full h-40 sm:h-48 object-cover rounded-lg mb-4"
            />

            {/* Engagement Stats */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center -space-x-1">
                <img src="/images/round.png" alt="User 1" className="w-5 h-5 rounded-full border border-white" />
                <img src="/images/round.png" alt="User 2" className="w-5 h-5 rounded-full border border-white" />
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>2 Comments</span>
                <span>5 Shares</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="border-t border-gray-200 pt-3">
              <div className="flex items-center justify-around">
                <button className="flex items-center gap-2 text-xs font-medium text-black hover:bg-gray-50 px-3 py-2 rounded">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 14.25l-1.45-1.32C3.4 9.36 1 7.28 1 4.5 1 2.42 2.42 1 4.5 1c1.74 0 3.41.81 4.5 2.09C10.09 1.81 11.76 1 13.5 1 15.58 1 17 2.42 17 4.5c0 2.78-2.4 4.86-5.55 8.43L8 14.25z" stroke="black" strokeWidth="1" fill="none" />
                  </svg>
                  <span>Like</span>
                </button>

                <button className="flex items-center gap-2 text-xs font-medium text-black hover:bg-gray-50 px-3 py-2 rounded">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H2C1.45 2 1 2.45 1 3v7c0 .55.45 1 1 1h9l3 3V3c0-.55-.45-1-1-1z" stroke="black" strokeWidth="0.76" fill="none" />
                  </svg>
                  <span>Comment</span>
                </button>

                <button className="flex items-center gap-2 text-xs font-medium text-black hover:bg-gray-50 px-3 py-2 rounded">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 1.5L12 5.5H9v6H7v-6H4l4-4z" stroke="black" strokeWidth="1" fill="black" />
                  </svg>
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>

          {/* Second Post Card (Duplicate) */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            {/* Author Info */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/round.png"
                alt="Peters Samuel"
                className="w-9 h-9 rounded object-cover"
              />
              
              <div className="flex flex-col">
                <div className="text-sm font-bold text-black">Peters Samuel</div>
                <div className="text-xs text-gray-500">August 21, 2024 | 9:30PM</div>
              </div>
            </div>

            {/* Post Text */}
            <p className="text-xs text-black mb-4 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Nunc malesuada ultricies amet metus viverra posuere a elit id. Ut vitae in diam risus urna. Mattis tempor convallis in eget suspendisse est eu. Odio fermentum at laoreet feugiat. Odio fermentum at.
            </p>

            {/* Post Image */}
            <img
              src="/images/grass.jpg"
              alt="Post Image"
              className="w-full h-40 sm:h-48 object-cover rounded-lg mb-4"
            />

            {/* Engagement Stats */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center -space-x-1">
                <img src="/images/round.png" alt="User 1" className="w-5 h-5 rounded-full border border-white" />
                <img src="/images/round.png" alt="User 2" className="w-5 h-5 rounded-full border border-white" />
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>2 Comments</span>
                <span>5 Shares</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="border-t border-gray-200 pt-3">
              <div className="flex items-center justify-around">
                <button className="flex items-center gap-2 text-xs font-medium text-black hover:bg-gray-50 px-3 py-2 rounded">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 14.25l-1.45-1.32C3.4 9.36 1 7.28 1 4.5 1 2.42 2.42 1 4.5 1c1.74 0 3.41.81 4.5 2.09C10.09 1.81 11.76 1 13.5 1 15.58 1 17 2.42 17 4.5c0 2.78-2.4 4.86-5.55 8.43L8 14.25z" stroke="black" strokeWidth="1" fill="none" />
                  </svg>
                  <span>Like</span>
                </button>

                <button className="flex items-center gap-2 text-xs font-medium text-black hover:bg-gray-50 px-3 py-2 rounded">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H2C1.45 2 1 2.45 1 3v7c0 .55.45 1 1 1h9l3 3V3c0-.55-.45-1-1-1z" stroke="black" strokeWidth="0.76" fill="none" />
                  </svg>
                  <span>Comment</span>
                </button>

                <button className="flex items-center gap-2 text-xs font-medium text-black hover:bg-gray-50 px-3 py-2 rounded">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 1.5L12 5.5H9v6H7v-6H4l4-4z" stroke="black" strokeWidth="1" fill="black" />
                  </svg>
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}