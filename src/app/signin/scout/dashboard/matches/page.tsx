import React from "react";

export default function Home() {
  // Mock data for the matches
  const recentMatches = [
    { home: "Elite Strikers", away: "Rising Stars", score: "3 : 1", status: "FT" },
    { home: "City United", away: "Metro FC", score: "0 : 0", status: "FT" },
    { home: "Jabi Warriors", away: "Legacy Academy", score: "2 : 2", status: "FT" },
    { home: "Coastal FC", away: "Riverside", score: "1 : 4", status: "FT" },
    { home: "Titans Academy", away: "Blue Whales", score: "v", status: "NS" },
    { home: "Valley View", away: "Peak Performance", score: "v", status: "NS" },
    { home: "Eagle Eyes", away: "Thunder FC", score: "v", status: "NS" },
  ];

  const articles = [
    { title: "Top 5 Scouting Tips for Academy Players in 2026", date: "April 20, 2026 09:00AM", img: "1574629810360-7efbbe195018" },
    { title: "How Valuegate Academy is Revolutionizing Youth Training", date: "April 18, 2026 02:30PM", img: "1551698618-1dfe5d97d256" },
    { title: "Jabi Stadium to Undergo Major Renovation Next Month", date: "April 15, 2026 11:15AM", img: "1606107557808-bb3c04f19e82" },
    { title: "Mental Toughness: The Secret to Winning Penalty Shootouts", date: "April 12, 2026 08:45AM", img: "1574704266785-75e39b3e0f6e" },
    { title: "Player Spotlight: Paul Attah's Journey to the First Team", date: "April 10, 2026 04:20PM", img: "1544948503-4e0b1c87e21d" },
  ];

  const players = [
    { name: "Paul Attah", team: "Valuegate Academy", stats: "12 G/A This Season", rating: "8.5", fitness: "92%", tech: "88%", tact: "84%", mental: "90%", img: "1507003211169-0a1dd7228f2d" },
    { name: "David Okoro", team: "FC Jabi", stats: "8 Clean Sheets", rating: "7.9", fitness: "85%", tech: "75%", tact: "92%", mental: "88%", img: "1500648767791-c0a3c6034c28" },
    { name: "Samuel Tunde", team: "Valuegate Academy", stats: "Midfield Engine", rating: "8.2", fitness: "95%", tech: "82%", tact: "86%", mental: "82%", img: "1472099645785-5658abf4ff4e" },
    { name: "Victor Eze", team: "City United", stats: "Rising Talent", rating: "7.4", fitness: "80%", tech: "85%", tact: "70%", mental: "75%", img: "1519085360753-af0119f7c2b6" },
  ];

  return (
    <div className="p-3 md:p-6 min-h-screen bg-gray-50">
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        
        {/* Left Column */}
        <div className="flex-1 lg:max-w-2xl space-y-6">
          
          {/* Main Feature Match Card */}
          <div className="relative w-full h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden shadow-2xl">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#041931] via-[#041931]/90 to-transparent" />
            
            <div className="relative h-full p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h2 className="text-white text-xl md:text-3xl font-bold leading-tight max-w-xs">
                  Valuegate Academy vs FC Jabi
                </h2>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/90">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/></svg>
                    <span className="text-sm font-medium">May 15, 2026 • 4:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
                    <span className="text-sm font-medium">Old Jabi Township Stadium</span>
                  </div>
                </div>
              </div>
              <button className="w-fit px-6 py-2 rounded-lg bg-orange-500 text-white font-bold text-sm tracking-widest hover:bg-orange-600 transition shadow-lg">
                MATCH PREVIEW
              </button>
            </div>
          </div>
          
          {/* Recent Matches Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-end">
              <div>
                <h3 className="text-black font-bold text-lg">Recent Matches</h3>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-xs">FC</div>
                  <div>
                    <p className="text-xs font-bold text-gray-900 leading-none">Fayomi's Cup</p>
                    <p className="text-[10px] text-gray-500">Local Championship • 2026 Season</p>
                  </div>
                </div>
              </div>
              <button className="text-blue-600 text-xs font-bold hover:underline">View Schedule</button>
            </div>
            
            <div className="divide-y divide-gray-50">
              {recentMatches.map((match, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 hover:bg-gray-50 transition">
                  <span className={`text-[10px] font-bold w-6 ${match.status === 'FT' ? 'text-gray-400' : 'text-green-600'}`}>
                    {match.status}
                  </span>
                  
                  <div className="flex-1 flex items-center justify-center gap-4">
                    <div className="flex items-center gap-2 w-1/3 justify-end">
                      <span className="text-xs font-medium text-gray-800 text-right">{match.home}</span>
                      <div className="w-6 h-6 rounded-full bg-gray-200" />
                    </div>
                    
                    <div className={`px-3 py-1 rounded text-xs font-bold ${match.status === 'FT' ? 'bg-gray-100 text-gray-800' : 'bg-blue-600 text-white'}`}>
                      {match.score}
                    </div>
                    
                    <div className="flex items-center gap-2 w-1/3">
                      <div className="w-6 h-6 rounded-full bg-gray-200" />
                      <span className="text-xs font-medium text-gray-800">{match.away}</span>
                    </div>
                  </div>
                  
                  <button className="text-gray-300 hover:text-orange-500">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="flex-1 lg:max-w-md space-y-6">
          
          {/* Latest Articles Section */}
          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="text-gray-900 font-bold text-lg mb-4">Latest Analysis</h3>
            <div className="space-y-4">
              {articles.map((article, idx) => (
                <div key={idx} className="flex gap-3 group cursor-pointer">
                  <img 
                    src={`https://images.unsplash.com/photo-${article.img}?auto=format&fit=crop&w=150&q=80`}
                    alt="news"
                    className="w-20 h-16 rounded-md object-cover flex-shrink-0 shadow-sm group-hover:opacity-80 transition"
                  />
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-gray-800 leading-snug group-hover:text-blue-600 transition">
                      {article.title}
                    </h4>
                    <p className="text-[10px] text-gray-400 font-medium">{article.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Players Reviews Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-5 bg-gray-900">
              <h3 className="text-white font-bold text-lg">Scout Performance Reviews</h3>
            </div>

            <div className="divide-y divide-gray-100">
              {players.map((player, idx) => (
                <div key={idx} className="p-4 hover:bg-blue-50/30 transition">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://images.unsplash.com/photo-${player.img}?auto=format&fit=crop&w=100&q=80`}
                        alt={player.name}
                        className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                      />
                      <div>
                        <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">{player.team}</p>
                        <p className="text-sm font-bold text-gray-900">{player.name}</p>
                        <p className="text-[10px] text-gray-500 font-medium">{player.stats}</p>
                      </div>
                    </div>
                    
                    <div className="relative w-10 h-10 flex items-center justify-center">
                      <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle cx="20" cy="20" r="18" fill="none" stroke="#eee" strokeWidth="3" />
                        <circle cx="20" cy="20" r="18" fill="none" stroke="#0ea5e9" strokeWidth="3" strokeDasharray="113" strokeDashoffset={113 - (parseFloat(player.rating) / 10) * 113} />
                      </svg>
                      <span className="text-[10px] font-bold">{player.rating}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: 'Fitness', val: player.fitness },
                      { label: 'Technical', val: player.tech },
                      { label: 'Tactical', val: player.tact },
                      { label: 'Mental', val: player.mental }
                    ].map((metric, midx) => (
                      <div key={midx} className="text-center p-1 bg-gray-50 rounded">
                        <p className="text-[8px] text-gray-400 uppercase font-bold">{metric.label}</p>
                        <p className="text-xs font-bold text-gray-800">{metric.val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-gray-50 text-center">
              <button className="flex items-center justify-center gap-2 w-full text-xs font-bold text-gray-600 hover:text-gray-900 transition">
                <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                VIEW ALL SCOUT REPORTS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}