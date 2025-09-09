export default function ScoutsBadges() {
  return (
    <div className="bg-white rounded-xl w-[350px] h-[145px] shadow-md p-2">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Scout's Badges</h3>
      <div className="flex justify-between   gap-2">
        <div className="bg-white rounded-lg  h-[84px] flex-1 shadow-md flex flex-col justify-center items-center">
          <p className="text-xs text-gray-600 mb-1">Experience</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">00</p>
          <p className="text-xs text-red-500 font-medium">Professional</p>
        </div>
        <div className="bg-white rounded-lg h-[84px] flex-1 shadow-md flex flex-col justify-center items-center">
          <p className="text-xs text-gray-600 mb-1">Transfers</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">00</p>
          <p className="text-xs text-green-500 font-medium">Successful</p>
        </div>
        <div className="bg-white rounded-lg h-[84px] flex-1 shadow-md  flex flex-col justify-center items-center">
          <p className="text-xs text-gray-600 mb-1">Accuracy</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">00</p>
          <p className="text-xs text-blue-500 font-medium">Scouting</p>
        </div>
      </div>
    </div>
  );
}