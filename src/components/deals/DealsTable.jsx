import React from "react";
import { Link } from "react-router-dom";

const deals = [
  {
    id: "0001",
    name: "Neamatullah Meer",
    mobile: "7457863240",
    email: "Neamatullahmdmuslim3l@gmail.com",
    source: "Facebook",
    status: "New lead",
    location: "Mumbai",
    owner: "Ramij raj",
  },
  {
    id: "0002",
    name: "Neamatullah Meer",
    mobile: "7457863240",
    email: "Neamatullahmdmuslim3l@gmail.com",
    source: "Facebook",
    status: "Hot lead",
    location: "Mumbai",
    owner: "Ramij raj",
  },
  {
    id: "0003",
    name: "Neamatullah Meer",
    mobile: "7457863240",
    email: "Neamatullahmdmuslim3l@gmail.com",
    source: "Facebook",
    status: "Cold lead",
    location: "Mumbai",
    owner: "Ramij raj",
  },
  {
    id: "0004",
    name: "Adil",
    mobile: "7457863240",
    email: "adil@gmail.com",
    source: "Facebook",
    status: "Gold lead",
    location: "Mumbai",
    owner: "Ramij raj",
  },
  {
    id: "0005",
    name: "Neamatullah Meer",
    mobile: "7457863240",
    email: "Neamatullahmdmuslim3l@gmail.com",
    source: "Facebook",
    status: "Warm lead",
    location: "Mumbai",
    owner: "Ramij raj",
  },
];

const DealsTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 shadow-md rounded-lg">
        {/* Table Head */}
        <thead>
          <tr className="bg-gradient-to-r from-green-300 to-green-200 text-left text-gray-700">
            <th className="px-4 py-2 text-sm font-semibold">Lead Id</th>
            <th className="px-4 py-2 text-sm font-semibold">Name</th>
            <th className="px-4 py-2 text-sm font-semibold">Mobile number</th>
            <th className="px-4 py-2 text-sm font-semibold">Email Id</th>
            <th className="px-4 py-2 text-sm font-semibold">Source</th>
            <th className="px-4 py-2 text-sm font-semibold">Status</th>
            <th className="px-4 py-2 text-sm font-semibold">Location</th>
            <th className="px-4 py-2 text-sm font-semibold">Lead owner</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="bg-white">
          {deals.map((deal) => (
            <tr
              key={deal.id}
              className="border-b border-gray-200 hover:bg-gray-50 transition"
            >
              {/* Lead Id */}
              <td className="px-4 py-2 text-sm text-blue-600 font-medium">
                <Link
                  to={`/layout/lead-management/deals/${deal.id}`}
                  state={{ deal }}
                  className="cursor-pointer hover:underline"
                >
                  #{deal.id}
                </Link>
              </td>
              {/* Name */}
              <td className="px-4 py-2 text-sm text-blue-600 font-medium">
                <Link
                  to={`/layout/lead-management/deals/${deal.id}`}
                  state={{ deal }}
                  className="cursor-pointer hover:underline"
                >
                  {deal.name}
                </Link>
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">{deal.mobile}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{deal.email}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{deal.source}</td>
              <td className="px-4 py-2 text-sm font-medium text-green-600">
                {deal.status}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {deal.location}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">{deal.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DealsTable;
