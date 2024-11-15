import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, ScrollText, Lightbulb, Settings, LogOut, User } from 'lucide-react';

export default function UserProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState('/default-avatar.png');

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: ScrollText, label: 'Campaigns', href: '/campaigns' },
    { icon: Lightbulb, label: 'Recommendations', href: '/recommendations' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none"
      >
        {profilePicture ? (
          <img
            src={profilePicture}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-white"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-6 h-6 text-gray-500" />
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.label}
              </Link>
            ))}
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                // Handle logout
                setIsOpen(false);
              }}
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}