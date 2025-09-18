
export default function ScoutsBadges() {
  return (
    <div className="bg-white rounded-[12px] shadow-md p-3 w-full sm:max-w-[350px] h-[145px]">
      <h3 className="text-sm sm:text-base font-semibold mb-2 text-gray-800">
        Scout&apos;s Badges
      </h3>

      <div className="flex justify-between gap-2 h-[calc(100%-32px)]">
        {/* Each Badge */}
        {[
          { label: "Experience", value: "00", status: "Professional", color: "text-red-500" },
          { label: "Transfers", value: "00", status: "Successful", color: "text-green-500" },
          { label: "Accuracy", value: "00", status: "Scouting", color: "text-blue-500" },
        ].map((badge, i) => (
          <div
            key={i}
            className="bg-white rounded-md flex-1 shadow-md flex flex-col justify-center items-center py-2"
          >
            <p className="text-[11px] text-gray-600">{badge.label}</p>
            <p className="text-lg sm:text-xl font-bold text-gray-900">{badge.value}</p>
            <p className={`text-[11px] font-medium ${badge.color}`}>{badge.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
