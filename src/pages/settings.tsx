import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useCurrency, currencies } from "@/lib/currency";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Settings = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="flex h-screen bg-gray-50">
      <Helmet>
        <title>Settings | Poultry Farm Management System</title>
      </Helmet>

      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Settings" notificationCount={2} userName="John Doe" />

        {/* Settings Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="container mx-auto space-y-6 max-w-4xl">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>
              
              {/* General Settings Tab */}
              <TabsContent value="general" className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="max-w-2xl mx-auto space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">General Settings</h2>
                    <Card>
                      <CardContent className="pt-6 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="language">Language</Label>
                          <select id="language" className="w-full p-2 border rounded-md">
                            <option value="en" selected>English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                          </select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="timezone">Timezone</Label>
                          <select id="timezone" className="w-full p-2 border rounded-md">
                            <option value="UTC-8" selected>Pacific Time (UTC-8)</option>
                            <option value="UTC-7">Mountain Time (UTC-7)</option>
                            <option value="UTC-6">Central Time (UTC-6)</option>
                            <option value="UTC-5">Eastern Time (UTC-5)</option>
                            <option value="UTC+0">Greenwich Mean Time (UTC+0)</option>
                          </select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="dateFormat">Date Format</Label>
                          <select id="dateFormat" className="w-full p-2 border rounded-md">
                            <option value="MM/DD/YYYY" selected>MM/DD/YYYY</option>
                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                          </select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="timeFormat">Time Format</Label>
                          <select id="timeFormat" className="w-full p-2 border rounded-md">
                            <option value="12" selected>12-hour (AM/PM)</option>
                            <option value="24">24-hour</option>
                          </select>
                        </div>
                        
                        <div className="space-y-4 pt-4 border-t mt-4">
                          <Label>Currency</Label>
                          <RadioGroup 
                            defaultValue={currency.code}
                            onValueChange={(value) => {
                              const selectedCurrency = currencies.find(c => c.code === value);
                              if (selectedCurrency) setCurrency(selectedCurrency);
                            }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-2"
                          >
                            {currencies.map((curr) => (
                              <div key={curr.code} className="flex items-center space-x-2 border p-2 rounded-md">
                                <RadioGroupItem value={curr.code} id={`currency-${curr.code}`} />
                                <Label htmlFor={`currency-${curr.code}`} className="flex-1 cursor-pointer">
                                  <div className="font-medium">{curr.name}</div>
                                  <div className="text-sm text-muted-foreground">{curr.symbol} ({curr.code})</div>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
