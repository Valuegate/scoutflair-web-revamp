import React from "react";

import AvailablePlayers from "../../components/availablePlayers";
import Players from "../../components/players";

export default function Home(){
    return(
        <div  className="space-y-8">
      <AvailablePlayers/>
      <Players/>
      </div>
    )
}