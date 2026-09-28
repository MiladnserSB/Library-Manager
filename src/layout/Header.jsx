import { Link } from "react-router-dom"; // Essential for routing loops

const Header = () => {
  return (
    <header className="bg-blue-900 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-10 h-16">
          {/* Logo Group */}
          <div className="shrink-0 flex items-center gap-2">
            <span className="text-xl font-bold text-white tracking-wide">
              Library<span className="text-orange-500">Manager</span>
            </span>
          </div>

          <div className="flex space-x-4">
            <Link
              to="/"
              className="text-white hover:text-orange-400 hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Books
            </Link>
            <Link
              to="/authors"
              className="text-white hover:text-orange-400 hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Authors
            </Link>
            <Link
              to="/borrows"
              className="text-white hover:text-orange-400 hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Borrows
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
