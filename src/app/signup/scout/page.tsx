// src/app/signup/scout/page.tsx
import Image from 'next/image';
import { ScoutSignUpForm } from './components/scout-sign-up-form';

export default function ScoutSignUpPage() {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
      {/* Left Column: Form */}
      <div className="bg-[#F6FEFF] flex justify-center items-start py-8 px-4 overflow-y-auto">
        <div className="w-full max-w-lg">
          <ScoutSignUpForm />
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
