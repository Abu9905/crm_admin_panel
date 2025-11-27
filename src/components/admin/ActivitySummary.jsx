export default function ActivitySummary() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Activity summary
      </h2>
      <div className="space-y-3">
        <div className="bg-white dark:bg-gray-700 border rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500 mb-2">Active user</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
        </div>
        <div className="bg-white dark:bg-gray-700 border rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500 mb-2">Last invoice</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">$128K</p>
        </div>
      </div>
    </div>
  );
}

