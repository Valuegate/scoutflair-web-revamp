// src/app/signin/scout/page.tsx
import Image from 'next/image';
import { ScoutSignInForm } from './components/scout-sign-in-form';

export default function ScoutSignInPage() {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
      {/* Left Column: Form */}
      <div className="bg-[#F6FEFF] flex justify-center items-start py-8 px-4 overflow-y-auto">
        <div className="w-full max-w-lg">
          <ScoutSignInForm />
        </div>
      </div>

      {/* Right Column: Image */}
      <div className="hidden md:block relative h-full">
        <Image
          src="/images/Frame_2121457633_1737_2367.png"
          alt="Scout observing a football match"
          fill
          className="object-cover"
          data-ai-hint="scout observing match"
        />
      </div>
    </div>
  );
}
