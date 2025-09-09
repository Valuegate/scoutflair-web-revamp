export default function ScoutsBadges() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Scout&apos;s Badges</h3>
      <div className="flex justify-around text-center">
        <div>
          <p className="text-sm text-gray-600">Experience</p>
          <p className="text-2xl font-bold text-gray-900">00</p>
          <p className="text-xs text-red-500">Professional</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Transfers</p>
          <p className="text-2xl font-bold text-gray-900">00</p>
          <p className="text-xs text-green-500">Successful</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Accuracy</p>
          <p className="text-2xl font-bold text-gray-900">00</p>
          <p className="text-xs text-blue-500">Scouting</p>
        </div>
      </div>
    </div>
  );
}
