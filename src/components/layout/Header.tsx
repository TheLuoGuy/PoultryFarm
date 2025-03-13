import React from "react";
import { Search, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleLogout = () => {
    navigate("/");
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
        <div className="relative">
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
        </div>

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
