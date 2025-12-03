import AddTaskForm from './addNewTask';
import { Star } from "lucide-react";
import { useState } from 'react';
import { apiFetch } from '@/lib/api'; // Import your API helper

interface TaskFormData {
  academyClubName: string;
  playerName: string;
  position: string;
  height: string;
  weight: string;
  rating: number;
  nationality: string;
  games: number;
  goals: number;
  assists: number;
  image: string | null;
}

// This interface is for the data we actually send to the API
interface ApiTaskData {
  academyClubName: string;
  playerName: string;
  position: string;
  height: number; 
  weight: number; 
  rating: number;
  nationality: string;
  games: number;
  goals: number;
  assists: number;
  image: string | null;
}


export default function ScoutingPlan() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddTaskClick = () => {
    setShowModal(true);
    setError(null);
  };

  const handleCancel = () => {
    setShowModal(false);
    setError(null);
  };

  const handleSave = async (formData: TaskFormData) => {
    setIsLoading(true);
    setError(null);

    // --- START VALIDATION & CONVERSION ---
    const heightNum = parseFloat(formData.height);
    const weightNum = parseFloat(formData.weight);
    const gamesNum = Number(formData.games);
    const goalsNum = Number(formData.goals);
    const assistsNum = Number(formData.assists);

    // 1. Check for valid numbers
    if (isNaN(heightNum) || isNaN(weightNum) || isNaN(gamesNum) || isNaN(goalsNum) || isNaN(assistsNum)) {
      let validationError = "Please enter valid numbers for: Height, Weight, Games, Goals, and Assists.";
      setError(validationError);
      setIsLoading(false);
      return;
    }

    // 2. NEW: Add reasonable range validation
    if (heightNum < 100 || heightNum > 250) {
      setError("Invalid Height. Please use centimeters (e.g., 178).");
      setIsLoading(false);
      return;
    }
    
    if (weightNum < 30 || weightNum > 150) {
      setError("Invalid Weight. Please use kilograms (e.g., 75).");
      setIsLoading(false);
      return;
    }

    // Create the payload with the correct data types
    const payload: ApiTaskData = {
      ...formData,
      height: heightNum,
      weight: weightNum,
      games: gamesNum,
      goals: goalsNum,
      assists: assistsNum,
      image: null, 
    };
    // --- END VALIDATION & CONVERSION ---

    try {
      console.log('=== API Call Debug ===');
      console.log('Endpoint:', '/api/v1/profile/scout/createNewScoutTask');
      console.log('Data being sent (Payload):', payload); 
      console.log('Token in localStorage:', localStorage.getItem('authToken') ? 'EXISTS' : 'MISSING');
      
      const result = await apiFetch('profile/scout/createNewScoutTask', {
        method: 'POST',
        body: JSON.stringify(payload), 
      });

      console.log('✅ Task created successfully:', result);
      
      alert(result.message || 'Task created successfully!');
      
      setShowModal(false);
      
    } catch (err) {
      console.error('❌ Error creating task:', err);
      console.error('Error details:', {
        message: err instanceof Error ? err.message : 'Unknown error',
        type: typeof err,
        err
      });
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const players = [
    { club: "Scoutflair FC", name: "Denis Chuks", position: "Midfielder", height: 178, weight: 69, games: 50, assists: 15, goals: 5, image:"/images/scoutplanone.png"},
    { club: "Scoutflair FC", name: "Abubakar Kabir", position: "Midfielder", height: 178, weight: 69, games: 50, assists: 15, goals: 5 , image:"/images/scoutplantwo.png"},
    { club: "Scoutflair FC", name: "Abubakar Kabir", position: "Midfielder", height: 178, weight: 69, games: 50, assists: 15, goals: 5, image:"/images/scoutplanthree.png" },
    { club: "Scoutflair FC", name: "Abubakar Kabir", position: "Midfielder", height: 178, weight: 69, games: 50, assists: 15, goals: 5, image:"/images/scoutplanfour.png" },
  ];

  const NaijaImg = () => (
    <svg width="20" height="14" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.8125 0.3125C0.948656 0.3125 0 1.69766 0 3.40625V9.59375C0 11.3023 0.948656 12.6875 2.8125 12.6875H6.1875V0.3125H2.8125ZM15.1875 0.3125H11.8125V12.6875H15.1875C17.0513 12.6875 18 11.3023 18 9.59375V3.40625C18 1.69766 17.0513 0.3125 15.1875 0.3125Z" fill="#128807"/>
    </svg>
  );

  const topPlayers = [
    { name: "Denis Wills", position: "Midfielder" , image:"/images/topone.png"},
    { name: "Lookman Adamson", position: "Midfielder" , image:"/images/toptwo.png"},
    { name: "Abubakar Man", position: "Midfielder", image:"/images/topthree.png" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
          <span className="mr-2">
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
              <path d="M14.1874 3.02833L13.3916 2.81583C11.1416 2.21583 10.0166 1.91666 9.13074 2.42583C8.24408 2.93416 7.94241 4.05333 7.33908 6.29L6.48741 9.45416C5.88408 11.6917 5.58241 12.81 6.09491 13.6917C6.60658 14.5725 7.73158 14.8725 9.98158 15.4717L10.7766 15.6842C13.0266 16.2842 14.1516 16.5833 15.0382 16.0742C15.9241 15.5658 16.2257 14.4467 16.8282 12.21L17.6807 9.04583C18.2841 6.80833 18.5849 5.69 18.0732 4.80833C17.5616 3.92666 16.4382 3.6275 14.1874 3.02833Z" stroke="#222" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10.0003 17.955L9.20701 18.1717C6.96201 18.7825 5.84035 19.0883 4.95535 18.5692C4.07201 18.0508 3.77035 16.9108 3.16951 14.6292L2.31868 11.4025C1.71701 9.12167 1.41618 7.98084 1.92701 7.0825C2.36868 6.305 3.33368 6.33334 4.58368 6.33334M14.0453 6.69417C14.0453 7.3725 13.492 7.9225 12.8095 7.9225C12.1278 7.9225 11.5745 7.3725 11.5745 6.69417C11.5745 6.01584 12.1278 5.46584 12.8095 5.46584C13.4928 5.46584 14.0453 6.01584 14.0453 6.69417Z" stroke="#222" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          Scouting Plan
        </h3>
       
        <button 
          onClick={handleAddTaskClick} 
          className="text-gray-900 border border-black font-semibold px-3 py-2 rounded-md text-xs sm:text-sm hover:bg-blue-700 hover:text-white transition"
        >
          Add Task
        </button>
        
        {showModal && (
          <AddTaskForm 
            onCancel={handleCancel}
            onSave={handleSave}
            isLoading={isLoading}
            error={error}
          />
        )}
      </div>

      {/* Scout Profile */}
      <div className="flex items-center mb-4">
        <img src="/images/scdp.png" alt="Joshua Fayomi" className="rounded-full mr-3 w-9 h-9 sm:w-10 sm:h-10 object-cover" />
        <p className="text-sm font-medium text-gray-800">Dave Ishmael</p>
      </div>

      {/* Player Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
        {players.map((player, i) => (
          <div key={i} className="bg-[rgba(255,250,250,1)] w-full sm:max-w-[151px] rounded-lg p-2 sm:p-3 text-center border border-gray-300">
            <div className="flex justify-center items-center gap-1 text-[10px] sm:text-xs font-medium text-green-600 mb-2">
              {player.club} <NaijaImg/>
            </div>
            <img
              src={player.image}
              alt={player.name}
              className="mx-auto mb-2 rounded-md w-16 h-20 sm:w-20 sm:h-28 object-cover"
            />
            <div className="flex justify-center mb-1">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={12} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-900">{player.name}</p>
            <p className="text-[10px] sm:text-xs text-gray-700">{player.position}</p>
            <p className="text-[10px] sm:text-xs text-gray-700">
              Height {player.height} • Weight {player.weight}
            </p>
            <p className="text-[10px] sm:text-xs text-gray-800 mt-1">Academy Stats</p>
            <div className="flex justify-between text-[9px] sm:text-[10px] text-gray-800 mt-1">
              <span>Games {player.games}</span>
              <span>Assists {player.assists}</span>
              <span>Goals {player.goals}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Top 3 Players */}
      <h4 className="text-sm sm:text-md font-semibold mb-2 text-gray-800">Top 3 Players</h4>
      <div className="flex flex-wrap gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {topPlayers.map((top, i) => (
          <div key={i} className="bg-[rgba(255,250,250,1)] flex items-center gap-2 p-2 rounded-lg border border-gray-300 w-full sm:max-w-[220px]">
            <img
              src={top.image}
              alt={top.name}
              className="rounded-full w-7 h-7 sm:w-8 sm:h-8 object-cover"
            />
            <NaijaImg/>
            <div className="ml-1">
              <p className="text-xs sm:text-sm font-semibold text-gray-900">{top.name}</p>
              <p className="text-[10px] sm:text-xs text-gray-700">{top.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

