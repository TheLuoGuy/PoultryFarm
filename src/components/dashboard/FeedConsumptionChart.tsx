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
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface FeedConsumptionData {
  date: string;
  amount: number;
  coup: string;
}

interface FeedConsumptionChartProps {
  data?: FeedConsumptionData[];
  title?: string;
  description?: string;
}

const FeedConsumptionChart = ({
  data = [
    { date: "2023-01-01", amount: 50, coup: "Coup A" },
    { date: "2023-01-02", amount: 55, coup: "Coup A" },
    { date: "2023-01-03", amount: 60, coup: "Coup A" },
    { date: "2023-01-04", amount: 58, coup: "Coup A" },
    { date: "2023-01-05", amount: 62, coup: "Coup A" },
    { date: "2023-01-06", amount: 65, coup: "Coup A" },
    { date: "2023-01-07", amount: 63, coup: "Coup A" },
    { date: "2023-01-01", amount: 40, coup: "Coup B" },
    { date: "2023-01-02", amount: 45, coup: "Coup B" },
    { date: "2023-01-03", amount: 48, coup: "Coup B" },
    { date: "2023-01-04", amount: 50, coup: "Coup B" },
    { date: "2023-01-05", amount: 52, coup: "Coup B" },
    { date: "2023-01-06", amount: 55, coup: "Coup B" },
    { date: "2023-01-07", amount: 53, coup: "Coup B" },
    { date: "2023-01-01", amount: 30, coup: "Coup C" },
    { date: "2023-01-02", amount: 32, coup: "Coup C" },
    { date: "2023-01-03", amount: 35, coup: "Coup C" },
    { date: "2023-01-04", amount: 38, coup: "Coup C" },
    { date: "2023-01-05", amount: 40, coup: "Coup C" },
    { date: "2023-01-06", amount: 42, coup: "Coup C" },
    { date: "2023-01-07", amount: 45, coup: "Coup C" },
  ],
  title = "Feed Consumption",
  description = "Daily feed consumption by coup in kg",
}: FeedConsumptionChartProps) => {
  const [selectedView, setSelectedView] = useState<
    "daily" | "weekly" | "monthly"
  >("daily");

  // Get unique coups from data
  const coups = [...new Set(data.map((item) => item.coup))];

  // Colors for different coups
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c"];

  return (
    <Card className="w-full h-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Select
          value={selectedView}
          onValueChange={(value) =>
            setSelectedView(value as "daily" | "weekly" | "monthly")
          }
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="View" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="date" />
              <YAxis
                label={{
                  value: "Feed (kg)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Legend />
              {coups.map((coup, index) => (
                <Area
                  key={coup}
                  type="monotone"
                  dataKey="amount"
                  name={coup}
                  data={data.filter((item) => item.coup === coup)}
                  stroke={colors[index % colors.length]}
                  fill={colors[index % colors.length]}
                  fillOpacity={0.3}
                  stackId="1"
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedConsumptionChart;
