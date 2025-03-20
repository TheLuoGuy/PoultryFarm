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
import { Badge } from "@/components/ui/badge";
import GlobalCurrencySelector from "@/components/admin/GlobalCurrencySelector";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AddUserForm from "@/components/admin/AddUserForm";
import EditUserForm from "@/components/admin/EditUserForm";
import {
  Plus,
  UserPlus,
  Settings,
  Database,
  Shield,
  Bell,
  Download,
  DollarSign,
} from "lucide-react";

const Admin = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showEditUserForm, setShowEditUserForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Mock users data
  const [users, setUsers] = useState([
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      name: "John Doe",
      email: "john@poultryfarm.com",
      role: "admin",
      status: "Active",
      lastLogin: "2023-06-15 09:45 AM",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      permissions: ["view-dashboard", "manage-users", "configure-farm"],
    },
    {
      id: "2",
      firstName: "Sarah",
      lastName: "Johnson",
      name: "Sarah Johnson",
      email: "sarah@poultryfarm.com",
      role: "manager",
      status: "Active",
      lastLogin: "2023-06-14 16:30 PM",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      permissions: ["view-dashboard", "manage-inventory", "manage-customers"],
    },
    {
      id: "3",
      firstName: "Mike",
      lastName: "Brown",
      name: "Mike Brown",
      email: "mike@poultryfarm.com",
      role: "staff",
      status: "Active",
      lastLogin: "2023-06-15 08:15 AM",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      permissions: ["view-dashboard", "manage-inventory"],
    },
    {
      id: "4",
      firstName: "Emily",
      lastName: "Davis",
      name: "Emily Davis",
      email: "emily@poultryfarm.com",
      role: "accountant",
      status: "Inactive",
      lastLogin: "2023-06-10 14:20 PM",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      permissions: ["view-dashboard", "manage-financials", "view-reports"],
    },
  ]);

  const handleAddUser = (userData) => {
    const newUser = {
      id: (users.length + 1).toString(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      role: userData.role,
      status: "Active",
      lastLogin: "Never",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.firstName.toLowerCase()}`,
      permissions: userData.permissions,
    };
    setUsers([...users, newUser]);
  };

  const handleEditUser = (userData) => {
    if (!currentUser) return;

    const updatedUsers = users.map((user) => {
      if (user.id === currentUser.id) {
        return {
          ...user,
          firstName: userData.firstName,
          lastName: userData.lastName,
          name: `${userData.firstName} ${userData.lastName}`,
          email: userData.email,
          role: userData.role,
          status: userData.isActive ? "Active" : "Inactive",
          permissions: userData.permissions,
        };
      }
      return user;
    });

    setUsers(updatedUsers);
  };

  const handleDeactivateUser = (userId) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          status: user.status === "Active" ? "Inactive" : "Active",
        };
      }
      return user;
    });

    setUsers(updatedUsers);
  };

  const openEditUserForm = (user) => {
    setCurrentUser(user);
    setShowEditUserForm(true);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Helmet>
        <title>Admin | Poultry Farm Management System</title>
      </Helmet>

      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Admin Panel" notificationCount={2} userName="John Doe" />

        {/* Admin Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="container mx-auto space-y-6">
            <Tabs defaultValue="users" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="users">User Management</TabsTrigger>
                <TabsTrigger value="farm">Farm Settings</TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
                <TabsTrigger value="logs">Activity Logs</TabsTrigger>
              </TabsList>

              {/* User Management Tab */}
              <TabsContent
                value="users"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">User Management</h2>
                    <p className="text-sm text-muted-foreground">
                      Manage system users and permissions
                    </p>
                  </div>
                  <Button onClick={() => setShowAddUserForm(true)}>
                    <UserPlus className="h-4 w-4 mr-2" /> Add User
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border p-2 text-left">User</th>
                        <th className="border p-2 text-left">Email</th>
                        <th className="border p-2 text-left">Role</th>
                        <th className="border p-2 text-left">Status</th>
                        <th className="border p-2 text-left">Last Login</th>
                        <th className="border p-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="border p-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>
                                  {user.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>{user.name}</div>
                            </div>
                          </td>
                          <td className="border p-2">{user.email}</td>
                          <td className="border p-2">
                            <Badge
                              variant="outline"
                              className={`${
                                user.role === "admin"
                                  ? "bg-blue-50 text-blue-700"
                                  : user.role === "manager"
                                    ? "bg-purple-50 text-purple-700"
                                    : user.role === "accountant"
                                      ? "bg-orange-50 text-orange-700"
                                      : "bg-green-50 text-green-700"
                              } hover:bg-opacity-75`}
                            >
                              {user.role.charAt(0).toUpperCase() +
                                user.role.slice(1)}
                            </Badge>
                          </td>
                          <td className="border p-2">
                            <Badge
                              variant="outline"
                              className={`${user.status === "Active" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"} hover:bg-opacity-75`}
                            >
                              {user.status}
                            </Badge>
                          </td>
                          <td className="border p-2">{user.lastLogin}</td>
                          <td className="border p-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="mr-2"
                              onClick={() => openEditUserForm(user)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className={
                                user.status === "Active"
                                  ? "text-red-500 border-red-200 hover:bg-red-50"
                                  : "text-green-500 border-green-200 hover:bg-green-50"
                              }
                              onClick={() => handleDeactivateUser(user.id)}
                            >
                              {user.status === "Active"
                                ? "Deactivate"
                                : "Activate"}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              {/* Farm Settings Tab */}
              <TabsContent
                value="farm"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">Farm Settings</h2>
                    <p className="text-sm text-muted-foreground">
                      Configure farm-specific settings and parameters
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline">
                      <Settings className="h-4 w-4 mr-2" /> Save Changes
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Coup Management</CardTitle>
                      <CardDescription>
                        Configure and manage farm coups
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Add New Coup
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-xs text-muted-foreground">
                                  Coup Name
                                </label>
                                <Input placeholder="Enter coup name" />
                              </div>
                              <div>
                                <label className="text-xs text-muted-foreground">
                                  Type
                                </label>
                                <select className="w-full p-2 border rounded-md">
                                  <option value="layers">Layers</option>
                                  <option value="broilers">Broilers</option>
                                </select>
                              </div>
                              <div>
                                <label className="text-xs text-muted-foreground">
                                  Capacity
                                </label>
                                <Input
                                  type="number"
                                  placeholder="Enter capacity"
                                />
                              </div>
                              <div className="flex items-end">
                                <Button className="w-full">Add Coup</Button>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-sm font-medium">
                              Active Coups
                            </h3>
                            <div className="flex justify-between items-center p-2 bg-muted rounded">
                              <span>Coup A</span>
                              <span className="text-sm text-muted-foreground">
                                Layers - Capacity: 1,500
                              </span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => alert("Edit Coup A")}
                              >
                                Edit
                              </Button>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-muted rounded">
                              <span>Coup B</span>
                              <span className="text-sm text-muted-foreground">
                                Layers - Capacity: 1,200
                              </span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => alert("Edit Coup B")}
                              >
                                Edit
                              </Button>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-muted rounded">
                              <span>Coup C</span>
                              <span className="text-sm text-muted-foreground">
                                Layers - Capacity: 1,000
                              </span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => alert("Edit Coup C")}
                              >
                                Edit
                              </Button>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-muted rounded">
                              <span>Coup D</span>
                              <span className="text-sm text-muted-foreground">
                                Broilers - Capacity: 1,200
                              </span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => alert("Edit Coup D")}
                              >
                                Edit
                              </Button>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-muted rounded">
                              <span>Coup E</span>
                              <span className="text-sm text-muted-foreground">
                                Broilers - Capacity: 1,000
                              </span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => alert("Edit Coup E")}
                              >
                                Edit
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Alert Configuration</CardTitle>
                      <CardDescription>
                        Set up notification thresholds and alerts
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Mortality Rate Alert Threshold (%)
                          </label>
                          <Input
                            type="number"
                            defaultValue="2"
                            min="0"
                            max="100"
                            step="0.1"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Feed Stock Alert Threshold (kg)
                          </label>
                          <Input
                            type="number"
                            defaultValue="500"
                            min="0"
                            step="10"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Temperature Alert Range (°C)
                          </label>
                          <div className="flex gap-2">
                            <Input
                              type="number"
                              defaultValue="18"
                              min="0"
                              max="50"
                              placeholder="Min"
                            />
                            <Input
                              type="number"
                              defaultValue="32"
                              min="0"
                              max="50"
                              placeholder="Max"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Notification Recipients
                          </label>
                          <Input
                            type="text"
                            defaultValue="admin@poultryfarm.com, manager@poultryfarm.com"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Farm Profile</CardTitle>
                      <CardDescription>
                        Basic information about your farm
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Farm Name
                          </label>
                          <Input
                            type="text"
                            defaultValue="Green Valley Poultry Farm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Address</label>
                          <Input
                            type="text"
                            defaultValue="123 Rural Road, Farmville, CA 95624"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Contact Email
                          </label>
                          <Input
                            type="email"
                            defaultValue="contact@greenvalleyfarm.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Contact Phone
                          </label>
                          <Input type="tel" defaultValue="(555) 123-4567" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Production Settings</CardTitle>
                      <CardDescription>
                        Configure production parameters
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Expected Egg Production Rate (%)
                          </label>
                          <Input
                            type="number"
                            defaultValue="85"
                            min="0"
                            max="100"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Feed Consumption per Bird (g/day)
                          </label>
                          <Input type="number" defaultValue="120" min="0" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Expected Growth Rate - Broilers (g/day)
                          </label>
                          <Input type="number" defaultValue="65" min="0" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Target Market Weight - Broilers (kg)
                          </label>
                          <Input
                            type="number"
                            defaultValue="2.5"
                            min="0"
                            step="0.1"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <GlobalCurrencySelector />
                </div>
              </TabsContent>

              {/* System Tab */}
              <TabsContent
                value="system"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">System Settings</h2>
                    <p className="text-sm text-muted-foreground">
                      Configure system-wide settings and perform maintenance
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Database className="h-5 w-5 mr-2" /> Database
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Status
                          </span>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700"
                          >
                            Connected
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Size
                          </span>
                          <span>245 MB</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Last Backup
                          </span>
                          <span>2023-06-15 02:00 AM</span>
                        </div>
                        <Button
                          className="w-full"
                          variant="outline"
                          onClick={() => alert("Backup started")}
                        >
                          <Download className="h-4 w-4 mr-2" /> Backup Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Shield className="h-5 w-5 mr-2" /> Security
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Two-Factor Auth
                          </span>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700"
                          >
                            Enabled
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Password Policy
                          </span>
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700"
                          >
                            Strong
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Session Timeout
                          </span>
                          <span>30 minutes</span>
                        </div>
                        <Button
                          className="w-full"
                          variant="outline"
                          onClick={() =>
                            alert("Security settings would open here")
                          }
                        >
                          Security Settings
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Bell className="h-5 w-5 mr-2" /> Notifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Email Notifications
                          </span>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700"
                          >
                            Enabled
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            SMS Notifications
                          </span>
                          <Badge
                            variant="outline"
                            className="bg-red-50 text-red-700"
                          >
                            Disabled
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Push Notifications
                          </span>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700"
                          >
                            Enabled
                          </Badge>
                        </div>
                        <Button
                          className="w-full"
                          variant="outline"
                          onClick={() =>
                            alert("Notification settings would open here")
                          }
                        >
                          Configure Notifications
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-3">
                    <CardHeader>
                      <CardTitle>System Maintenance</CardTitle>
                      <CardDescription>
                        Perform system maintenance tasks
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button
                          variant="outline"
                          className="h-auto py-4 flex flex-col items-center justify-center"
                          onClick={() => alert("Cache cleared successfully")}
                        >
                          <div className="text-primary mb-2">Clear Cache</div>
                          <div className="text-xs text-muted-foreground text-center">
                            Remove temporary files to improve performance
                          </div>
                        </Button>
                        <Button
                          variant="outline"
                          className="h-auto py-4 flex flex-col items-center justify-center"
                          onClick={() => alert("Database optimization started")}
                        >
                          <div className="text-primary mb-2">
                            Optimize Database
                          </div>
                          <div className="text-xs text-muted-foreground text-center">
                            Improve database performance and reduce size
                          </div>
                        </Button>
                        <Button
                          variant="outline"
                          className="h-auto py-4 flex flex-col items-center justify-center"
                          onClick={() => alert("Checking for updates...")}
                        >
                          <div className="text-primary mb-2">
                            Check for Updates
                          </div>
                          <div className="text-xs text-muted-foreground text-center">
                            Check for system updates and patches
                          </div>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Activity Logs Tab */}
              <TabsContent
                value="logs"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">Activity Logs</h2>
                    <p className="text-sm text-muted-foreground">
                      View system and user activity logs
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" /> Export Logs
                    </Button>
                    <Button variant="outline">Filter</Button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border p-2 text-left">Timestamp</th>
                        <th className="border p-2 text-left">User</th>
                        <th className="border p-2 text-left">Action</th>
                        <th className="border p-2 text-left">IP Address</th>
                        <th className="border p-2 text-left">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2">2023-06-15 10:45:23</td>
                        <td className="border p-2">John Doe</td>
                        <td className="border p-2">
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700"
                          >
                            Login
                          </Badge>
                        </td>
                        <td className="border p-2">192.168.1.105</td>
                        <td className="border p-2">
                          Successful login from Chrome on Windows
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2">2023-06-15 10:48:12</td>
                        <td className="border p-2">John Doe</td>
                        <td className="border p-2">
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700"
                          >
                            Update
                          </Badge>
                        </td>
                        <td className="border p-2">192.168.1.105</td>
                        <td className="border p-2">
                          Updated inventory for Coup A
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2">2023-06-15 09:30:45</td>
                        <td className="border p-2">Sarah Johnson</td>
                        <td className="border p-2">
                          <Badge
                            variant="outline"
                            className="bg-purple-50 text-purple-700"
                          >
                            Create
                          </Badge>
                        </td>
                        <td className="border p-2">192.168.1.110</td>
                        <td className="border p-2">
                          Created new customer: Farm Fresh Restaurant
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2">2023-06-15 09:15:33</td>
                        <td className="border p-2">Sarah Johnson</td>
                        <td className="border p-2">
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700"
                          >
                            Login
                          </Badge>
                        </td>
                        <td className="border p-2">192.168.1.110</td>
                        <td className="border p-2">
                          Successful login from Safari on macOS
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2">2023-06-15 08:50:19</td>
                        <td className="border p-2">Mike Brown</td>
                        <td className="border p-2">
                          <Badge
                            variant="outline"
                            className="bg-yellow-50 text-yellow-700"
                          >
                            Report
                          </Badge>
                        </td>
                        <td className="border p-2">192.168.1.115</td>
                        <td className="border p-2">
                          Generated monthly financial report
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2">2023-06-15 08:45:07</td>
                        <td className="border p-2">Mike Brown</td>
                        <td className="border p-2">
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700"
                          >
                            Login
                          </Badge>
                        </td>
                        <td className="border p-2">192.168.1.115</td>
                        <td className="border p-2">
                          Successful login from Firefox on Linux
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2">2023-06-14 17:30:22</td>
                        <td className="border p-2">System</td>
                        <td className="border p-2">
                          <Badge
                            variant="outline"
                            className="bg-red-50 text-red-700"
                          >
                            Alert
                          </Badge>
                        </td>
                        <td className="border p-2">-</td>
                        <td className="border p-2">
                          Feed stock low in Coup B: 450kg remaining
                        </td>
                      </tr>
                      <tr>
                        <td className="border p-2">2023-06-14 16:45:11</td>
                        <td className="border p-2">John Doe</td>
                        <td className="border p-2">
                          <Badge
                            variant="outline"
                            className="bg-orange-50 text-orange-700"
                          >
                            Delete
                          </Badge>
                        </td>
                        <td className="border p-2">192.168.1.105</td>
                        <td className="border p-2">
                          Deleted expired inventory record
                        </td>
                      </tr>
                    </tbody>
                  </table>
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

      {/* Add User Form Dialog */}
      <AddUserForm
        open={showAddUserForm}
        onOpenChange={setShowAddUserForm}
        onSubmit={handleAddUser}
      />

      {/* Edit User Form Dialog */}
      {currentUser && (
        <EditUserForm
          open={showEditUserForm}
          onOpenChange={setShowEditUserForm}
          user={currentUser}
          onSubmit={handleEditUser}
        />
      )}
    </div>
  );
};

export default Admin;
