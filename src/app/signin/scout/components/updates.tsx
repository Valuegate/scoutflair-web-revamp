
import { UpdatesIcon } from "../ScoutIcons";
export default function Updates() {
  const updates = [
    { icon: "/images/updatesone.png", text: "Kaduna State's Ministry of Sports pledges support to grassroots football.", time: "3 hrs ago"  },
    { icon: "/images/updatestwo.png", text: "Valegate football academy are going to meet with Fc Jabi next Saturday.", time: "2 mins ago" },
    { icon: "/images/updatesthree.png", text: "Valegate football academy set to unveil their newly constructed 500 seater mini stadia.", time: "4 hrs ago" },
    { icon:  "/images/updatesone.png", text: "Scoutflair will roll out new features next month, will be available for premium users only", time: "Yesterday" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold style-lato text-gray-800 flex items-center">
          <UpdatesIcon/>
          Updates
        </h3>
        <a href="#" className="text-gray-800 text-sm font-medium hover:underline">
          View All
        </a>
      </div>
      <div className="space-y-4">
        {updates.map((update, i) => (
          <div key={i} className="flex items-start">
            <img src={update.icon} alt="Update icon" className="h-8 w-8 rounded-full mr-3"  width={36} height={36}/>
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
