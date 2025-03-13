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
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface MortalityData {
  coup: string;
  rate: number;
  count: number;
}

interface MortalityChartProps {
  data?: MortalityData[];
  title?: string;
  description?: string;
}

const MortalityChart = ({
  data = [
    { coup: "Coup A", rate: 2.3, count: 5 },
    { coup: "Coup B", rate: 1.8, count: 3 },
    { coup: "Coup C", rate: 3.2, count: 7 },
    { coup: "Coup D", rate: 0.9, count: 2 },
    { coup: "Coup E", rate: 1.5, count: 4 },
  ],
  title = "Mortality Rates",
  description = "Bird mortality rates by coup",
}: MortalityChartProps) => {
  const [viewMode, setViewMode] = useState<"rate" | "count">("rate");

  return (
    <Card className="w-full h-full bg-white shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <Select
            defaultValue={viewMode}
            onValueChange={(value) => setViewMode(value as "rate" | "count")}
          >
            <SelectTrigger className="w-[120px] h-8">
              <SelectValue placeholder="View mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rate">Rate (%)</SelectItem>
              <SelectItem value="count">Count</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="coup" />
              <YAxis />
              <Tooltip
                formatter={(value) => [
                  viewMode === "rate" ? `${value}%` : value,
                  viewMode === "rate" ? "Mortality Rate" : "Mortality Count",
                ]}
              />
              <Legend />
              <Bar
                dataKey={viewMode === "rate" ? "rate" : "count"}
                name={
                  viewMode === "rate" ? "Mortality Rate (%)" : "Mortality Count"
                }
                fill="#ef4444"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MortalityChart;
