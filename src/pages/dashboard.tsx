import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import MetricsOverview from "@/components/dashboard/MetricsOverview";
import ProductionChart from "@/components/dashboard/ProductionChart";
import MortalityChart from "@/components/dashboard/MortalityChart";
import FeedConsumptionChart from "@/components/dashboard/FeedConsumptionChart";
import FilterControls from "@/components/dashboard/FilterControls";

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: {
      from: new Date(new Date().setDate(new Date().getDate() - 30)),
      to: new Date(),
    },
    coup: "all",
    birdType: "all",
  });

  // Mock data for metrics
  const metrics = {
    totalBirds: 5280,
    eggProduction: 4350,
    mortalityRate: 0.5,
    feedConsumption: 450,
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // In a real application, you would fetch new data based on these filters
    console.log("Filters changed:", newFilters);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Helmet>
        <title>Dashboard | Poultry Farm Management System</title>
      </Helmet>

      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Dashboard" notificationCount={5} userName="John Doe" />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="container mx-auto space-y-6">
            {/* Filter Controls */}
            <FilterControls onFilterChange={handleFilterChange} />

            {/* Metrics Overview */}
            <MetricsOverview
              totalBirds={metrics.totalBirds}
              eggProduction={metrics.eggProduction}
              mortalityRate={metrics.mortalityRate}
              feedConsumption={metrics.feedConsumption}
            />

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Production Chart - Takes 2/3 of the width on large screens */}
              <div className="lg:col-span-2">
                <ProductionChart
                  title="Egg Production Trends"
                  coup={filters.coup === "all" ? "All Coups" : filters.coup}
                  timeRange={`${filters.dateRange?.from ? "Custom Range" : "Last 10 Days"}`}
                />
              </div>

              {/* Mortality Chart - Takes 1/3 of the width on large screens */}
              <div>
                <MortalityChart
                  title="Mortality Rates"
                  description="Bird mortality rates by coup"
                />
              </div>
            </div>

            {/* Feed Consumption Chart - Full width */}
            <div>
              <FeedConsumptionChart
                title="Feed Consumption"
                description="Daily feed consumption by coup in kg"
              />
            </div>

            {/* Additional Dashboard Widgets Could Go Here */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Placeholder for future widgets */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-64 flex items-center justify-center">
                <p className="text-gray-500 text-center">
                  Future Widget: Bird Health Status
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-64 flex items-center justify-center">
                <p className="text-gray-500 text-center">
                  Future Widget: Upcoming Tasks
                </p>
              </div>
            </div>
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

export default Dashboard;
