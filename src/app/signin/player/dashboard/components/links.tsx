
import React from "react";
import { Home, User, Image, Settings, LogOut } from "lucide-react";


 export  const links = [
    { href: "/signin/player/dashboard", label: "Spotlight", icon: <Home size={18} /> },
    { href: "/signin/player/dashboard/profile", label: "Profile", icon: <User size={18} /> },
    { href: "/signin/player/dashboard/gallery", label: "Gallery", icon: <Image size={18} /> },
    { href: "/signin/player/dashboard/settings", label: "Settings", icon: <Settings size={18} /> },
  ];
