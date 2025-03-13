import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ProductionChartProps {
  data?: Array<{
    date: string;
    production: number;
    target: number;
  }>;
  title?: string;
  coup?: string;
  timeRange?: string;
}

const ProductionChart = ({
  data = [
    { date: "01/01", production: 120, target: 100 },
    { date: "02/01", production: 130, target: 100 },
    { date: "03/01", production: 125, target: 100 },
    { date: "04/01", production: 140, target: 100 },
    { date: "05/01", production: 135, target: 100 },
    { date: "06/01", production: 150, target: 100 },
    { date: "07/01", production: 145, target: 100 },
    { date: "08/01", production: 160, target: 100 },
    { date: "09/01", production: 155, target: 100 },
    { date: "10/01", production: 170, target: 100 },
  ],
  title = "Egg Production Trends",
  coup = "All Coups",
  timeRange = "Last 10 Days",
}: ProductionChartProps) => {
  const [selectedCoup, setSelectedCoup] = useState(coup);
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange);

  return (
    <Card className="w-full h-full bg-white shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold text-gray-800">
            {title}
          </CardTitle>
          <div className="flex space-x-2">
            <Select value={selectedCoup} onValueChange={setSelectedCoup}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select Coup" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Coups">All Coups</SelectItem>
                <SelectItem value="Coup A">Coup A</SelectItem>
                <SelectItem value="Coup B">Coup B</SelectItem>
                <SelectItem value="Coup C">Coup C</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={selectedTimeRange}
              onValueChange={setSelectedTimeRange}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Select Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Last 7 Days">Last 7 Days</SelectItem>
                <SelectItem value="Last 10 Days">Last 10 Days</SelectItem>
                <SelectItem value="Last 30 Days">Last 30 Days</SelectItem>
                <SelectItem value="Last 90 Days">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                }}
                labelStyle={{ fontWeight: "bold", color: "#1f2937" }}
              />
              <Legend wrapperStyle={{ paddingTop: "10px" }} />
              <Line
                type="monotone"
                dataKey="production"
                stroke="#0ea5e9"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                name="Actual Production"
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="#f59e0b"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 4 }}
                name="Target Production"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-sm text-gray-500 text-center">
          Showing egg production data for {selectedCoup} over{" "}
          {selectedTimeRange}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductionChart;
