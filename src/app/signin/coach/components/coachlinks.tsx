
import React from "react";
import { Home, User, Image, Settings } from "lucide-react";


 export  const links = [
    { href: "/signin/scout/dashboard", label: "Overview", icon: <Home size={18} /> },
    { href: "/signin/scout/dashboard/evaluations", label: "Evaluations", icon: <User size={18} /> },
    { href: "/signin/scout/dashboard/matches", label: "Matches", icon: <Image size={18} /> },
    { href: "/signin/scout/dashboard/academies", label: "Academies", icon: <Settings size={18} /> },
     { href: "/signin/scout/dashboard/localpitches", label: "Local Pitches", icon: <Settings size={18} /> },
      { href: "/signin/scout/dashboard/settings", label: "Settings", icon: <Settings size={18} /> },
  ];
