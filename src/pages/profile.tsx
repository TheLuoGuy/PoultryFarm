import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const Profile = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Helmet>
        <title>Profile | Poultry Farm Management System</title>
      </Helmet>

      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Profile" notificationCount={2} userName="John Doe" />

        {/* Profile Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="container mx-auto space-y-6 max-w-4xl">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>

              {/* Personal Info Tab */}
              <TabsContent
                value="personal"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3 flex flex-col items-center">
                    <Avatar className="h-32 w-32 mb-4">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=john" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button className="mb-2">Change Avatar</Button>
                    <p className="text-sm text-muted-foreground text-center">
                      Recommended: Square image, at least 300x300px
                    </p>
                  </div>

                  <div className="md:w-2/3 space-y-4">
                    <h2 className="text-xl font-semibold">
                      Personal Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Doe" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="john@poultryfarm.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        defaultValue="(555) 123-4567"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input id="jobTitle" defaultValue="Farm Manager" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        rows={4}
                        defaultValue="Experienced farm manager with over 10 years in poultry management. Specializing in optimizing production and maintaining high welfare standards."
                      />
                    </div>

                    <div className="pt-4">
                      <Button>Save Changes</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent
                value="security"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="max-w-2xl mx-auto space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      Change Password
                    </h2>
                    <Card>
                      <CardContent className="pt-6 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">
                            Current Password
                          </Label>
                          <Input id="currentPassword" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input id="newPassword" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">
                            Confirm New Password
                          </Label>
                          <Input id="confirmPassword" type="password" />
                        </div>
                        <Button>Update Password</Button>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      Two-Factor Authentication
                    </h2>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">
                              Two-Factor Authentication
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <Switch defaultChecked={true} />
                        </div>
                        <div className="mt-4 pt-4 border-t">
                          <Button variant="outline">Configure 2FA</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      Login Sessions
                    </h2>
                    <Card>
                      <CardContent className="pt-6 space-y-4">
                        <div className="space-y-4">
                          <div className="flex justify-between items-start pb-4 border-b">
                            <div>
                              <h3 className="font-medium">Current Session</h3>
                              <p className="text-sm text-muted-foreground">
                                Windows 10 • Chrome • 192.168.1.105
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Started: Today, 10:45 AM
                              </p>
                            </div>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              Active
                            </Badge>
                          </div>

                          <div className="flex justify-between items-start pb-4 border-b">
                            <div>
                              <h3 className="font-medium">Mobile Session</h3>
                              <p className="text-sm text-muted-foreground">
                                iOS 15 • Safari • 192.168.1.110
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Started: Yesterday, 3:20 PM
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500"
                            >
                              Revoke
                            </Button>
                          </div>

                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">Tablet Session</h3>
                              <p className="text-sm text-muted-foreground">
                                iPadOS • Safari • 192.168.1.115
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Started: June 14, 9:15 AM
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500"
                            >
                              Revoke
                            </Button>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          className="w-full text-red-500"
                        >
                          Log Out of All Sessions
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Preferences Tab */}
              <TabsContent
                value="preferences"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="max-w-2xl mx-auto space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      Notification Preferences
                    </h2>
                    <Card>
                      <CardContent className="pt-6 space-y-4">
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <h3 className="font-medium">Email Notifications</h3>
                            <p className="text-sm text-muted-foreground">
                              Receive email updates about system activities
                            </p>
                          </div>
                          <Switch defaultChecked={true} />
                        </div>

                        <div className="flex items-center justify-between py-2">
                          <div>
                            <h3 className="font-medium">SMS Notifications</h3>
                            <p className="text-sm text-muted-foreground">
                              Receive text messages for critical alerts
                            </p>
                          </div>
                          <Switch defaultChecked={false} />
                        </div>

                        <div className="flex items-center justify-between py-2">
                          <div>
                            <h3 className="font-medium">
                              Browser Notifications
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Receive push notifications in your browser
                            </p>
                          </div>
                          <Switch defaultChecked={true} />
                        </div>

                        <div className="flex items-center justify-between py-2">
                          <div>
                            <h3 className="font-medium">Daily Summary</h3>
                            <p className="text-sm text-muted-foreground">
                              Receive a daily summary of farm activities
                            </p>
                          </div>
                          <Switch defaultChecked={true} />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      Dashboard Preferences
                    </h2>
                    <Card>
                      <CardContent className="pt-6 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="defaultView">
                            Default Dashboard View
                          </Label>
                          <select
                            id="defaultView"
                            className="w-full p-2 border rounded-md"
                          >
                            <option value="daily">Daily View</option>
                            <option value="weekly" selected>
                              Weekly View
                            </option>
                            <option value="monthly">Monthly View</option>
                          </select>
                        </div>

                        <div className="flex items-center justify-between py-2">
                          <div>
                            <h3 className="font-medium">
                              Show Welcome Message
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Display welcome message on dashboard
                            </p>
                          </div>
                          <Switch defaultChecked={true} />
                        </div>

                        <div className="flex items-center justify-between py-2">
                          <div>
                            <h3 className="font-medium">
                              Auto-refresh Dashboard
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Automatically refresh dashboard data
                            </p>
                          </div>
                          <Switch defaultChecked={true} />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="refreshInterval">
                            Refresh Interval (minutes)
                          </Label>
                          <Input
                            id="refreshInterval"
                            type="number"
                            min="1"
                            max="60"
                            defaultValue="5"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-4">Appearance</h2>
                    <Card>
                      <CardContent className="pt-6 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="theme">Theme</Label>
                          <select
                            id="theme"
                            className="w-full p-2 border rounded-md"
                          >
                            <option value="light" selected>
                              Light
                            </option>
                            <option value="dark">Dark</option>
                            <option value="system">System Default</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="language">Language</Label>
                          <select
                            id="language"
                            className="w-full p-2 border rounded-md"
                          >
                            <option value="en" selected>
                              English
                            </option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="dateFormat">Date Format</Label>
                          <select
                            id="dateFormat"
                            className="w-full p-2 border rounded-md"
                          >
                            <option value="MM/DD/YYYY" selected>
                              MM/DD/YYYY
                            </option>
                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                          </select>
                        </div>

                        <Button>Save Preferences</Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
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

export default Profile;
