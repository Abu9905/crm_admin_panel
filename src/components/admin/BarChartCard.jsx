import { useMemo } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import Card from "./Card";

const baseData = [
  { name: "Google Ads", value: 32 },
  { name: "Facebook", value: 24 },
  { name: "Email", value: 18 },
  { name: "Organic", value: 13 },
  { name: "Direct", value: 8 },
];

const generateTimeBasedData = (days) => {
  const daysCount = days === "7 Days" ? 7 : days === "90 Days" ? 90 : 30;
  return Array.from({ length: daysCount }, (_, i) => ({
    day: `Day ${i + 1}`,
    value: Math.floor(Math.random() * 30) + 5,
  }));
};

export default function BarChartCard({ graphType, timePeriod, onGraphTypeChange, onTimePeriodChange }) {
  const data = useMemo(() => {
    if (graphType === "Line Graph") {
      return generateTimeBasedData(timePeriod);
    }
    return baseData;
  }, [graphType, timePeriod]);

  const renderChart = () => {
    if (graphType === "Line Graph") {
      return (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="day" hide />
          <YAxis hide />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#4CAF50" strokeWidth={3} dot={false} />
        </LineChart>
      );
    }

    return (
      <BarChart data={data}>
        <CartesianGrid vertical={false} stroke="#e5e7eb" />
        <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 10 }} tickLine={false} axisLine={false} />
        <YAxis hide />
        <Tooltip />
        <Bar dataKey="value" fill="#4CAF50" radius={[8, 8, 0, 0]} />
      </BarChart>
    );
  };

  return (
    <Card 
      title="Market Overview"
      graphType={graphType}
      timePeriod={timePeriod}
      onGraphTypeChange={onGraphTypeChange}
      onTimePeriodChange={onTimePeriodChange}
    >
      <div className="grid grid-cols-3 gap-4 mb-3 text-center">
        <div>
          <p className="text-2xl font-bold text-green-600">5.2K</p>
          <p className="text-xs text-gray-500 mt-1">Impression</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-green-600">3.8%</p>
          <p className="text-xs text-gray-500 mt-1">CTR</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-green-600">$2.14</p>
          <p className="text-xs text-gray-500 mt-1">CPC</p>
        </div>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-gray-500 text-center mt-2">Marketing Performance</p>
    </Card>
  );
}

