const SourceInfoCard = () => {
  return (
    <div className="bg-blue-100 rounded-lg shadow p-4 w-[12vw] h-fit max-w-sm">
      {/* Title */}
      <h3 className="text-gray-800 font-semibold text-sm mb-4">
        Source Info
      </h3>

      {/* Lead Source */}
      <div className="mb-3">
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Lead Source
        </label>
        <input
          type="text"
          value="Google Ad"
          readOnly
          className="w-full rounded-md border border-gray-200 bg-white px-2 py-1 text-sm shadow-sm focus:outline-none"
        />
      </div>

      {/* Campaign Term */}
      <div className="mb-3">
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Campaign Term
        </label>
        <input
          type="text"
          value="Aug_Campaign"
          readOnly
          className="w-full rounded-md border border-gray-200 bg-white px-2 py-1 text-sm shadow-sm focus:outline-none"
        />
      </div>

      {/* Lead Date */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Lead Date
        </label>
        <input
          type="text"
          value="31-Jul-2024"
          readOnly
          className="w-full rounded-md border border-gray-200 bg-white px-2 py-1 text-sm shadow-sm focus:outline-none"
        />
      </div>
    </div>
  );
};

export default SourceInfoCard;
