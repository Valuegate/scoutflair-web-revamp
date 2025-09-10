
export default function ActivityFeed() {
  const activities = [
    { user: "John Boyega", action: "Submitted a report on Henry Ishaya.", time: "Yesterday",  image: "/images/actone.png"},
    { user: "James Austin", action: "Added Tobi Irefin to Top Prospect list.", time: "Yesterday",   image: "/images/acttwo.png"},
    { user: "Cynthia Peacok", action: "Attended a Local match in Kaduna.", time: "Yesterday",  image: "/images/actthree.png" },
    { user: "Adewale Usman", action: "Added a note on Tobi Irefin.", time: "Yesterday" ,  image: "/images/actone.png"},
    { user: "John Boyega", action: "Scouted Kasim Segun in Abuja.", time: "Yesterday",  image: "/images/scdp.png" },
    { user: "John Boyega", action: "Scouted Kasim Segun in Abuja.", time: "Yesterday",  image: "/images/actone.png" },
    { user: "John Boyega", action: "Scouted Kasim Segun in Abuja.", time: "Yesterday",  image: "/images/actone.png" },
    { user: "John Boyega", action: "Scouted Kasim Segun in Abuja.", time: "Yesterday",  image: "/images/actone.png" },
    { user: "John Boyega", action: "Scouted Kasim Segun in Abuja.", time: "Yesterday",  image: "/images/actone.png" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Activity Feed</h3>
        <a href="#" className="text-gray-800 text-sm font-medium hover:underline">
          View All
        </a>
      </div>
      <div className="space-y-4">
        {activities.map((activity, i) => (
          <div key={i} className="flex items-start">
            <img
              src={activity.image}
              width={32}
              height={32}
              alt={activity.user}
              className="rounded-full h-8 w-8 mr-3"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{activity.user}</p>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-800">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
