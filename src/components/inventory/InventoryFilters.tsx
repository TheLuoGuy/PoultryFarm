import React from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InventoryFiltersProps {
  onFilterChange?: (filters: {
    birdType: string;
    coup: string;
    healthStatus: string;
    ageGroup: string;
  }) => void;
}

const InventoryFilters = ({ onFilterChange }: InventoryFiltersProps = {}) => {
  const [birdType, setBirdType] = React.useState<string>("all");
  const [coup, setCoup] = React.useState<string>("all");
  const [healthStatus, setHealthStatus] = React.useState<string>("all");
  const [ageGroup, setAgeGroup] = React.useState<string>("all");

  // Apply filters when any filter changes
  const applyFilters = () => {
    if (onFilterChange) {
      onFilterChange({
        birdType,
        coup,
        healthStatus,
        ageGroup,
      });
    }
  };

  // Handle bird type selection change
  const handleBirdTypeChange = (value: string) => {
    setBirdType(value);
    setTimeout(applyFilters, 0);
  };

  // Handle coup selection change
  const handleCoupChange = (value: string) => {
    setCoup(value);
    setTimeout(applyFilters, 0);
  };

  // Handle health status selection change
  const handleHealthStatusChange = (value: string) => {
    setHealthStatus(value);
    setTimeout(applyFilters, 0);
  };

  // Handle age group selection change
  const handleAgeGroupChange = (value: string) => {
    setAgeGroup(value);
    setTimeout(applyFilters, 0);
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <h3 className="text-sm font-medium">Filter Inventory</h3>
        </div>

        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
          {/* Bird Type Selector */}
          <div className="w-full sm:w-[180px]">
            <Select value={birdType} onValueChange={handleBirdTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Bird Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Birds</SelectItem>
                <SelectItem value="layers">Layers</SelectItem>
                <SelectItem value="broilers">Broilers</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Coup Selector */}
          <div className="w-full sm:w-[180px]">
            <Select value={coup} onValueChange={handleCoupChange}>
              <SelectTrigger>
                <SelectValue placeholder="Coup" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Coups</SelectItem>
                <SelectItem value="coup-a">Coup A</SelectItem>
                <SelectItem value="coup-b">Coup B</SelectItem>
                <SelectItem value="coup-c">Coup C</SelectItem>
                <SelectItem value="coup-d">Coup D</SelectItem>
                <SelectItem value="coup-e">Coup E</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Health Status Selector */}
          <div className="w-full sm:w-[180px]">
            <Select
              value={healthStatus}
              onValueChange={handleHealthStatusChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Health Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="healthy">Healthy</SelectItem>
                <SelectItem value="monitor">Monitor</SelectItem>
                <SelectItem value="treatment">Under Treatment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Age Group Selector */}
          <div className="w-full sm:w-[180px]">
            <Select value={ageGroup} onValueChange={handleAgeGroupChange}>
              <SelectTrigger>
                <SelectValue placeholder="Age Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ages</SelectItem>
                <SelectItem value="0-4">0-4 weeks</SelectItem>
                <SelectItem value="5-12">5-12 weeks</SelectItem>
                <SelectItem value="13-20">13-20 weeks</SelectItem>
                <SelectItem value="21+">21+ weeks</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reset Filters Button */}
          <Button
            variant="outline"
            size="sm"
            className="w-full sm:w-auto"
            onClick={() => {
              setBirdType("all");
              setCoup("all");
              setHealthStatus("all");
              setAgeGroup("all");
              setTimeout(applyFilters, 0);
            }}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InventoryFilters;
