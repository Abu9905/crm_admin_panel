export default function ContactUs() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Contact us
      </h2>
      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            +91-9686705904
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 break-words">
            Neamatullahmdmuslim@gmail.com
          </p>
        </div>
        <div className="space-y-2 pt-2">
          <button className="w-full bg-black text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
            <span className="text-sm font-semibold">GET IT ON</span>
            <span className="text-xs">Google Play</span>
          </button>
          <button className="w-full bg-black text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
            <span className="text-sm font-semibold">Download on the</span>
            <span className="text-xs">App Store</span>
          </button>
        </div>
        <div className="flex justify-end pt-2">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <span className="text-white text-sm">😊</span>
          </div>
        </div>
      </div>
    </div>
  );
}

