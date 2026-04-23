import React from "react";
import Players from "../../components/players";
import PlayersFooter from "../../components/PlayersFooter";

export default function Home() {
  return (
    <div className="space-y-8">
      <Players />
      <PlayersFooter />
    </div>
  );
}
