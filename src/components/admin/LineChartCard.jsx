import { useMemo } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";
import Card from "./Card";

const generateData = (days) => {
  return Array.from({ length: days }, (_, i) => ({
    day: `Day ${i + 1}`,
    value: Math.floor(Math.random() * 35) + 5,
  }));
};

export default function LineChartCard({ graphType, timePeriod, onGraphTypeChange, onTimePeriodChange }) {
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
          <Bar dataKey="value" fill="#4A90E2" radius={[8, 8, 0, 0]} />
        </BarChart>
      );
    }
    
    return (
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="day" hide />
        <YAxis hide />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#4A90E2" strokeWidth={3} dot={false} />
      </LineChart>
    );
  };

  return (
    <Card 
      title="Report Overview" 
      graphType={graphType}
      timePeriod={timePeriod}
      onGraphTypeChange={onGraphTypeChange}
      onTimePeriodChange={onTimePeriodChange}
    >
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-3xl font-bold text-blue-600">245</p>
          <p className="text-xs text-gray-500 mt-1">Total Reports</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-gray-600 dark:text-gray-400">87%</p>
          <p className="text-xs text-gray-500 mt-1">Completion</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-blue-600">12</p>
          <p className="text-xs text-gray-500 mt-1">New</p>
        </div>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-gray-500 text-center mt-2">Reports Generated</p>
    </Card>
  );
}

