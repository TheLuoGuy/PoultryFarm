import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, User, Settings, LogOut } from "lucide-react";
import ProfileMenu from "../profile/ProfileMenu";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface HeaderProps {
  title?: string;
  onSearch?: (query: string) => void;
  notificationCount?: number;
  userName?: string;
  userAvatar?: string;
}

const Header = ({
  title = "Dashboard",
  onSearch = () => {},
  notificationCount = 3,
  userName = "John Doe",
  userAvatar = "",
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleLogout = () => {
    navigate("/");
  };

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "Low Feed Stock Alert",
      message: "Feed stock for Coup #3 is below 20%. Please restock soon.",
      time: "10:45 AM",
      read: false,
      type: "alert",
    },
    {
      id: 2,
      title: "Production Target Reached",
      message: "Egg production target for this week has been reached.",
      time: "Yesterday",
      read: true,
      type: "success",
    },
    {
      id: 3,
      title: "New Customer Added",
      message: "A new customer 'Sunshine Grocers' has been added.",
      time: "2 days ago",
      read: false,
      type: "info",
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "alert":
        return "bg-red-100 text-red-800";
      case "success":
        return "bg-green-100 text-green-800";
      case "info":
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 h-20 px-6 flex items-center justify-between w-full">
      <div className="flex-1">
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative w-64">
          <Input
            type="search"
            placeholder="Search..."
            className="pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-9 w-9"
          >
            <Search className="h-4 w-4" />
          </Button>
        </form>

        {/* Notifications */}
        <Popover open={showNotifications} onOpenChange={setShowNotifications}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {notificationCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Notifications</h3>
                <Button
                  variant="link"
                  className="p-0 h-auto text-xs text-blue-500 hover:text-blue-700"
                  onClick={() => {
                    setShowNotifications(false);
                    navigate("/notifications");
                  }}
                >
                  View All
                </Button>
              </div>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No notifications
                </div>
              ) : (
                <div>
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${!notification.read ? "bg-blue-50" : ""}`}
                    >
                      <div className="flex items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm truncate">
                              {notification.title}
                            </p>
                            <Badge className={getTypeColor(notification.type)}>
                              {notification.type.charAt(0).toUpperCase() +
                                notification.type.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-2 border-t border-gray-200">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => {
                  setShowNotifications(false);
                  navigate("/notifications");
                }}
              >
                View All Notifications
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* User Profile */}
        <ProfileMenu
          userName={userName}
          userEmail="admin@poultryfarm.com"
          userAvatar={
            userAvatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=john"
          }
          onLogout={handleLogout}
        />
      </div>
    </header>
  );
};

export default Header;
