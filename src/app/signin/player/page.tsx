// src/app/signin/player/page.tsx
import Image from 'next/image';
import { PlayerSignInForm } from './components/player-sign-in-form';

export default function PlayerSignInPage() {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
      {/* Left Column: Form */}
      <div className="bg-[#F6FEFF] flex justify-center items-start py-8 px-4 overflow-y-auto">
        <div className="w-full max-w-lg">
          <PlayerSignInForm />
        </div>
      </div>

      {/* Right Column: Image */}
      <div className="hidden md:block relative h-full">
        <Image
          src="/images/Frame_2121457633_1737_2367.png"
          alt="Football player celebrating on the field"
          fill
          className="object-cover"
          data-ai-hint="football player celebrating"
        />
      </div>
    </div>
  );
}
