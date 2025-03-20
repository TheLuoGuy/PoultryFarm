import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Check, X } from "lucide-react";

const Notifications = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Low Feed Stock Alert",
      message: "Feed stock for Coup #3 is below 20%. Please restock soon.",
      time: "Today, 10:45 AM",
      read: false,
      type: "alert",
    },
    {
      id: 2,
      title: "Production Target Reached",
      message:
        "Congratulations! Egg production target for this week has been reached.",
      time: "Yesterday, 3:20 PM",
      read: true,
      type: "success",
    },
    {
      id: 3,
      title: "New Customer Added",
      message:
        "A new customer 'Sunshine Grocers' has been added to your customer list.",
      time: "June 14, 9:15 AM",
      read: false,
      type: "info",
    },
    {
      id: 4,
      title: "Mortality Rate Increase",
      message:
        "There has been a 2% increase in mortality rate in Coup #2. Please check.",
      time: "June 12, 11:30 AM",
      read: false,
      type: "alert",
    },
    {
      id: 5,
      title: "System Update",
      message:
        "The system will undergo maintenance on June 20 from 2:00 AM to 4:00 AM.",
      time: "June 10, 5:45 PM",
      read: true,
      type: "info",
    },
  ]);

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id),
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true })),
    );
  };

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

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  return (
    <div className="flex h-screen bg-gray-50">
      <Helmet>
        <title>Notifications | Poultry Farm Management System</title>
      </Helmet>

      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Notifications"
          notificationCount={unreadCount}
          userName="John Doe"
        />

        {/* Notifications Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="container mx-auto space-y-6 max-w-4xl">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">Notifications</h1>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                >
                  Mark All as Read
                </Button>
              </div>
            </div>

            {notifications.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No notifications</p>
                  <p className="text-sm text-muted-foreground">
                    You're all caught up! There are no notifications to display.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={
                      notification.read ? "" : "border-l-4 border-l-blue-500"
                    }
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">
                              {notification.title}
                            </h3>
                            <Badge className={getTypeColor(notification.type)}>
                              {notification.type.charAt(0).toUpperCase() +
                                notification.type.slice(1)}
                            </Badge>
                            {!notification.read && (
                              <Badge variant="outline" className="bg-blue-50">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {notification.time}
                          </p>
                        </div>
                        <div className="flex space-x-1">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => markAsRead(notification.id)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteNotification(notification.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 p-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Poultry Farm Management System. All
          rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Notifications;
