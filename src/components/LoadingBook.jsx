import loadingGif from "../assets/loading.gif";

const LoadingBook = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-4 w-full bg-white">
      <img
        src={loadingGif}
        alt="Loading library..."
        className="w-50 h-50 object-contain"
      />

      <div className="text-center space-y-1">
        <p className="text-sm font-semibold text-blue-900 tracking-wide animate-pulse">
          Loading library shelves...
        </p>
        <p className="text-xs text-gray-400">Please wait a moment</p>
      </div>
    </div>
  );
};

export default LoadingBook;
