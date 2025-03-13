import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowDown,
  ArrowUp,
  Bird,
  Egg,
  Utensils,
  AlertTriangle,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const MetricCard = ({
  title = "Metric",
  value = "0",
  icon = <Bird className="h-6 w-6" />,
  trend,
  className,
}: MetricCardProps) => {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="rounded-full bg-muted p-2">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className="flex items-center text-xs mt-1">
            {trend.isPositive ? (
              <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
            ) : (
              <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
            )}
            <span
              className={trend.isPositive ? "text-green-500" : "text-red-500"}
            >
              {trend.value}%
            </span>
            <span className="text-muted-foreground ml-1">from yesterday</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
};

interface MetricsOverviewProps {
  totalBirds?: number;
  eggProduction?: number;
  mortalityRate?: number;
  feedConsumption?: number;
  className?: string;
}

const MetricsOverview = ({
  totalBirds = 5280,
  eggProduction = 4350,
  mortalityRate = 0.5,
  feedConsumption = 450,
  className,
}: MetricsOverviewProps) => {
  return (
    <div
      className={cn(
        "grid gap-4 md:grid-cols-2 lg:grid-cols-4 bg-white",
        className,
      )}
    >
      <MetricCard
        title="Total Birds"
        value={totalBirds.toLocaleString()}
        icon={<Bird className="h-5 w-5 text-blue-600" />}
        trend={{ value: 2.5, isPositive: true }}
      />
      <MetricCard
        title="Egg Production Today"
        value={eggProduction.toLocaleString()}
        icon={<Egg className="h-5 w-5 text-yellow-500" />}
        trend={{ value: 3.2, isPositive: true }}
      />
      <MetricCard
        title="Mortality Rate"
        value={`${mortalityRate}%`}
        icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
        trend={{ value: 0.2, isPositive: false }}
      />
      <MetricCard
        title="Feed Consumption (kg)"
        value={feedConsumption.toLocaleString()}
        icon={<Utensils className="h-5 w-5 text-green-600" />}
        trend={{ value: 1.8, isPositive: false }}
      />
    </div>
  );
};

export default MetricsOverview;
