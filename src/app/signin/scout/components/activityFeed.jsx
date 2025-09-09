


export default function ActivityFeed() {
  const activities = [
    { user: "John Boyega", action: "Submitted a report on Henry Ishaya.", time: "Yesterday" },
    { user: "John Boyega", action: "Added Tobi Irefin to Top Prospect list.", time: "Yesterday" },
    { user: "John Boyega", action: "Attended a Local match in Kaduna.", time: "Yesterday" },
    { user: "John Boyega", action: "Added a note on Tobi Irefin.", time: "Yesterday" },
    { user: "John Boyega", action: "Scouted Kasim Segun in Abuja.", time: "Yesterday" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Activity Feed</h3>
        <a href="#" className="text-blue-600 text-sm font-medium hover:underline">
          View All
        </a>
      </div>
      <div className="space-y-4">
        {activities.map((activity, i) => (
          <div key={i} className="flex items-start">
            <img
              src={`https://placehold.co/32x32?text=${activity.user[0]}`}
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
