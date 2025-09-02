// components/NotificationBell.tsx
import { Bell } from "lucide-react";
import { useState } from 'react';

type NotificationBellProps = {
  initialCount?: number;
};

const NotificationBell = ({ initialCount = 6 }: NotificationBellProps) => {
  const [notificationCount, setNotificationCount] = useState<number>(initialCount);

  return (
    <div className="relative">
      {/* Bell Icon */}
      <Bell className="h-[24px] w-[21px] text-black-700" />

      {/* Notification Badge (only visible if count is greater than 0) */}
      {notificationCount > 0 && (
        <div className="absolute top-0 right-1 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-[16px] w-[16px] flex items-center justify-center ring-2 ring-white">
          {notificationCount}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;