import Link from 'next/link';

const ScoutFlairLogoSvg = () => (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_1572_2140)">
            <path d="M21.543 38.3903L3.61644 20.4909C-0.995845 15.896 -0.995845 8.43647 3.61644 3.84155C8.22872 -0.761638 15.6947 -0.761638 20.3069 3.84155L38.2335 21.7327C42.8457 26.3359 42.8457 33.7871 38.2335 38.3903C33.6212 42.9853 26.1553 42.9853 21.543 38.3903Z" fill="#083162"/>
            <path d="M3.1111 21.6001L20.4404 38.8952C15.6207 43.1838 8.22112 43.0265 3.60054 38.4067C-1.02834 33.7952 -1.19425 26.4103 3.1111 21.6001Z" fill="#F2A725"/>
            <path d="M38.8898 20.4823L21.5605 3.17891C26.3802 -1.10968 33.7798 -0.952377 38.4004 3.66737C43.0292 8.28713 43.1952 15.6721 38.8898 20.4823Z" fill="#F2A725"/>
        </g>
        <defs>
            <clipPath id="clip0_1572_2140">
                <rect width="42" height="42" fill="white"/>
            </clipPath>
        </defs>
    </svg>
);

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="ScoutFlair Home">
      <ScoutFlairLogoSvg />
      <span className="text-2xl font-bold tracking-tight text-[#1B1B1B]">ScoutFlair</span>
    </Link>
  );
}
