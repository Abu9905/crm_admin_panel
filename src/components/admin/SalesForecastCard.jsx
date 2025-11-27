import { useMemo } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import Card from "./Card";

const generateData = (days) => {
  // Generate data that shows an upward trend from ~$10K to ~$30K over the period
  return Array.from({ length: days }, (_, i) => {
    const baseValue = 10000;
    const trend = (i / (days - 1)) * 20000; // Linear trend from 0 to 20000
    const fluctuation = Math.sin(i * 0.3) * 3000; // Add some fluctuation
    return {
      day: `Day ${i + 1}`,
      value: Math.max(5000, Math.min(40000, baseValue + trend + fluctuation)),
    };
  });
};

export default function SalesForecastCard({ graphType, timePeriod, onGraphTypeChange, onTimePeriodChange }) {
  const days = useMemo(() => {
    if (timePeriod === "7 Days") return 7;
    if (timePeriod === "90 Days") return 90;
    return 30;
  }, [timePeriod]);

  const data = useMemo(() => generateData(days), [days]);

  const renderChart = () => {
    if (graphType === "Bar Graph") {
      return (
        <BarChart data={data}>
          <CartesianGrid vertical={false} stroke="#e5e7eb" />
          <XAxis dataKey="day" hide />
          <YAxis hide />
          <Tooltip />
          <Bar dataKey="value" fill="#ef4444" radius={[8, 8, 0, 0]} />
        </BarChart>
      );
    }

    return (
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis 
          dataKey="day" 
          tick={{ fill: "#9ca3af", fontSize: 10 }}
          tickLine={false}
          axisLine={false}
          angle={-45}
          textAnchor="end"
          height={60}
          interval={1}
          tickFormatter={(value, index) => {
            // Show every other day: Day 1, Day 3, Day 5, etc.
            const dayNum = parseInt(value.replace('Day ', ''));
            return dayNum % 2 === 1 ? value : '';
          }}
        />
        <YAxis 
          domain={[0, 40000]}
          tick={{ fill: "#9ca3af", fontSize: 10 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
        />
        <Tooltip 
          formatter={(value) => [`$${value.toLocaleString()}`, "Sales Forecast"]}
        />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#ef4444" 
          strokeWidth={2} 
          dot={{ r: 4, fill: "#ef4444" }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    );
  };

  return (
    <Card 
      title="Sales Forecasting"
      graphType={graphType}
      timePeriod={timePeriod}
      onGraphTypeChange={onGraphTypeChange}
      onTimePeriodChange={onTimePeriodChange}
    >
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-2xl font-bold text-red-600">$128K</p>
          <p className="text-xs text-gray-500 mt-1">Forecasted</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-red-600">$86K</p>
          <p className="text-xs text-gray-500 mt-1">Committed</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-red-600">72%</p>
          <p className="text-xs text-gray-500 mt-1">Accuracy</p>
        </div>
      </div>
      {/* Legend */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-4 h-3 bg-red-600 rounded"></div>
        <p className="text-xs text-gray-500">Sales Forecast</p>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

