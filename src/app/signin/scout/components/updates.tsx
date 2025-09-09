import { Globe } from "lucide-react";

export default function Updates() {
  const updates = [
    { icon: "https://placehold.co/32x32?text=K", text: "Kaduna State's Ministry of Sports pledges support to grassroots football.", time: "3 hrs ago" },
    { icon: "https://placehold.co/32x32?text=V", text: "Valegate football academy are going to meet with Fc Jabi next Saturday.", time: "2 mins ago" },
    { icon: "https://placehold.co/32x32?text=V", text: "Valegate football academy set to unveil their newly constructed 500 seater mini stadia.", time: "4 hrs ago" },
    { icon: "https://placehold.co/32x32?text=S", text: "Scoutflair will roll out new features next month, will be available for premium users only", time: "Yesterday" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <Globe size={20} className="mr-2 text-gray-600" />
          Updates
        </h3>
        <a href="#" className="text-blue-600 text-sm font-medium hover:underline">
          View All
        </a>
      </div>
      <div className="space-y-4">
        {updates.map((update, i) => (
          <div key={i} className="flex items-start">
            <img src={update.icon} alt="Update icon" className="h-8 w-8 rounded-full mr-3" />
            <div className="flex-1">
              <p className="text-sm text-gray-800">{update.text}</p>
              <p className="text-xs text-gray-500 mt-1">{update.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
