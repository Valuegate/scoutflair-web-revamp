
import { AllPlayersFilter } from "../ScoutIcons";
import { Search } from "lucide-react";


const SearchContainer = () => {
  return (
    <div className="relative bg-gray-200 border flex-1 max-w-full sm:max-w-[700px] ml-0 sm:ml-2 rounded-lg">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
      <input
        type="text"
        placeholder="Search for players"
        className="bg-gray-50 rounded-lg border pl-9 sm:pl-10 pr-4 py-2 w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
      />
    </div>
  );
};


export default function AvailablePlayers(){
    return(
        <div className=" bg-white  h-[120px] rounded-[12px] shadow  max-w-[1090px] m-2 space-y-6 p-4">
            
          <h1 className="font-bold text-xl ml-2 ">Available Players</h1>
          <div className="flex items-center justify-between gap-2">
  <SearchContainer />
  <button className="mr-2">
    <AllPlayersFilter />
  </button>
</div>

        </div>
    )
}