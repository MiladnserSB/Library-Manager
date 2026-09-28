
const CustomModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md z-10 overflow-hidden">
        {/* Dynamic Header with Close Button */}
        <div className="px-6 py-4 border-b border-gray-300 flex justify-between items-center font-bold text-gray-800">
          <span>{title}</span>
          
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Dynamic Body Slot */}
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;