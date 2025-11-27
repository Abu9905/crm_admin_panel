import { useMemo } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";
import Card from "./Card";

const barData = [
  { stage: "Leads", total: 450 },
  { stage: "Qualified", total: 350 },
  { stage: "Proposal", total: 220 },
  { stage: "Negotiation", total: 80 },
  { stage: "Converted", total: 50 },
];

const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#A569BD"];

const generateLineData = (days) => {
  return Array.from({ length: days }, (_, i) => ({
    day: `Day ${i + 1}`,
    value: Math.floor(Math.random() * 35) + 5,
  }));
};

export default function LeadsFunnelCard({ graphType, timePeriod, onGraphTypeChange, onTimePeriodChange }) {
  const days = useMemo(() => {
    if (timePeriod === "7 Days") return 7;
    if (timePeriod === "90 Days") return 90;
    return 30;
  }, [timePeriod]);

  const lineData = useMemo(() => generateLineData(days), [days]);

  const renderLeftChart = () => {
    if (graphType === "Bar Graph") {
      return (
        <BarChart data={lineData}>
          <CartesianGrid vertical={false} stroke="#e5e7eb" />
          <XAxis dataKey="day" hide />
          <YAxis hide />
          <Tooltip />
          <Bar dataKey="value" fill="#4A90E2" radius={[8, 8, 0, 0]} />
        </BarChart>
      );
    }

    return (
      <LineChart data={lineData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="day" hide />
        <YAxis hide />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#4A90E2" strokeWidth={2} dot={false} />
      </LineChart>
    );
  };

  const renderRightChart = () => {
    if (graphType === "Line Graph") {
      const lineDataForBar = barData.map(item => ({
        stage: item.stage,
        value: item.total,
      }));
      return (
        <LineChart data={lineDataForBar}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="stage" tick={{ fill: "#9ca3af", fontSize: 10 }} tickLine={false} axisLine={false} />
          <YAxis hide />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#4A90E2" strokeWidth={2} dot={false} />
        </LineChart>
      );
    }

    return (
      <BarChart data={barData}>
        <CartesianGrid vertical={false} stroke="#e5e7eb" />
        <XAxis dataKey="stage" tick={{ fill: "#9ca3af", fontSize: 10 }} tickLine={false} axisLine={false} />
        <YAxis hide />
        <Tooltip />
        <Bar dataKey="total" radius={[8, 8, 0, 0]}>
          {barData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    );
  };

  return (
    <Card 
      title="Leads Funnel"
      graphType={graphType}
      timePeriod={timePeriod}
      onGraphTypeChange={onGraphTypeChange}
      onTimePeriodChange={onTimePeriodChange}
      graphTypeOptions={["Bar Graph", "Line Graph"]}
    >
      <div className="grid grid-cols-5 gap-4 mb-4">
        <div>
          <p className="text-2xl font-bold text-green-600">5.2K</p>
          <p className="text-xs text-gray-500 mt-1">Leads</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-yellow-600">1000</p>
          <p className="text-xs text-gray-500 mt-1">Qualified</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">77</p>
          <p className="text-xs text-gray-500 mt-1">Proposal</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">55</p>
          <p className="text-xs text-gray-500 mt-1">Negotiation</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-purple-600">85</p>
          <p className="text-xs text-gray-500 mt-1">Converted</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            {renderLeftChart()}
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 text-center mt-2">Reports Generated</p>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            {renderRightChart()}
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 text-center mt-2">Lead Funnel</p>
        </div>
      </div>
    </Card>
  );
}

