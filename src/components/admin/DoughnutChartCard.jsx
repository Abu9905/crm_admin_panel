import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import Card from "./Card";

const pieData = [
  { name: "Website", value: 30 },
  { name: "Social Media", value: 25 },
  { name: "Referral", value: 20 },
  { name: "Direct", value: 15 },
  { name: "Other", value: 10 },
];

const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#A569BD"];

export default function DoughnutChartCard({ graphType, timePeriod, onGraphTypeChange, onTimePeriodChange }) {
  const renderChart = () => {
    if (graphType === "Bar Graph" || graphType === "Line Graph") {
      return (
        <BarChart data={pieData}>
          <CartesianGrid vertical={false} stroke="#e5e7eb" />
          <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 10 }} tickLine={false} axisLine={false} />
          <YAxis hide />
          <Tooltip />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {pieData.map((entry, i) => (
              <Cell key={i} fill={colors[i]} />
            ))}
          </Bar>
        </BarChart>
      );
    }

    const innerRadius = graphType === "Doughnut" ? 40 : 0;
    
    return (
      <PieChart>
        <Pie
          data={pieData}
          dataKey="value"
          innerRadius={innerRadius}
          outerRadius={70}
          paddingAngle={3}
        >
          {pieData.map((entry, i) => (
            <Cell key={i} fill={colors[i]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    );
  };

  return (
    <Card 
      title="Lead Overview"
      graphType={graphType}
      timePeriod={timePeriod}
      onGraphTypeChange={onGraphTypeChange}
      onTimePeriodChange={onTimePeriodChange}
    >
      <div className="grid grid-cols-3 text-center mb-3">
        <div>
          <p className="text-3xl font-bold text-purple-600">158</p>
          <p className="text-xs text-gray-500 mt-1">Total Leads</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-purple-600">158</p>
          <p className="text-xs text-gray-500 mt-1">Conversion</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-purple-600">158</p>
          <p className="text-xs text-gray-500 mt-1">New Leads</p>
        </div>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap gap-3 mt-4 justify-center">
        {pieData.map((source, index) => (
          <div key={source.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[index] }}
            />
            <span className="text-xs text-gray-600 dark:text-gray-400">{source.name}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

