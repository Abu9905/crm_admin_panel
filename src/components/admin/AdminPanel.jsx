import { useState } from "react";
import LineChartCard from "./LineChartCard";
import DoughnutChartCard from "./DoughnutChartCard";
import BarChartCard from "./BarChartCard";
import SalesForecastCard from "./SalesForecastCard";
import LeadsFunnelCard from "./LeadsFunnelCard";
import ActivitySummary from "./ActivitySummary";
import ContactUs from "./ContactUs";

export default function AdminPanel() {
  const [graphTypes, setGraphTypes] = useState({
    report: "Line Graph",
    lead: "Doughnut",
    sales: "Line Graph",
    market: "Bar Graph",
    funnel: "Bar Graph",
  });
  const [timePeriod, setTimePeriod] = useState("30 Days");

  const handleGraphTypeChange = (section, value) => {
    setGraphTypes((prev) => ({ ...prev, [section]: value }));
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 w-full max-w-[1920px] mx-auto">
        {/* Main Content Area */}
        <div className="flex-1 space-y-4 sm:space-y-6">
          {/* Top Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <LineChartCard
              graphType={graphTypes.report}
              timePeriod={timePeriod}
              onGraphTypeChange={(value) => handleGraphTypeChange("report", value)}
              onTimePeriodChange={setTimePeriod}
            />
            <DoughnutChartCard
              graphType={graphTypes.lead}
              timePeriod={timePeriod}
              onGraphTypeChange={(value) => handleGraphTypeChange("lead", value)}
              onTimePeriodChange={setTimePeriod}
            />
          </div>

          {/* Middle Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <SalesForecastCard
              graphType={graphTypes.sales}
              timePeriod={timePeriod}
              onGraphTypeChange={(value) => handleGraphTypeChange("sales", value)}
              onTimePeriodChange={setTimePeriod}
            />
            <BarChartCard
              graphType={graphTypes.market}
              timePeriod={timePeriod}
              onGraphTypeChange={(value) => handleGraphTypeChange("market", value)}
              onTimePeriodChange={setTimePeriod}
            />
          </div>

          {/* Bottom Row */}
          <div>
            <LeadsFunnelCard
              graphType={graphTypes.funnel}
              timePeriod={timePeriod}
              onGraphTypeChange={(value) => handleGraphTypeChange("funnel", value)}
              onTimePeriodChange={setTimePeriod}
            />
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="w-full xl:w-80 space-y-4 sm:space-y-6">
          <ActivitySummary />
          <ContactUs />
        </aside>
      </div>
    </div>
  );
}
