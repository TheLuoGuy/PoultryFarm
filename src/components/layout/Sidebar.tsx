import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Package,
  DollarSign,
  Users,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  active?: boolean;
  collapsed?: boolean;
}

const NavItem = ({
  icon,
  label,
  path,
  active = false,
  collapsed = false,
}: NavItemProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to={path}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 mb-1",
                active
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent/50",
                collapsed ? "px-3" : "px-4",
              )}
            >
              {icon}
              {!collapsed && <span>{label}</span>}
            </Button>
          </Link>
        </TooltipTrigger>
        {collapsed && <TooltipContent side="right">{label}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
};

const Sidebar = ({ collapsed = false, onToggle = () => {} }: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Mock user data
  const user = {
    name: "John Doe",
    role: "Farm Manager",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  };

  const navItems = [
    { icon: <Home size={20} />, label: "Dashboard", path: "/dashboard" },
    { icon: <Package size={20} />, label: "Inventory", path: "/inventory" },
    {
      icon: <DollarSign size={20} />,
      label: "Financials",
      path: "/financials",
    },
    { icon: <Users size={20} />, label: "Customers", path: "/customers" },
    { icon: <Settings size={20} />, label: "Admin", path: "/admin" },
  ];

  return (
    <div
      className={cn(
        "h-full min-h-screen bg-card text-card-foreground flex flex-col border-r transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[280px]",
      )}
    >
      {/* Logo and toggle */}
      <div className="p-4 flex items-center justify-between border-b">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <img src="/vite.svg" alt="Farm Logo" className="h-8 w-8" />
            <h2 className="font-bold text-lg">Poultry Farm</h2>
          </div>
        )}
        {collapsed && (
          <img src="/vite.svg" alt="Farm Logo" className="h-8 w-8 mx-auto" />
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={collapsed ? "mx-auto" : ""}
        >
          <ChevronRight
            size={18}
            className={cn(
              "transition-transform",
              collapsed ? "rotate-180" : "",
            )}
          />
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-3">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
              active={currentPath === item.path}
              collapsed={collapsed}
            />
          ))}
        </nav>
      </div>

      {/* User profile */}
      <div className="mt-auto p-4 border-t">
        <div
          className={cn(
            "flex items-center",
            collapsed ? "flex-col gap-2" : "gap-3",
          )}
        >
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>

          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {user.role}
              </p>
            </div>
          )}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Logout</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
