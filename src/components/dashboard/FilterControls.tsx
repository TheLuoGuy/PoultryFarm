import React, { useState } from "react";
import { Calendar as CalendarIcon, Filter } from "lucide-react";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface FilterControlsProps {
  onFilterChange?: (filters: {
    dateRange: DateRange | undefined;
    coup: string;
    birdType: string;
  }) => void;
}

const FilterControls = ({ onFilterChange }: FilterControlsProps = {}) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });

  const [coup, setCoup] = useState<string>("all");
  const [birdType, setBirdType] = useState<string>("all");

  // Apply filters when any filter changes
  const applyFilters = () => {
    if (onFilterChange) {
      onFilterChange({
        dateRange,
        coup,
        birdType,
      });
    }
  };

  // Handle date range change
  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    if (range?.from) {
      setTimeout(applyFilters, 0);
    }
  };

  // Handle coup selection change
  const handleCoupChange = (value: string) => {
    setCoup(value);
    setTimeout(applyFilters, 0);
  };

  // Handle bird type selection change
  const handleBirdTypeChange = (value: string) => {
    setBirdType(value);
    setTimeout(applyFilters, 0);
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <h3 className="text-sm font-medium">Filter Dashboard</h3>
        </div>

        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
          {/* Date Range Picker */}
          <div className="w-full sm:w-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "MMM dd, yyyy")} -{" "}
                        {format(dateRange.to, "MMM dd, yyyy")}
                      </>
                    ) : (
                      format(dateRange.from, "MMM dd, yyyy")
                    )
                  ) : (
                    <span>Select date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={handleDateRangeChange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Coup Selector */}
          <div className="w-full sm:w-[180px]">
            <Select value={coup} onValueChange={handleCoupChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Coup" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Coups</SelectItem>
                <SelectItem value="coup-1">Coup 1</SelectItem>
                <SelectItem value="coup-2">Coup 2</SelectItem>
                <SelectItem value="coup-3">Coup 3</SelectItem>
                <SelectItem value="coup-4">Coup 4</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bird Type Selector */}
          <div className="w-full sm:w-[180px]">
            <Select value={birdType} onValueChange={handleBirdTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Bird Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Birds</SelectItem>
                <SelectItem value="layers">Layers</SelectItem>
                <SelectItem value="broilers">Broilers</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reset Filters Button */}
          <Button
            variant="outline"
            size="sm"
            className="w-full sm:w-auto"
            onClick={() => {
              setDateRange({
                from: new Date(new Date().setDate(new Date().getDate() - 30)),
                to: new Date(),
              });
              setCoup("all");
              setBirdType("all");
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

export default FilterControls;
