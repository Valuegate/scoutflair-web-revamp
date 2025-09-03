export default function ProfilePage() {
  return (
  <div className="w-full flex justify-center px-4 flex-col items-center" style={{ maxWidth: '1200px', margin: '0 auto' }}>
  {/* Main Profile Card */}
  <div
    className="relative"
    style={{
      width: '100%', // Changed from maxWidth: 1200 to width: 100%
      height: 350,
      borderRadius: 12,
      boxShadow: '0px 4px 12px 0px #0000001A',
      background: '#FFFFFF',
    }}
  >
    {/* Cover */}
    <div className="relative" style={{ width: '100%', height: 250 }}>
      <img
        src="/images/grass.jpg"
        alt="Profile Cover"
        className="w-full"
        style={{ height: 200, borderRadius: 12, objectFit: 'cover' }}
      />

      {/* Avatar */}
      <div
        className="absolute"
        style={{
          top: 146,
          left: 17,
          width: 104,
          height: 104,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src="/images/round.png"
          alt="Player"
          style={{
            width: 104,
            height: 104,
            objectFit: 'cover',
            border: '3px solid #0A2A56',
            borderRadius: '9999px',
          }}
        />
      </div>
    </div>

    {/* Bottom section: text + button */}
    <div
      className="absolute flex items-center justify-between"
      style={{ left: 16, right: 16, top: 250, height: 70 }}
    >
      {/* Left text stack */}
      <div className="flex flex-col" style={{ gap: 8, fontFamily: 'Lato, sans-serif' }}>
        <div style={{ fontWeight: 700, fontSize: 20, lineHeight: '100%', color: '#000' }}>
          Peter Abbas
        </div>
        <div className="flex flex-col" style={{ gap: 4 }}>
          <span style={{ fontWeight: 500, fontSize: 14, lineHeight: '100%', color: '#555555' }}>
            Midfielder, No. 8
          </span>
          <span style={{ fontWeight: 500, fontSize: 14, lineHeight: '100%', color: '#555555' }}>
            22 yrs
          </span>
        </div>
      </div>

      {/* CTA */}
      <button
        className="hover:opacity-90"
        style={{
          width: 140,
          height: 36,
          borderRadius: 12,
          background: '#0A2A56',
          color: '#FFFFFF',
          fontFamily: 'Lato, sans-serif',
          fontWeight: 600,
          fontSize: 14,
          lineHeight: '24px',
          padding: '6px 4px',
        }}
      >
        Contact Player
      </button>
    </div>
  </div>

    {/* Player Details Container */}
      <div className="w-full flex justify-start px-0 gap-6">
        <div
          className="mt-6"
          style={{
            width: 460,
            height: 871,
            borderRadius: 12,
            boxShadow: '0px 4px 12px 0px #0000001A',
            background: '#FFFFFF',
          }}
        >
          {/* Title */}
          <div
            className="flex items-center"
            style={{ height: 19, paddingLeft: 16, marginTop: 16 }}
          >
            <span
              style={{
                fontFamily: 'Lato, sans-serif',
                fontWeight: 700,
                fontSize: 16,
                color: '#000000',
              }}
            >
              Player Details
            </span>
          </div>

          {/* Biography Section */}
          <div
            className="mt-4"
            style={{
              width: '100%',
              height: 117,
              padding: '16px',
            }}
          >
            <div style={{ fontFamily: 'Lato, sans-serif', fontWeight: 500, fontSize: 14, color: '#222222' }}>
              Biography
            </div>
            <div
              className="mt-2"
              style={{
                fontFamily: 'Lato, sans-serif',
                fontWeight: 400,
                fontSize: 12,
                lineHeight: '18px',
                color: '#000000',
                opacity: 0.8,
              }}
            >
              Lorem ipsum dolor sit amet consectetur. Nunc malesuada ultricies amet metus viverra
              posuere a elit id. Ut vitae in diam risus urna. Mattis tempor convallis in eget
              suspendisse est eu. Odio fermentum at laoreet feugiat. Odio fermentum at.
            </div>
            {/* Line */}
            <div
              style={{
                borderTop: '1px solid #E0E0E0',
                marginTop: '16px'
              }}
            ></div>

            {/* About Section */}
            <div className="mt-4 w-[348px]">
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
                {/* Row 1 - Name */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#D2F0FA] rounded-md">
                    {/* Icon: User */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="black">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A10.97 10.97 0 0112 15c2.5 0 4.847.8 6.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-[12px] font-medium text-black leading-[18px]">Peter Adedamola Abbas</span>
                </div>

                {/* Row 2 - Date of Birth */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#D2F0FA] rounded-md">
                    {/* Icon: Calendar */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="black">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-[12px] font-medium text-black leading-[18px]">August 21, 2002</span>
                </div>

                {/* Row 3 - Nationality */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#D2F0FA] rounded-md">
                    {/* Icon: Flag */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="black">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5v14m0-14a5 5 0 015-5h8v6h-8a5 5 0 01-5-5z" />
                    </svg>
                  </div>
                  <span className="text-[12px] font-medium text-black leading-[18px]">Nigerian</span>
                </div>

                {/* Row 4 - Preferred Foot */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#D2F0FA] rounded-md">
                    {/* Icon: Shoe (placeholder: annotation icon) */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="black">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <span className="text-[12px] font-medium text-black leading-[18px]">Left</span>
                </div>

                {/* Row 5 - Height */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#D2F0FA] rounded-md">
                    {/* Icon: Ruler */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="black">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21V3h10v18H7z" />
                    </svg>
                  </div>
                  <span className="text-[12px] font-medium text-black leading-[18px]">167cm</span>
                </div>

                {/* Row 6 - Weight */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#D2F0FA] rounded-md">
                    {/* Icon: Scale */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="black">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v8m8-8v8m-4-4h-8" />
                    </svg>
                  </div>
                  <span className="text-[12px] font-medium text-black leading-[18px]">200lbs</span>
                </div>

                {/* Row 7 - Status */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#D2F0FA] rounded-md">
                    {/* Icon: Badge */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="black">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12l5-5 5 5-5 5-5-5z" />
                    </svg>
                  </div>
                  <span className="text-[12px] font-medium text-black leading-[18px]">Independent</span>
                </div>
                <div
                  style={{
                    borderTop: '1px solid #E0E0E0',
                    marginTop: '8px'
                  }}
                ></div>

                {/* Recommendations Section */}
                <div
                  className="mt-6 flex flex-col"
                  style={{
                    width: '348px',
                    height: '337px',
                    gap: '16px',
                  }}
                >
                  {/* Heading */}
                  <div
                    style={{
                      fontFamily: 'Lato, sans-serif',
                      fontWeight: 500,
                      fontSize: 14,
                      color: '#000000',
                      marginTop: '-30px'
                    }}
                  >
                    Recommendations
                  </div>

                  {/* Rows Container */}
                  <div
                    className="flex flex-col"
                    style={{
                      width: '348px',
                      height: '304px',
                      gap: '16px',
                    }}
                  >
                    {/* Row 1 */}
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 flex items-center justify-center bg-[#D2F0FA]"
                        style={{
                          clipPath:
                            'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                        }}
                      >
                        {/* Icon: Person */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="black">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4zm0-4a4 4 0 100-8 4 4 0 000 8z" />
                        </svg>
                      </div>
                      <span
                        className="text-[12px] font-medium text-black leading-[18px]"
                        style={{ width: '126px', height: '18px', display: 'inline-block' }}
                      >
                        Joshua Fayomi
                      </span>
                    </div>

                    {/* Row 2 */}
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 flex items-center justify-center bg-[#D2F0FA]"
                        style={{
                          clipPath:
                            'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                        }}
                      >
                        {/* Icon: Email */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="black">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H8m8 0l-4-4m4 4l-4 4M3 8v8a5 5 0 005 5h8a5 5 0 005-5V8a5 5 0 00-5-5H8a5 5 0 00-5 5z" />
                        </svg>
                      </div>
                      <span
                        className="text-[12px] font-medium text-black leading-[18px]"
                        style={{ width: '126px', height: '18px', display: 'inline-block' }}
                      >
                        joshuafayomi@gmail.com
                      </span>
                    </div>

                    {/* Row 3 */}
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 flex items-center justify-center bg-[#D2F0FA]"
                        style={{
                          clipPath:
                            'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                        }}
                      >
                        {/* Icon: Phone */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="black">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h2a2 2 0 012 2v1a2 2 0 01-.586 1.414l-1.293 1.293a16 16 0 006.586 6.586l1.293-1.293A2 2 0 0115 14h1a2 2 0 012 2v2a2 2 0 01-2 2h-1C7.82 20 4 16.18 4 11V9a2 2 0 012-2H5z" />
                        </svg>
                      </div>
                      <span
                        className="text-[12px] font-medium text-black leading-[18px]"
                        style={{ width: '126px', height: '18px', display: 'inline-block' }}
                      >
                        +2347067******
                      </span>
                    </div>

                    {/* Line */}
                    <div
                      style={{
                        borderTop: '1px solid #E0E0E0',
                        marginTop: '10px'
                      }}
                    ></div>

                    {/* Social Media Section */}
                    <div
                      className="mt-6 flex flex-col"
                      style={{
                        width: '348px',
                        height: '64.93px',
                        gap: '24px',
                      }}
                    >
                      {/* Heading */}
                      <div
                        style={{
                          fontFamily: 'Lato, sans-serif',
                          fontWeight: 500,
                          fontSize: '14px',
                          color: '#000000',
                          marginTop: '-30px',
                          marginBottom: '-6px'
                        }}
                      >
                        Social Media
                      </div>

                      {/* Buttons Container */}
                      <div
                        className="flex"
                        style={{
                          width: '299.05px',
                          height: '23.93px',
                          gap: '16px',
                        }}
                      >
                        {/* Instagram Button */}
                       <div
  className="flex items-center justify-center"
  style={{
    width: '80px',
    height: '25px',
    borderRadius: '11.57px',
    border: '0.35px solid #222222',
    padding: '6.37px 6.94px',
    gap: '5.79px',
    background: '#fff'
  }}
>
 {/* Instagram Icon */}
  <div style={{ width: '12px', height: '12px', flexShrink: 0 }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <linearGradient id="ig-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#f09433' }} />
          <stop offset="25%" style={{ stopColor: '#e6683c' }} />
          <stop offset="50%" style={{ stopColor: '#dc2743' }} />
          <stop offset="75%" style={{ stopColor: '#cc2366' }} />
          <stop offset="100%" style={{ stopColor: '#bc1888' }} />
        </linearGradient>
      </defs>
      <path
        fill="url(#ig-gradient)"
        d="M349.33 69.33H162.67A93.34 93.34 0 0 0 69.33 162.67v186.66a93.34 93.34 0 0 0 93.34 93.34h186.66a93.34 93.34 0 0 0 93.34-93.34V162.67a93.34 93.34 0 0 0-93.34-93.34ZM256 346.67a90.67 90.67 0 1 1 90.67-90.67 90.76 90.76 0 0 1-90.67 90.67Zm93.33-162.67a21.33 21.33 0 1 1 21.34-21.33 21.34 21.34 0 0 1-21.34 21.33Z"
      />
    </svg>
  </div>
  {/* Instagram Text */}
  <span
    style={{
      fontFamily: 'Lato, sans-serif',
      fontSize: '11px',
      fontWeight: 500,
      color: '#000'
    }}
  >
    Instagram
  </span>
</div>


                        {/* TikTok Button */}
                       <div
  className="flex items-center justify-center"
  style={{
    width: '80px',
    height: '25px',
    borderRadius: '11.57px',
    border: '0.35px solid #222222',
    padding: '6.37px 6.94px',
    gap: '5.79px',
    background: '#fff'
  }}
>
  {/* TikTok Icon */}
  <div style={{ width: '14px', height: '11px', flexShrink: 0 }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      style={{ width: '100%', height: '100%' }}
    >
      <path
        d="M12 0h4a6 6 0 0 0 6 6v4a9.99 9.99 0 0 1-6-2v10a6 6 0 1 1-6-6h2v4a2 2 0 1 0 2 2V0z"
        fill="#000"
      />
    </svg>
  </div>

  {/* TikTok Text */}
  <span
    style={{
      fontFamily: 'Lato, sans-serif',
      fontSize: '11px',
      fontWeight: 500,
      color: '#000'
    }}
  >
    TikTok
  </span>
</div>


<div
  className="flex items-center"
  style={{
    width: '80px',
    height: '25px',
    borderRadius: '12px',
    border: '1px solid #222',
    padding: '4px 6px',
    gap: '6px',
    background: '#fff'
  }}
>
  <div style={{ width: '14px', height: '11px', flexShrink: 0 }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      style={{ width: '100%', height: '100%' }}
    >
      <path
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
        fill="#1877F2"
      />
    </svg>
  </div>
  <span
    style={{
      fontFamily: 'Lato, sans-serif',
      fontSize: '10px',
      fontWeight: 300,
      color: '#000'
    }}
  >
    Facebook
  </span>
</div>

<div
  className="flex items-center"
  style={{
    width: '80px',
    height: '25px',
    borderRadius: '12px',
    border: '1px solid #222',
    padding: '4px 6px',
    gap: '6px',
    background: '#fff'
  }}
>
  <div style={{ width: '14px', height: '11px', flexShrink: 0 }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      style={{ width: '100%', height: '100%' }}
    >
      <path
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
        fill="#1877F2"
      />
    </svg>
  </div>
  <span
    style={{
      fontFamily: 'Lato, sans-serif',
      fontSize: '10px',
      fontWeight: 500,
      color: '#000'
    }}
  >
    Facebook
  </span>
</div>

 
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

{/* Activity Feed Container */}
<div
  style={{
    width: 594,
    gap: 24,
    display: 'flex',
    flexDirection: 'column',
  }}
>
  {/* First Post Card */}
  <div
    style={{
      width: 694,
      height: 412,
      borderRadius: 12,
      boxShadow: '0px 4px 12px 0px #0000001A',
      background: '#FFFFFF',
      padding: 16,
      marginTop: 25,
      marginLeft: -11,
    }}
  >
    {/* Post Content */}
    <div
      style={{
        width: 662,
        height: 372,
        gap: 16,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Author Info */}
      <div
        style={{
          width: 154,
          height: 36,
          gap: 16,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Profile Pic */}
        <img
          src="/images/round.png"
          alt="Peters Samuel"
          style={{
            width: 36,
            height: 36,
            borderRadius: 4,
            objectFit: 'cover',
          }}
        />
        
        {/* Name and Timestamp */}
        <div style={{ 
          width: 102,
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div
            style={{
              fontFamily: 'Lato, sans-serif',
              fontWeight: 700,
              fontSize: 14,
              lineHeight: '100%',
              color: '#000000',
              height: 19,
            }}
          >
            Peters Samuel
          </div>
          <div
            style={{
              fontFamily: 'Lato, sans-serif',
              fontWeight: 400,
              fontSize: 7,
              lineHeight: '100%',
              color: '#555555',
              height: 10,
              marginTop: 4,
              width: 91,
            }}
          >
            August 21, 2024 | 9:30PM
          </div>
        </div>
      </div>

      {/* Post Text */}
      <div
        style={{
          width: 662,
          height: 36,
          fontFamily: 'Lato, sans-serif',
          fontWeight: 400,
          fontSize: 12,
          lineHeight: '18px',
          color: '#000000',
        }}
      >
        Lorem ipsum dolor sit amet consectetur. Nunc malesuada ultricies amet metus viverra posuere a elit id. Ut vitae in diam risus urna. Mattis tempor convallis in eget suspendisse est eu. Odio fermentum at laoreet feugiat. Odio fermentum at.
      </div>

      {/* Post Image and Stats */}
      <div
        style={{
          width: 662,
          height: 268,
          gap: 16,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Post Image */}
        <img
          src="/images/grass.jpg"
          alt="Post Image"
          style={{
            width: 662,
            height: 180,
            borderRadius: 8,
            objectFit: 'cover',
          }}
        />

        {/* Engagement Stats */}
        <div
          style={{
            width: 662,
            height: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Overlapping Profile Pics */}
          <div
            style={{
              width: 36,
              height: 20,
              position: 'relative',
            }}
          >
            <img
              src="/images/round.png"
              alt="User 1"
              style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                position: 'absolute',
                left: 0,
                border: '1px solid white',
              }}
            />
            <img
              src="/images/round.png"
              alt="User 2"
              style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                position: 'absolute',
                left: 16,
                border: '1px solid white',
              }}
            />
          </div>

          {/* Comments and Shares */}
          <div
            style={{
              width: 128,
              height: 14,
              gap: 16,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'Lato, sans-serif',
                fontWeight: 400,
                fontSize: 12,
                lineHeight: '100%',
                color: '#555555',
                width: 67,
              }}
            >
              2 Comments
            </span>
            <span
              style={{
                fontFamily: 'Lato, sans-serif',
                fontWeight: 400,
                fontSize: 12,
                lineHeight: '100%',
                color: '#555555',
                width: 45,
              }}
            >
              5 Shares
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            width: 662,
            height: 36,
            borderTop: '1px solid #E0E0E0',
            paddingTop: 10,
          }}
        >
          <div
            style={{
              width: 662,
              height: 16,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* Like Button */}
            <div
              style={{
                width: 46,
                height: 16,
                gap: 8,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {/* Heart Icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: 13.33,
                  height: 12.23,
                }}
              >
                <path
                  d="M8 14.25l-1.45-1.32C3.4 9.36 1 7.28 1 4.5 1 2.42 2.42 1 4.5 1c1.74 0 3.41.81 4.5 2.09C10.09 1.81 11.76 1 13.5 1 15.58 1 17 2.42 17 4.5c0 2.78-2.4 4.86-5.55 8.43L8 14.25z"
                  stroke="black"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
              <span
                style={{
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 500,
                  fontSize: 12,
                  lineHeight: '100%',
                  color: '#000000',
                  height: 14,
                  width: 22,
                }}
              >
                Like
              </span>
            </div>

            {/* Comment Button */}
            <div
              style={{
                width: 82,
                height: 16,
                gap: 8,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {/* Comment Icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: 12.19,
                  height: 11.62,
                  strokeWidth: 0.76,
                }}
              >
                <path
                  d="M14 2H2C1.45 2 1 2.45 1 3v7c0 .55.45 1 1 1h9l3 3V3c0-.55-.45-1-1-1z"
                  stroke="black"
                  strokeWidth="0.76"
                  fill="none"
                />
              </svg>
              <span
                style={{
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 500,
                  fontSize: 12,
                  lineHeight: '100%',
                  color: '#000000',
                  height: 14,
                  width: 58,
                }}
              >
                Comment
              </span>
            </div>

            {/* Share Button */}
            <div
              style={{
                width: 54,
                height: 16,
                gap: 8,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {/* Share Icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: 14,
                  height: 11.5,
                }}
              >
                <path
                  d="M8 1.5L12 5.5H9v6H7v-6H4l4-4z"
                  stroke="black"
                  strokeWidth="1"
                  fill="black"
                />
              </svg>
              <span
                style={{
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 500,
                  fontSize: 12,
                  lineHeight: '100%',
                  color: '#000000',
                  height: 14,
                  width: 30,
                }}
              >
                Share
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Second Post Card (Duplicate of First) */}
  <div
    style={{
      width: 694,
      height: 412,
      borderRadius: 12,
      boxShadow: '0px 4px 12px 0px #0000001A',
      background: '#FFFFFF',
      padding: 16,
      marginLeft: -11,
    }}
  >
    {/* Post Content */}
    <div
      style={{
        width: 662,
        height: 372,
        gap: 16,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Author Info */}
      <div
        style={{
          width: 154,
          height: 36,
          gap: 16,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Profile Pic */}
        <img
          src="/images/round.png"
          alt="Peters Samuel"
          style={{
            width: 36,
            height: 36,
            borderRadius: 4,
            objectFit: 'cover',
          }}
        />
        
        {/* Name and Timestamp */}
        <div style={{ 
          width: 102,
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div
            style={{
              fontFamily: 'Lato, sans-serif',
              fontWeight: 700,
              fontSize: 14,
              lineHeight: '100%',
              color: '#000000',
              height: 19,
            }}
          >
            Peters Samuel
          </div>
          <div
            style={{
              fontFamily: 'Lato, sans-serif',
              fontWeight: 400,
              fontSize: 7,
              lineHeight: '100%',
              color: '#555555',
              height: 10,
              marginTop: 4,
              width: 91,
            }}
          >
            August 21, 2024 | 9:30PM
          </div>
        </div>
      </div>

      {/* Post Text */}
      <div
        style={{
          width: 662,
          height: 36,
          fontFamily: 'Lato, sans-serif',
          fontWeight: 400,
          fontSize: 12,
          lineHeight: '18px',
          color: '#000000',
        }}
      >
        Lorem ipsum dolor sit amet consectetur. Nunc malesuada ultricies amet metus viverra posuere a elit id. Ut vitae in diam risus urna. Mattis tempor convallis in eget suspendisse est eu. Odio fermentum at laoreet feugiat. Odio fermentum at.
      </div>

      {/* Post Image and Stats */}
      <div
        style={{
          width: 662,
          height: 268,
          gap: 16,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Post Image */}
        <img
          src="/images/grass.jpg"
          alt="Post Image"
          style={{
            width: 662,
            height: 180,
            borderRadius: 8,
            objectFit: 'cover',
          }}
        />

        {/* Engagement Stats */}
        <div
          style={{
            width: 662,
            height: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Overlapping Profile Pics */}
          <div
            style={{
              width: 36,
              height: 20,
              position: 'relative',
            }}
          >
            <img
              src="/images/round.png"
              alt="User 1"
              style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                position: 'absolute',
                left: 0,
                border: '1px solid white',
              }}
            />
            <img
              src="/images/round.png"
              alt="User 2"
              style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                position: 'absolute',
                left: 16,
                border: '1px solid white',
              }}
            />
          </div>

          {/* Comments and Shares */}
          <div
            style={{
              width: 128,
              height: 14,
              gap: 16,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'Lato, sans-serif',
                fontWeight: 400,
                fontSize: 12,
                lineHeight: '100%',
                color: '#555555',
                width: 67,
              }}
            >
              2 Comments
            </span>
            <span
              style={{
                fontFamily: 'Lato, sans-serif',
                fontWeight: 400,
                fontSize: 12,
                lineHeight: '100%',
                color: '#555555',
                width: 45,
              }}
            >
              5 Shares
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            width: 662,
            height: 36,
            borderTop: '1px solid #E0E0E0',
            paddingTop: 10,
          }}
        >
          <div
            style={{
              width: 662,
              height: 16,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* Like Button */}
            <div
              style={{
                width: 46,
                height: 16,
                gap: 8,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {/* Heart Icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: 13.33,
                  height: 12.23,
                }}
              >
                <path
                  d="M8 14.25l-1.45-1.32C3.4 9.36 1 7.28 1 4.5 1 2.42 2.42 1 4.5 1c1.74 0 3.41.81 4.5 2.09C10.09 1.81 11.76 1 13.5 1 15.58 1 17 2.42 17 4.5c0 2.78-2.4 4.86-5.55 8.43L8 14.25z"
                  stroke="black"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
              <span
                style={{
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 500,
                  fontSize: 12,
                  lineHeight: '100%',
                  color: '#000000',
                  height: 14,
                  width: 22,
                }}
              >
                Like
              </span>
            </div>

            {/* Comment Button */}
            <div
              style={{
                width: 82,
                height: 16,
                gap: 8,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {/* Comment Icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: 12.19,
                  height: 11.62,
                  strokeWidth: 0.76,
                }}
              >
                <path
                  d="M14 2H2C1.45 2 1 2.45 1 3v7c0 .55.45 1 1 1h9l3 3V3c0-.55-.45-1-1-1z"
                  stroke="black"
                  strokeWidth="0.76"
                  fill="none"
                />
              </svg>
              <span
                style={{
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 500,
                  fontSize: 12,
                  lineHeight: '100%',
                  color: '#000000',
                  height: 14,
                  width: 58,
                }}
              >
                Comment
              </span>
            </div>

            {/* Share Button */}
            <div
              style={{
                width: 54,
                height: 16,
                gap: 8,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {/* Share Icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: 14,
                  height: 11.5,
                }}
              >
                <path
                  d="M8 1.5L12 5.5H9v6H7v-6H4l4-4z"
                  stroke="black"
                  strokeWidth="1"
                  fill="black"
                />
              </svg>
              <span
                style={{
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: 500,
                  fontSize: 12,
                  lineHeight: '100%',
                  color: '#000000',
                  height: 14,
                  width: 30,
                }}
              >
                Share
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</div>

  );
}

