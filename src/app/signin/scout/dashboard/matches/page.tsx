import React from "react";

export default function Home() {
  return (
    <div className="p-6 min-h-screen flex gap-6">
      {/* Left Column */}
      <div>
        {/* Main Match Card */}
        <div className="relative w-[562px] h-[152px] mt-[-30px] ml-[-30px]">
          {/* Background Image */}
          <div 
            className="absolute inset-0 rounded-xl shadow-lg bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1993&q=80')",
              boxShadow: '0px 4px 8px 0px rgba(209, 209, 209, 0.12)'
            }}
          />
          
          {/* Dark Overlay */}
          <div 
            className="absolute inset-0 rounded-xl"
            style={{ backgroundColor: '#041931' }}
          />
          
          {/* Content Container */}
          <div className="absolute top-5 left-0 w-[245px] h-[73px] flex flex-col gap-3">
            {/* Match Title */}
            <div className="px-5 pr-5">
              <h2 
                className="text-white text-base font-semibold leading-none"
                style={{ fontFamily: 'Lato', }}
              >
                Valuegate Academy vs FC Jabi
              </h2>
            </div>
            
            {/* Date and Venue Container */}
            <div className="pl-5 flex flex-col gap-0.5">
              {/* Date Section */}
              <div className="flex items-center gap-2 py-0.5">
                <div className="w-[14px] h-[14px] opacity-92 flex items-center justify-center">
                  <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.375 1.75H9.0625V1.3125C9.0625 1.19647 9.01641 1.08519 8.93436 1.00314C8.85231 0.921094 8.74103 0.875 8.625 0.875C8.50897 0.875 8.39769 0.921094 8.31564 1.00314C8.23359 1.08519 8.1875 1.19647 8.1875 1.3125V1.75H3.8125V1.3125C3.8125 1.19647 3.76641 1.08519 3.68436 1.00314C3.60231 0.921094 3.49103 0.875 3.375 0.875C3.25897 0.875 3.14769 0.921094 3.06564 1.00314C2.98359 1.08519 2.9375 1.19647 2.9375 1.3125V1.75H1.625C1.39294 1.75 1.17038 1.84219 1.00628 2.00628C0.842187 2.17038 0.75 2.39294 0.75 2.625V11.375C0.75 11.6071 0.842187 11.8296 1.00628 11.9937C1.17038 12.1578 1.39294 12.25 1.625 12.25H10.375C10.6071 12.25 10.8296 12.1578 10.9937 11.9937C11.1578 11.8296 11.25 11.6071 11.25 11.375V2.625C11.25 2.39294 11.1578 2.17038 10.9937 2.00628C10.8296 1.84219 10.6071 1.75 10.375 1.75ZM2.9375 2.625V3.0625C2.9375 3.17853 2.98359 3.28981 3.06564 3.37186C3.14769 3.45391 3.25897 3.5 3.375 3.5C3.49103 3.5 3.60231 3.45391 3.68436 3.37186C3.76641 3.28981 3.8125 3.17853 3.8125 3.0625V2.625H8.1875V3.0625C8.1875 3.17853 8.23359 3.28981 8.31564 3.37186C8.39769 3.45391 8.50897 3.5 8.625 3.5C8.74103 3.5 8.85231 3.45391 8.93436 3.37186C9.01641 3.28981 9.0625 3.17853 9.0625 3.0625V2.625H10.375V4.375H1.625V2.625H2.9375ZM10.375 11.375H1.625V5.25H10.375V11.375ZM5.125 6.5625V10.0625C5.125 10.1785 5.07891 10.2898 4.99686 10.3719C4.91481 10.4539 4.80353 10.5 4.6875 10.5C4.57147 10.5 4.46019 10.4539 4.37814 10.3719C4.29609 10.2898 4.25 10.1785 4.25 10.0625V7.27016L4.00828 7.39156C3.90443 7.44349 3.78421 7.45203 3.67406 7.41531C3.56391 7.3786 3.47286 7.29963 3.42094 7.19578C3.36901 7.09193 3.36047 6.97171 3.39719 6.86156C3.4339 6.75141 3.51287 6.66036 3.61672 6.60844L4.49172 6.17094C4.55844 6.13755 4.6326 6.12178 4.70714 6.12513C4.78168 6.12848 4.85412 6.15083 4.91758 6.19007C4.98104 6.22931 5.03342 6.28413 5.06972 6.34931C5.10602 6.4145 5.12505 6.48789 5.125 6.5625ZM8.36031 8.22773L7.3125 9.625H8.1875C8.30353 9.625 8.41481 9.67109 8.49686 9.75314C8.57891 9.83519 8.625 9.94647 8.625 10.0625C8.625 10.1785 8.57891 10.2898 8.49686 10.3719C8.41481 10.4539 8.30353 10.5 8.1875 10.5H6.4375C6.35625 10.5 6.27661 10.4774 6.20749 10.4347C6.13838 10.3919 6.08252 10.3308 6.04619 10.2582C6.00985 10.1855 5.99447 10.1041 6.00177 10.0232C6.00906 9.94229 6.03875 9.865 6.0875 9.8L7.66141 7.70164C7.69721 7.65398 7.72289 7.59951 7.73688 7.54157C7.75087 7.48362 7.75287 7.42343 7.74276 7.36469C7.73266 7.30595 7.71065 7.24989 7.6781 7.19995C7.64554 7.15002 7.60313 7.10726 7.55346 7.07431C7.50379 7.04136 7.44791 7.01891 7.38925 7.00833C7.33059 6.99775 7.27038 6.99927 7.21233 7.01279C7.15428 7.02632 7.0996 7.05156 7.05165 7.08698C7.00371 7.1224 6.96351 7.16724 6.93352 7.21875C6.90564 7.27009 6.86776 7.31533 6.82211 7.35179C6.77646 7.38826 6.72398 7.41521 6.66775 7.43106C6.61152 7.44692 6.55268 7.45134 6.49471 7.44409C6.43674 7.43683 6.38081 7.41804 6.33022 7.38882C6.27963 7.3596 6.2354 7.32054 6.20015 7.27395C6.1649 7.22736 6.13934 7.17418 6.12497 7.11755C6.11061 7.06092 6.10773 7.00199 6.11651 6.94423C6.12529 6.88647 6.14555 6.83105 6.17609 6.78125C6.32061 6.53116 6.5436 6.33572 6.81048 6.22524C7.07736 6.11476 7.37323 6.0954 7.65223 6.17017C7.93123 6.24493 8.17778 6.40965 8.35365 6.63878C8.52953 6.86791 8.6249 7.14865 8.625 7.4375C8.62593 7.72283 8.53291 8.00053 8.36031 8.22773Z" fill="white" fillOpacity="0.88"/>
                  </svg>
                </div>
                <span 
                  className="text-white text-xs font-normal leading-none"
                  style={{ fontFamily: 'Lato' }}
                >
                  10 September, 2024
                </span>
              </div>
              
              {/* Venue Section */}
              <div className="flex items-center gap-2 py-0.5">
                <div className="w-[14px] h-[14px] opacity-84 flex items-center justify-center">
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.33366 0.333008C0.686159 0.333008 0.166992 0.852174 0.166992 1.49967V8.49967C0.166992 8.80909 0.289908 9.10584 0.508701 9.32463C0.727493 9.54342 1.02424 9.66634 1.33366 9.66634H10.667C10.9764 9.66634 11.2732 9.54342 11.4919 9.32463C11.7107 9.10584 11.8337 8.80909 11.8337 8.49967V1.49967C11.8337 1.19026 11.7107 0.893509 11.4919 0.674717C11.2732 0.455924 10.9764 0.333008 10.667 0.333008H1.33366ZM1.33366 1.49967H5.41699V2.74217C4.39033 3.01051 3.66699 3.93801 3.66699 4.99967C3.66837 5.51641 3.84082 6.01815 4.15741 6.42655C4.474 6.83495 4.91691 7.12702 5.41699 7.25717V8.49967H1.33366V7.33301H3.08366V2.66634H1.33366V1.49967ZM6.58366 1.49967H10.667V2.66634H8.91699V7.33301H10.667V8.49967H6.58366V7.25717C7.61033 6.98884 8.33366 6.06134 8.33366 4.99967C8.33228 4.48294 8.15983 3.9812 7.84324 3.5728C7.52665 3.1644 7.08374 2.87232 6.58366 2.74217V1.49967ZM1.33366 3.83301H1.91699V6.16634H1.33366V3.83301ZM10.0837 3.83301H10.667V6.16634H10.0837V3.83301ZM6.58366 3.99051C6.94533 4.20051 7.16699 4.58551 7.16699 4.99967C7.16699 5.41384 6.94533 5.79884 6.58366 6.00884V3.99051ZM5.41699 3.99051V6.00884C5.05533 5.79884 4.83366 5.41384 4.83366 4.99967C4.83366 4.58551 5.05533 4.20051 5.41699 3.99051Z" fill="white" fillOpacity="0.88"/>
                  </svg>
                </div>
                <span 
                  className="text-white text-xs font-normal leading-none opacity-92"
                  style={{ fontFamily: 'Lato' }}
                >
                  Old Jabi Township Stadium
                </span>
              </div>
            </div>
          </div>
          
          {/* Preview Button */}
          <button 
            className="absolute bottom-[18px] left-[22px] px-[14px] py-[6px] rounded-xl text-white text-xs font-medium leading-none text-center shadow-lg"
            style={{
              fontFamily: 'Lato',
              border: '0.88px solid #FFA500',
              boxShadow: '0px 4px 8px 0px rgba(209, 209, 209, 0.12)'
            }}
          >
            PREVIEW
          </button>

          {/* Right Side Image */}
          <div 
            className="absolute top-0 right-0 w-[266px] h-[152px] rounded-r-xl bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
            }}
          />
        </div>
        
        {/* Recent Matches Section */}
        <div className="w-[562px] mt-6 ml-[-30px] bg-white rounded-xl p-3 shadow-lg">
          {/* Header Section */}
          <div className="mb-4">
            {/* Title */}
            <div className="mb-3">
              <h3 className="text-black font-bold text-base pl-5" style={{ fontFamily: 'Lato' }}>
                Recent Matches
              </h3>
            </div>
            
            {/* Tournament Info and View All on same line */}
            <div className="flex justify-between items-center pl-5 pr-5">
              <div className="flex items-center gap-1">
                <div className="w-9 h-9 border border-[#B1D4E0] rounded bg-gray-100"></div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-black font-semibold text-xs" style={{ fontFamily: 'Lato' }}>
                    Fayomi's Cup
                  </span>
                  <span className="text-[#555555] font-normal text-[8px]" style={{ fontFamily: 'Lato' }}>
                    Local Championship
                  </span>
                </div>
              </div>
              
              <span className="text-black font-normal text-xs" style={{ fontFamily: 'Lato' }}>
                View All
              </span>
            </div>
          </div>
          
          {/* Match Results */}
          <div className="opacity-88">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between px-5 py-2 border-b border-[#E0E0E0] bg-white">
                {/* Left side - Status */}
                <div className="flex items-center gap-3">
                  <div className="w-[18px] h-[18px] flex items-center justify-center">
                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.42969 1.05078C6.6093 0.497994 7.3907 0.497996 7.57031 1.05078L8.41602 3.65137C8.60343 4.22817 9.14059 4.6191 9.74707 4.61914H12.4814C13.0625 4.61914 13.3047 5.36234 12.835 5.7041L10.6221 7.31152C10.1314 7.66802 9.92587 8.30013 10.1133 8.87695L10.959 11.4775C11.1386 12.0303 10.5054 12.4901 10.0352 12.1484L7.82324 10.541C7.33256 10.1845 6.66744 10.1845 6.17676 10.541L3.96484 12.1484C3.49462 12.4901 2.8614 12.0303 3.04102 11.4775L3.88672 8.87695C4.07413 8.30013 3.86861 7.66802 3.37793 7.31152L1.16504 5.7041C0.69532 5.36234 0.937478 4.61914 1.51855 4.61914H4.25293C4.85941 4.6191 5.39657 4.22817 5.58398 3.65137L6.42969 1.05078Z" stroke="#555555" strokeWidth="0.8"/>
                    </svg>
                  </div>
                  <span className="text-[#555555] font-normal text-sm" style={{ fontFamily: 'Lato' }}>
                    {index === 6 ? 'NS' : 'FT'}
                  </span>
                </div>
                
                {/* Teams and Score */}
                <div className="flex items-center gap-12">
                  {/* Team 1 */}
                  <div className="flex items-center gap-1">
                    <div className="w-[18px] h-[18px] rounded-full bg-[#B1D4E0] p-0.5">
                      <div className="w-[14px] h-[14px] bg-gray-200 rounded-full"></div>
                    </div>
                    <span className="text-[#222222] font-normal text-sm" style={{ fontFamily: 'Lato' }}>
                      Michaels Academy
                    </span>
                  </div>
                  
                  {/* Score */}
                  <div className="bg-[#B1D4E0] rounded px-2 py-0.5">
                    <span className="text-[#222222] font-semibold text-xs" style={{ fontFamily: 'Lato' }}>
                      2 : 4
                    </span>
                  </div>
                  
                  {/* Team 2 */}
                  <div className="flex items-center gap-1">
                    <span className="text-[#222222] font-normal text-sm" style={{ fontFamily: 'Lato' }}>
                      St Johns Academy
                    </span>
                    <div className="w-[18px] h-[18px] rounded-full bg-[#B1D4E0] p-0.5">
                      <div className="w-[14px] h-[14px] bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Second Recent Matches Section */}
        <div className="w-[562px] mt-6 ml-[-30px] bg-white rounded-xl p-3 shadow-lg">
          {/* Header Section */}
          <div className="mb-4">
            {/* Title */}
            <div className="mb-3">
              <h3 className="text-black font-bold text-base pl-5" style={{ fontFamily: 'Lato' }}>
                Recent Matches
              </h3>
            </div>
            
            {/* Tournament Info and View All on same line */}
            <div className="flex justify-between items-center pl-5 pr-5">
              <div className="flex items-center gap-1">
                <div className="w-9 h-9 border border-[#B1D4E0] rounded bg-gray-100"></div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-black font-semibold text-xs" style={{ fontFamily: 'Lato' }}>
                    Fayomi's Cup
                  </span>
                  <span className="text-[#555555] font-normal text-[8px]" style={{ fontFamily: 'Lato' }}>
                    Local Championship
                  </span>
                </div>
              </div>
              
              <span className="text-black font-normal text-xs" style={{ fontFamily: 'Lato' }}>
                View All
              </span>
            </div>
          </div>
          
          {/* Match Results */}
          <div className="opacity-88">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between px-5 py-2 border-b border-[#E0E0E0] bg-white">
                {/* Left side - Status */}
                <div className="flex items-center gap-3">
                  <div className="w-[18px] h-[18px] flex items-center justify-center">
                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.42969 1.05078C6.6093 0.497994 7.3907 0.497996 7.57031 1.05078L8.41602 3.65137C8.60343 4.22817 9.14059 4.6191 9.74707 4.61914H12.4814C13.0625 4.61914 13.3047 5.36234 12.835 5.7041L10.6221 7.31152C10.1314 7.66802 9.92587 8.30013 10.1133 8.87695L10.959 11.4775C11.1386 12.0303 10.5054 12.4901 10.0352 12.1484L7.82324 10.541C7.33256 10.1845 6.66744 10.1845 6.17676 10.541L3.96484 12.1484C3.49462 12.4901 2.8614 12.0303 3.04102 11.4775L3.88672 8.87695C4.07413 8.30013 3.86861 7.66802 3.37793 7.31152L1.16504 5.7041C0.69532 5.36234 0.937478 4.61914 1.51855 4.61914H4.25293C4.85941 4.6191 5.39657 4.22817 5.58398 3.65137L6.42969 1.05078Z" stroke="#555555" strokeWidth="0.8"/>
                    </svg>
                  </div>
                  <span className="text-[#555555] font-normal text-sm" style={{ fontFamily: 'Lato' }}>
                    NS
                  </span>
                </div>
                
                {/* Teams and Score */}
                <div className="flex items-center gap-12">
                  {/* Team 1 */}
                  <div className="flex items-center gap-1">
                    <div className="w-[18px] h-[18px] rounded-full bg-[#B1D4E0] p-0.5">
                      <div className="w-[14px] h-[14px] bg-gray-200 rounded-full"></div>
                    </div>
                    <span className="text-[#222222] font-normal text-sm" style={{ fontFamily: 'Lato' }}>
                      Michaels Academy
                    </span>
                  </div>
                  
                  {/* Score */}
                  <div className="bg-[#B1D4E0] rounded px-2 py-0.5">
                    <span className="text-[#222222] font-semibold text-xs" style={{ fontFamily: 'Lato' }}>
                      2 : 4
                    </span>
                  </div>
                  
                  {/* Team 2 */}
                  <div className="flex items-center gap-1">
                    <span className="text-[#222222] font-normal text-sm" style={{ fontFamily: 'Lato' }}>
                      St Johns Academy
                    </span>
                    <div className="w-[18px] h-[18px] rounded-full bg-[#B1D4E0] p-0.5">
                      <div className="w-[14px] h-[14px] bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Right Column */}
      <div className="mt-[-30px]">
        {/* Latest Article Section */}
        <div className="w-[512px] h-[472px] bg-white rounded-xl">
          <div className="p-5 flex flex-col gap-6">
            {/* Header */}
            <h3 className="text-[#222222] font-bold text-base pl-5" style={{ fontFamily: 'Lato' }}>
              Latest Article
            </h3>
            
            {/* Articles List */}
            <div className="pl-5 flex flex-col gap-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex gap-4">
                  {/* Article Image */}
                  <div className="w-[79px] h-[60px] bg-gray-200 rounded"></div>
                  
                  {/* Article Content */}
                  <div className="flex-1 flex flex-col gap-1">
                    <p className="text-[#222222] font-medium text-xs leading-[15px]" style={{ fontFamily: 'Lato' }}>
                      Lorem ipsum dolor sit amet consectetur. Lectus nec egestas eget tincidunt. Id sapien enim dictum ut ullamcorper interdum quam orci. Fusce eget nec od
                    </p>
                    <span className="text-[#555555] font-medium text-[8px] leading-[15px]" style={{ fontFamily: 'Lato' }}>
                      August 23, 2024 10:14AM
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Players Reviews Section */}
<div className="w-[512px] h-[413px] bg-white rounded-xl shadow-lg mt-6" style={{boxShadow: '0px 4px 12px 0px #0000001A'}}>
  <div className="pt-[21px] pb-[21px] px-0 flex flex-col gap-6">
    {/* Header */}
    <div className="pl-5">
      <h3 className="text-[#222222] font-bold text-base leading-none" style={{ fontFamily: 'Lato' }}>
        Players Reviews
      </h3>
    </div>

    {/* Players List */}
    <div className="flex flex-col gap-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div 
          key={index}
          className="flex items-center px-5 py-2 border-b border-[#E0E0E0]"
          style={{borderBottomWidth: '0.32px', height: '80px', paddingTop: '8px', paddingBottom: '12px'}}
        >
          {/* Avatar */}
          <div className="mr-6">
            <img
              src="/api/placeholder/60/60"
              alt="Player"
              className="rounded border-[#55555585]"
              style={{width: '60px', height: '60px', borderWidth: '0.24px', borderRadius: '4px'}}
            />
          </div>

          {/* Player Info */}
          <div className="w-[92px] flex flex-col gap-1.5">
            <div className="text-[#041931] font-medium leading-none" style={{ fontFamily: 'Lato', fontSize: '8px' }}>
              Valuegate Academy
            </div>
            <div className="text-[#222222] font-medium leading-none" style={{ fontFamily: 'Lato', fontSize: '14px', lineHeight: '15px' }}>
              Paul Attah
            </div>
            <div className="text-[#555555] font-medium leading-none" style={{ fontFamily: 'Lato', fontSize: '10px' }}>
              00 G/A Promising
            </div>
          </div>

          {/* Metrics */}
          <div className="flex gap-2 ml-6" style={{opacity: 0.88, width: '176px'}}>
            {['Fitness', 'Technical', 'Tactical', 'Mental'].map((category, metricIndex) => (
              <div key={metricIndex} className="flex flex-col gap-1" style={{width: '37px'}}>
                <div className="text-[#222222] font-medium leading-none" style={{ fontFamily: 'Lato', fontSize: '8px' }}>
                  {category}
                </div>
                <div className="text-[#222222] font-medium" style={{ fontFamily: 'Lato', fontSize: '14px', lineHeight: '15px' }}>
                  00%
                </div>
                <div className="text-[#555555] font-medium leading-none" style={{ fontFamily: 'Lato', fontSize: '8px' }}>
                  Improved
                </div>
              </div>
            ))}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 ml-2">
            {/* Circular Progress */}
            <div className="relative" style={{width: '45.97px', height: '46.52px'}}>
              <svg width="46" height="48" viewBox="0 0 46 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M39.6553 23.6556C39.6553 33.1579 32.0441 40.8611 22.6553 40.8611C13.2664 40.8611 5.65527 33.1579 5.65527 23.6556C5.65527 14.1533 13.2664 6.4502 22.6553 6.4502C32.0441 6.4502 39.6553 14.1533 39.6553 23.6556ZM8.88153 23.6556C8.88153 31.3546 15.0482 37.5958 22.6553 37.5958C30.2623 37.5958 36.429 31.3546 36.429 23.6556C36.429 15.9567 30.2623 9.71544 22.6553 9.71544C15.0482 9.71544 8.88153 15.9567 8.88153 23.6556Z" fill="#D9D9D9"/>
                <path d="M37.8878 15.8221C39.8179 19.4254 40.4097 23.6088 39.5563 27.6154C38.7029 31.622 36.4605 35.187 33.2351 37.6654C30.0096 40.1438 26.0141 41.3717 21.9717 41.127C17.9292 40.8823 14.1068 39.1812 11.1962 36.3314C8.28559 33.4816 6.47908 29.6715 6.10358 25.5905C5.72807 21.5095 6.80838 17.4273 9.149 14.0826C11.4896 10.7379 14.9359 8.35165 18.8642 7.3557C22.7926 6.35975 26.9434 6.81989 30.5655 8.65286L29.1267 11.5654C26.1919 10.0802 22.8288 9.70743 19.646 10.5144C16.4632 11.3213 13.671 13.2547 11.7746 15.9646C9.87815 18.6746 9.00286 21.9821 9.3071 25.2886C9.61134 28.5951 11.075 31.6821 13.4332 33.9911C15.7915 36.3 18.8884 37.6783 22.1637 37.8766C25.439 38.0748 28.6763 37.0799 31.2896 35.0719C33.9029 33.0639 35.7197 30.1754 36.4112 26.9292C37.1026 23.6829 36.6231 20.2934 35.0593 17.374L37.8878 15.8221Z" fill="#0A2A56"/>
                <path d="M20.8496 23.4991C20.8496 24.1258 20.7813 24.6691 20.6446 25.1291C20.5113 25.5858 20.3279 25.9641 20.0946 26.2641C19.8613 26.5641 19.5846 26.7874 19.2646 26.9341C18.9479 27.0808 18.6079 27.1541 18.2446 27.1541C17.8779 27.1541 17.5363 27.0808 17.2196 26.9341C16.9063 26.7874 16.6329 26.5641 16.3996 26.2641C16.1663 25.9641 15.9829 25.5858 15.8496 25.1291C15.7163 24.6691 15.6496 24.1258 15.6496 23.4991C15.6496 22.8724 15.7163 22.3291 15.8496 21.8691C15.9829 21.4091 16.1663 21.0291 16.3996 20.7291C16.6329 20.4258 16.9063 20.2008 17.2196 20.0541C17.5363 19.9074 17.8779 19.8341 18.2446 19.8341C18.6079 19.8341 18.9479 19.9074 19.2646 20.0541C19.5846 20.2008 19.8613 20.4258 20.0946 20.7291C20.3279 21.0291 20.5113 21.4091 20.6446 21.8691C20.7813 22.3291 20.8496 22.8724 20.8496 23.4991ZM19.9246 23.4991C19.9246 22.9524 19.8779 22.4941 19.7846 22.1241C19.6946 21.7508 19.5713 21.4508 19.4146 21.2241C19.2613 20.9974 19.0829 20.8358 18.8796 20.7391C18.6763 20.6391 18.4646 20.5891 18.2446 20.5891C18.0246 20.5891 17.8129 20.6391 17.6096 20.7391C17.4063 20.8358 17.2279 20.9974 17.0746 21.2241C16.9213 21.4508 16.7979 21.7508 16.7046 22.1241C16.6146 22.4941 16.5696 22.9524 16.5696 23.4991C16.5696 24.0458 16.6146 24.5041 16.7046 24.8741C16.7979 25.2441 16.9213 25.5424 17.0746 25.7691C17.2279 25.9958 17.4063 26.1591 17.6096 26.2591C17.8129 26.3558 18.0246 26.4041 18.2446 26.4041C18.4646 26.4041 18.6763 26.3558 18.8796 26.2591C19.0829 26.1591 19.2613 25.9958 19.4146 25.7691C19.5713 25.5424 19.6946 25.2441 19.7846 24.8741C19.8779 24.5041 19.9246 24.0458 19.9246 23.4991ZM21.7054 26.5291C21.7054 26.4424 21.7204 26.3608 21.7504 26.2841C21.7837 26.2074 21.8271 26.1408 21.8804 26.0841C21.9371 26.0274 22.0037 25.9824 22.0804 25.9491C22.1571 25.9158 22.2387 25.8991 22.3254 25.8991C22.4121 25.8991 22.4937 25.9158 22.5704 25.9491C22.6471 25.9824 22.7137 26.0274 22.7704 26.0841C22.8271 26.1408 22.8721 26.2074 22.9054 26.2841C22.9387 26.3608 22.9554 26.4424 22.9554 26.5291C22.9554 26.6191 22.9387 26.7024 22.9054 26.7791C22.8721 26.8524 22.8271 26.9174 22.7704 26.9741C22.7137 27.0308 22.6471 27.0741 22.5704 27.1041C22.4937 27.1374 22.4121 27.1541 22.3254 27.1541C22.2387 27.1541 22.1571 27.1374 22.0804 27.1041C22.0037 27.0741 21.9371 27.0308 21.8804 26.9741C21.8271 26.9174 21.7837 26.8524 21.7504 26.7791C21.7204 26.7024 21.7054 26.6191 21.7054 26.5291ZM29.0137 23.4991C29.0137 24.1258 28.9453 24.6691 28.8087 25.1291C28.6753 25.5858 28.492 25.9641 28.2587 26.2641C28.0253 26.5641 27.7487 26.7874 27.4287 26.9341C27.112 27.0808 26.772 27.1541 26.4087 27.1541C26.042 27.1541 25.7003 27.0808 25.3837 26.9341C25.0703 26.7874 24.797 26.5641 24.5637 26.2641C24.3303 25.9641 24.147 25.5858 24.0137 25.1291C23.8803 24.6691 23.8137 24.1258 23.8137 23.4991C23.8137 22.8724 23.8803 22.3291 24.0137 21.8691C24.147 21.4091 24.3303 21.0291 24.5637 20.7291C24.797 20.4258 25.0703 20.2008 25.3837 20.0541C25.7003 19.9074 26.042 19.8341 26.4087 19.8341C26.772 19.8341 27.112 19.9074 27.4287 20.0541C27.7487 20.2008 28.0253 20.4258 28.2587 20.7291C28.492 21.0291 28.6753 21.4091 28.8087 21.8691C28.9453 22.3291 29.0137 22.8724 29.0137 23.4991ZM28.0887 23.4991C28.0887 22.9524 28.042 22.4941 27.9487 22.1241C27.8587 21.7508 27.7353 21.4508 27.5787 21.2241C27.4253 20.9974 27.247 20.8358 27.0437 20.7391C26.8403 20.6391 26.6287 20.5891 26.4087 20.5891C26.1887 20.5891 25.977 20.6391 25.7737 20.7391C25.5703 20.8358 25.392 20.9974 25.2387 21.2241C25.0853 21.4508 24.962 21.7508 24.8687 22.1241C24.7787 22.4941 24.7337 22.9524 24.7337 23.4991C24.7337 24.0458 24.7787 24.5041 24.8687 24.8741C24.962 25.2441 25.0853 25.5424 25.2387 25.7691C25.392 25.9958 25.5703 26.1591 25.7737 26.2591C25.977 26.3558 26.1887 26.4041 26.4087 26.4041C26.6287 26.4041 26.8403 26.3558 27.0437 26.2591C27.247 26.1591 27.4253 25.9958 27.5787 25.7691C27.7353 25.5424 27.8587 25.2441 27.9487 24.8741C28.042 24.5041 28.0887 24.0458 28.0887 23.4991Z" fill="#222222"/>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center" style={{top: '16.34px', left: '15.35px', width: '14.54px', height: '13px'}}>
                <span className="text-[#222222] font-normal" style={{ fontFamily: 'Lato', fontSize: '10px', lineHeight: '12.26px' }}>
                  0.0
                </span>
              </div>
            </div>
            
            {/* Trophy Icon */}
            <div className="w-8 h-8 bg-[#FFA500] rounded-full flex items-center justify-center p-2">
              <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_141_1025)">
                  <path d="M13.4678 0H6.46777C5.63965 0 4.96465 0.68125 4.9959 1.50625C5.00215 1.67188 5.0084 1.8375 5.01777 2H1.71777C1.30215 2 0.967773 2.33437 0.967773 2.75C0.967773 5.64375 2.01465 7.65625 3.4209 9.02188C4.80527 10.3688 6.49277 11.0469 7.73652 11.3906C8.46777 11.5938 8.96777 12.2031 8.96777 12.8156C8.96777 13.4688 8.43652 14 7.7834 14H6.96777C6.41465 14 5.96777 14.4469 5.96777 15C5.96777 15.5531 6.41465 16 6.96777 16H12.9678C13.5209 16 13.9678 15.5531 13.9678 15C13.9678 14.4469 13.5209 14 12.9678 14H12.1521C11.499 14 10.9678 13.4688 10.9678 12.8156C10.9678 12.2031 11.4646 11.5906 12.199 11.3906C13.4459 11.0469 15.1334 10.3688 16.5178 9.02188C17.9209 7.65625 18.9678 5.64375 18.9678 2.75C18.9678 2.33437 18.6334 2 18.2178 2H14.9178C14.9271 1.8375 14.9334 1.675 14.9396 1.50625C14.9709 0.68125 14.2959 0 13.4678 0ZM2.4959 3.5H5.1334C5.41777 6.31563 6.0459 8.19688 6.75527 9.45625C5.97715 9.1125 5.16777 8.62813 4.46777 7.94688C3.46777 6.975 2.65527 5.57188 2.49902 3.5H2.4959ZM15.4709 7.94688C14.7709 8.62813 13.9615 9.1125 13.1834 9.45625C13.8928 8.19688 14.5209 6.31563 14.8053 3.5H17.4428C17.2834 5.57188 16.4709 6.975 15.474 7.94688H15.4709Z" fill="black"/>
                </g>
                <defs>
                  <clipPath id="clip0_141_1025">
                    <rect width="18" height="16" fill="white" transform="translate(0.967773)"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
      </div>
    </div>

    
  );
}