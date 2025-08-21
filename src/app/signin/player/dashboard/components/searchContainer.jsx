import { Search } from "lucide-react"
   
export default function SearchContainer (){
    return(
        
  <div className="relative w-1/3">
  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
  <input
    type="text"
    placeholder="Search"
    className="border rounded-2xl px-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

    )
}