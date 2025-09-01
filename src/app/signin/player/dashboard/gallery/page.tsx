export default function GalleryPage() {
  return (
    <div className="flex flex-col ml-[-18] px-4 py-8">
{/* Search Bar Container */}
<div className="w-full max-w-[724px] h-16 rounded-xl bg-white shadow-md px-4 mt-[-35px] flex items-center">
  <div className="w-full max-w-[692px] flex items-center justify-between">
    
    {/* Search Box */}
    <div className="w-full max-w-[578px] h-[30px] rounded-md bg-[#EFEFEF] px-3 flex items-center justify-between">
      {/* Left: Search Icon + Text */}
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 text-[#555555]"
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

      {/* Right: Edit + Delete */}
      <div className="flex items-center space-x-5">
        {/* Edit Icon */}
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-600"
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

        {/* Delete Icon */}
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-600"
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

        {/* Filter Button */}
      <button className="border border-gray-400 rounded-md px-7 py-1 text-gray-700 hover:bg-gray-100">
        Filter
      </button>
  </div>
</div> 
      {/* Main Layout: Left gallery + Right panel */}
      <div className="flex gap-6 mt-8">
        {/* LEFT SIDE - Gallery */}
        <div className="bg-white shadow-md rounded-xl p-4 mt-[-12] space-y-6 w-[724px]">
          {/* Section 1 */}
          <div className="space-y-4">
            <div className="text-[#222222] font-medium text-sm">
              THURSDAY, AUGUST 29, 2024
            </div>
            <div className="space-y-4">
              {/* Row 1 */}
              <div className="flex gap-4">
                <div className="w-[220px] h-[96px] bg-gray-200 rounded-md"></div>
                <div className="w-[220px] h-[96px] bg-gray-200 rounded-md"></div>
                <div className="w-[220px] h-[96px] bg-gray-200 rounded-md"></div>
              </div>
              {/* Row 2 */}
              <div className="flex gap-4">
                <div className="w-[220px] h-[96px] bg-gray-200 rounded-md"></div>
                <div className="w-[220px] h-[96px] bg-gray-200 rounded-md"></div>
                <div className="w-[220px] h-[96px] bg-gray-200 rounded-md"></div>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-4">
            <div className="text-[#222222] font-medium text-sm">
              WEDNESDAY, AUGUST 28, 2024
            </div>
            <div className="space-y-4">
              {/* Row 1 */}
              <div className="flex gap-4">
                <div className="w-[220px] h-[96px] bg-gray-200 rounded-md"></div>
                <div className="w-[220px] h-[96px] bg-gray-200 rounded-md"></div>
                <div className="w-[220px] h-[96px] bg-gray-200 rounded-md"></div>
              </div>
              {/* Row 2 */}
              <div className="flex gap-4">
                <div className="w-[220px] h-[96px] bg-gray-200 rounded-md"></div>
                <div className="w-[220px] h-[96px] bg-gray-200 rounded-md"></div>
                <div className="w-[220px] h-[96px] bg-gray-200 rounded-md"></div>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-4">
            <div className="text-[#222222] font-medium text-sm">
              MONDAY, AUGUST 26, 2024
            </div>
            <div className="space-y-4">
              {/* Row 1 */}
              <div className="flex gap-4">
                <div className="w-[220px] h-[96px] bg-gray-200 rounded-md"></div>
                <div className="w-[220px] h-[96px] bg-gray-200 rounded-md"></div>
                <div className="w-[220px] h-[96px] bg-gray-200 rounded-md"></div>
              </div>
              {/* Row 2 */}
              <div className="flex gap-4">
                <div className="w-[220px] h-[96px] bg-gray-200 rounded-md"></div>
                <div className="w-[220px] h-[96px] bg-gray-200 rounded-md"></div>
                <div className="w-[220px] h-[96px] bg-gray-200 rounded-md"></div>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-4">
            <div className="text-[#222222] font-medium text-sm">
              TUESDAY, AUGUST 27, 2024
            </div>
            <div className="flex gap-4">
              <div className="w-[220px] h-[96px] bg-gray-200 rounded-md"></div>
              <div className="w-[220px] h-[96px] bg-gray-200 rounded-md"></div>
              <div className="w-[220px] h-[96px] bg-gray-200 rounded-md"></div>
            </div>
          </div>
        </div>

    <div>
{/* RIGHT SIDE - News Panel (stacked) */}
<div className="flex flex-col gap-6 mt-[-95px]">
  {/* Top Container */}
  <div className="w-[350px] h-[780px] bg-white rounded-xl shadow-md p-4 relative">

    {/* Top Frame */}
    <div 
      className="flex justify-between items-center absolute" 
      style={{
        width: '315px',
        top: '20px',
        left: '16px'
      }}
    >
      {/* Left: News Feed */}
      <span style={{
        fontFamily: 'Lato',
        fontWeight: 700,
        fontSize: '18px',
        color: '#222222'
      }}>
        News Feed
      </span>

      {/* Right: View All */}
      <span style={{
        fontFamily: 'Lato',
        fontWeight: 400,
        fontSize: '12px',
        color: '#222222'
      }}>
        View All
      </span>
    </div>

    {/* Image Section */}
    <div 
      className="absolute"
      style={{
        top: '60px',
        left: '16px',
        width: '315px',
        height: '140px',
        borderRadius: '8px',
        overflow: 'hidden'
      }}
    >
      {/* Background Image */}
      <img 
        src="/images/grass.jpg"
        alt="News"
        className="w-full h-full object-cover rounded-lg"
      />

      {/* Overlay */}
      <div 
        className="absolute top-0 left-0"
        style={{
          width: '315px',
          height: '140px',
          backgroundColor: '#041931B8',
          borderRadius: '8px',
          opacity: 1
        }}
      >
        {/* Top Bars */}
        <div className="flex items-center" style={{ marginTop: '20px', marginLeft: '16px', gap: '4px' }}>
          <div style={{ width: '16px', height: '2px', backgroundColor: '#FFFFFF', borderRadius: '3px' }}></div>
          <div style={{ width: '32px', height: '2px', backgroundColor: '#A1A1A1', borderRadius: '3px' }}></div>
        </div>

        {/* Text + Image Row */}
        <div 
          style={{
            marginTop: '14px',
            marginLeft: '16px',
            width: '283px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}
        >
          {/* Left: Text Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '183px' }}>
            {/* Top Row: Local News + Time */}
            <div className="flex items-center gap-2" style={{ width: '96px', height: '12px' }}>
              <div style={{ fontFamily: 'Lato', fontWeight: 700, fontSize: '10px', color: '#FFFFFF' }}>Local News</div>
              <div className="flex items-center gap-1">
                <div style={{ width: '2px', height: '2px', backgroundColor: '#FFFFFF', borderRadius: '50%' }}></div>
                <div style={{ fontFamily: 'Lato', fontWeight: 400, fontSize: '6px', color: '#FFFFFF' }}>2 hours ago</div>
              </div>
            </div>

            {/* Headline */}
            <div style={{
              fontFamily: 'Lato',
              fontWeight: 400,
              fontSize: '10px',
              lineHeight: '15px',
              color: '#FFFFFF',
              opacity: 0.92
            }}>
              Valuegate Football Academy Unveils New 300-Seater Local Stadium, Located in Abuja, Nigeria
            </div>
          </div>

          {/* Right: Image */}
          <img 
            src="/images/round.png"
            alt="Thumbnail"
            style={{
              width: '84px',
              height: '65px',
              borderRadius: '4px',
              objectFit: 'cover'
            }}
          />
        </div>
      </div>
    </div>

    {/* ✅ Bottom News List Section */}
    <div 
      style={{
        position: 'absolute',
        top: '220px', // adjust this so it appears right after the image
        left: '16px',
        width: '284px',
        height: '493px',
        opacity: 0.92,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}
    >
      {/* Single News Item */}
<div style={{ width: '284px', height: '89px', display: 'flex', justifyContent: 'space-between', padding: '8px 6px', gap: '24px' }}>
  {/* Left Thumbnail */}
  <img 
    src="/images/round.png" 
    alt="Thumb" 
    style={{ width: '65px', height: '65px', borderRadius: '4px', objectFit: 'cover' }} 
  />

  {/* Right Text Block */}
  <div style={{ width: '183px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
    {/* Category + Time */}
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontFamily: 'Lato', fontSize: '10px', fontWeight: 600 }}>
      <span>Sport News</span>
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        <div style={{ width: '2px', height: '2px', background: '#000', borderRadius: '50%' }}></div>
        <span style={{ fontSize: '6px', fontWeight: 400 }}>2 hours ago</span>
      </div>
    </div>

    {/* Headline */}
    <div style={{ fontFamily: 'Lato', fontWeight: 400, fontSize: '10px', lineHeight: '15px', color: '#222', opacity: 0.88 }}>
      Valuegate Football Academy Unveils New 300-Seater Local Stadium, Located in Abuja, Nigeria
    </div>
  </div>
</div>

<hr style={{ border: '0.4px solid #E0E0E0', width: '284px' }} />

     {/* Single News Item */}
<div style={{ width: '284px', height: '89px', display: 'flex', justifyContent: 'space-between', padding: '8px 6px', gap: '24px' }}>
  {/* Left Thumbnail */}
  <img 
    src="/images/round.png" 
    alt="Thumb" 
    style={{ width: '65px', height: '65px', borderRadius: '4px', objectFit: 'cover' }} 
  />

  {/* Right Text Block */}
  <div style={{ width: '183px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
    {/* Category + Time */}
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontFamily: 'Lato', fontSize: '10px', fontWeight: 600 }}>
      <span>Sport News</span>
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        <div style={{ width: '2px', height: '2px', background: '#000', borderRadius: '50%' }}></div>
        <span style={{ fontSize: '6px', fontWeight: 400 }}>2 hours ago</span>
      </div>
    </div>

    {/* Headline */}
    <div style={{ fontFamily: 'Lato', fontWeight: 400, fontSize: '10px', lineHeight: '15px', color: '#222', opacity: 0.88 }}>
      Valuegate Football Academy Unveils New 300-Seater Local Stadium, Located in Abuja, Nigeria
    </div>
  </div>
</div>

<hr style={{ border: '0.4px solid #E0E0E0', width: '284px' }} />

      {/* Single News Item */}
<div style={{ width: '284px', height: '89px', display: 'flex', justifyContent: 'space-between', padding: '8px 6px', gap: '24px' }}>
  {/* Left Thumbnail */}
  <img 
    src="/images/round.png" 
    alt="Thumb" 
    style={{ width: '65px', height: '65px', borderRadius: '4px', objectFit: 'cover' }} 
  />

  {/* Right Text Block */}
  <div style={{ width: '183px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
    {/* Category + Time */}
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontFamily: 'Lato', fontSize: '10px', fontWeight: 600 }}>
      <span>Sport News</span>
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        <div style={{ width: '2px', height: '2px', background: '#000', borderRadius: '50%' }}></div>
        <span style={{ fontSize: '6px', fontWeight: 400 }}>2 hours ago</span>
      </div>
    </div>

    {/* Headline */}
    <div style={{ fontFamily: 'Lato', fontWeight: 400, fontSize: '10px', lineHeight: '15px', color: '#222', opacity: 0.88 }}>
      Valuegate Football Academy Unveils New 300-Seater Local Stadium, Located in Abuja, Nigeria
    </div>
  </div>
</div>

<hr style={{ border: '0.4px solid #E0E0E0', width: '284px' }} />

      {/* Single News Item */}
<div style={{ width: '284px', height: '89px', display: 'flex', justifyContent: 'space-between', padding: '8px 6px', gap: '24px' }}>
  {/* Left Thumbnail */}
  <img 
    src="/images/round.png" 
    alt="Thumb" 
    style={{ width: '65px', height: '65px', borderRadius: '4px', objectFit: 'cover' }} 
  />

  {/* Right Text Block */}
  <div style={{ width: '183px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
    {/* Category + Time */}
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontFamily: 'Lato', fontSize: '10px', fontWeight: 600 }}>
      <span>Sport News</span>
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        <div style={{ width: '2px', height: '2px', background: '#000', borderRadius: '50%' }}></div>
        <span style={{ fontSize: '6px', fontWeight: 400 }}>2 hours ago</span>
      </div>
    </div>

    {/* Headline */}
    <div style={{ fontFamily: 'Lato', fontWeight: 400, fontSize: '10px', lineHeight: '15px', color: '#222', opacity: 0.88 }}>
      Valuegate Football Academy Unveils New 300-Seater Local Stadium, Located in Abuja, Nigeria
    </div>
  </div>
</div>

<hr style={{ border: '0.4px solid #E0E0E0', width: '284px' }} />

      {/* Single News Item */}
<div style={{ width: '284px', height: '89px', display: 'flex', justifyContent: 'space-between', padding: '8px 6px', gap: '24px' }}>
  {/* Left Thumbnail */}
  <img 
    src="/images/round.png" 
    alt="Thumb" 
    style={{ width: '65px', height: '65px', borderRadius: '4px', objectFit: 'cover' }} 
  />

  {/* Right Text Block */}
  <div style={{ width: '183px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
    {/* Category + Time */}
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontFamily: 'Lato', fontSize: '10px', fontWeight: 600 }}>
      <span>Sport News</span>
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        <div style={{ width: '2px', height: '2px', background: '#000', borderRadius: '50%' }}></div>
        <span style={{ fontSize: '6px', fontWeight: 400 }}>2 hours ago</span>
      </div>
    </div>

    {/* Headline */}
    <div style={{ fontFamily: 'Lato', fontWeight: 400, fontSize: '10px', lineHeight: '15px', color: '#222', opacity: 0.88 }}>
      Valuegate Football Academy Unveils New 300-Seater Local Stadium, Located in Abuja, Nigeria
    </div>
  </div>
</div>

</div>
</div>
</div>
        {/* Bottom Container */}
        <div className="w-[350px] h-[342px] bg-white rounded-xl shadow-md p-4 mt-6 flex">
          {/* Left Side Content */}
          <div className="flex-1 p-4 pr-2">
            {/* Featured Ads Header */}
            <div className="mb-12">
              <h3 
                className="text-gray-800"
                style={{
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 700,
                  fontSize: '16px',
                  lineHeight: '100%'
                }}
              >
                Featured Ads
              </h3>
            </div>

            {/* Subscription Content */}
            <div className="mb-6">
              {/* Title */}
              <h4 
                className="text-gray-800 mb-3 leading-tight"
                style={{
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: '1.2'
                }}
              >
                Subscribe to Scoutflair Premium Plan
              </h4>

              {/* Description */}
              <p 
                className="text-gray-600 text-xs leading-tight mb-4"
                style={{
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 400,
                  fontSize: '10px',
                  lineHeight: '1.3'
                }}
              >
                Lorem ipsum dolor sit amet consectetur. Nunc malesuada ultricies amet metus vive at.
              </p>
            </div>

{/* Subscribe Button */}
<button
  className="rounded px-12 py-2 text-white transition-colors hover:bg-blue-800"
  style={{
    fontFamily: 'Lato',
    fontWeight: 600,
    fontStyle: 'normal', // "SemiBold" isn't a valid CSS font-style, it's handled by font-weight
    fontSize: '14px',
    lineHeight: '24px',
    letterSpacing: '0',
    backgroundColor: '#0A2A56'
  }}
>
  Subscribe
</button>
          </div>
        

          {/* Right Side Image */}
<div className="w-[300px] h-[239px] relative mt-[0px] ml-[-105px]">
  <img 
    src="/images/image.png" 
    alt="Player" 
    className="w-full h-full object-cover rounded-lg"
    style={{
      opacity: 1
    }}
  />
</div>
</div>
</div>
</div>
</div>

  );
}