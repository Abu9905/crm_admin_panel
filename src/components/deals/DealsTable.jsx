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
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
      <table className="min-w-[800px] w-full border border-gray-200 dark:border-gray-700">
        {/* Table Head */}
        <thead>
          <tr className="bg-gradient-to-r from-green-300 to-green-200 dark:from-green-700 dark:to-green-600 text-left text-gray-700 dark:text-gray-200">
            <th className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold whitespace-nowrap">Lead Id</th>
            <th className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold whitespace-nowrap">Name</th>
            <th className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold whitespace-nowrap">Mobile number</th>
            <th className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold whitespace-nowrap">Email Id</th>
            <th className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold whitespace-nowrap">Source</th>
            <th className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold whitespace-nowrap">Status</th>
            <th className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold whitespace-nowrap">Location</th>
            <th className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold whitespace-nowrap">Lead owner</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="bg-white dark:bg-gray-900">
          {deals.map((deal) => (
            <tr
              key={deal.id}
              className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              {/* Lead Id */}
              <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium">
                <Link
                  to={`/layout/lead-management/deals/${deal.id}`}
                  state={{ deal }}
                  className="cursor-pointer hover:underline"
                >
                  #{deal.id}
                </Link>
              </td>
              {/* Name */}
              <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium">
                <Link
                  to={`/layout/lead-management/deals/${deal.id}`}
                  state={{ deal }}
                  className="cursor-pointer hover:underline"
                >
                  {deal.name}
                </Link>
              </td>
              <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300">{deal.mobile}</td>
              <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300 break-all">{deal.email}</td>
              <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300">{deal.source}</td>
              <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-green-600 dark:text-green-400">
                {deal.status}
              </td>
              <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                {deal.location}
              </td>
              <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300">{deal.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DealsTable;
