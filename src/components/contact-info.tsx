import Image from 'next/image';
import { Mail, Phone } from 'lucide-react';

const InfoCard = ({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) => (
    <div className="bg-gray-100/70 rounded-2xl p-4">
        <div className="flex items-center gap-4">
            <div className="bg-primary text-white rounded-full w-14 h-14 flex items-center justify-center shrink-0">
                {icon}
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="font-lato font-medium text-xl text-foreground">{title}</h3>
                <p className="font-lato text-base text-foreground/80">{value}</p>
            </div>
        </div>
    </div>
)

export function ContactInfo() {
  return (
    <div className="flex flex-col gap-5">
      <div className="relative w-full h-[450px] lg:h-[604px] rounded-2xl overflow-hidden">
        <Image
          src="/images/Frame_2121457594_1624_1980.png"
          alt="Football players shaking hands"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px"
          data-ai-hint="football handshake"
        />
      </div>
      <div className="bg-white p-4 rounded-2xl shadow-sm border space-y-4">
          <InfoCard 
            icon={<Mail className="w-7 h-7" />}
            title="Email Address"
            value="Contact@scoutflair.com"
          />
           <InfoCard 
            icon={<Phone className="w-7 h-7" />}
            title="Phone Number"
            value="+2348123926919"
          />
      </div>
    </div>
  );
}
