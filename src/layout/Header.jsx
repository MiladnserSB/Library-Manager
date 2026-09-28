import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  const navLinks = [
    { path: "/", label: "Books" },
    { path: "/authors", label: "Authors" },
    { path: "/borrows", label: "Borrows" },
  ];

  return (
    <header className="bg-blue-900 border-b border-blue-800/60 shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center cursor-pointer">
            <img
              src={logo}
              alt="Logo"
              className="h-22 w-auto object-contain brightness-150"
            />
          </Link>

          <div className="flex items-center space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-blue-800 text-amber-400 font-semibold shadow-inner"
                      : "text-blue-100 hover:text-white hover:bg-blue-800/50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
