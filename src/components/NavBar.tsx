import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.css";

interface NavbarProps {
  brandName: string;
  imageSrcPath: string;
  navItems: { name: string; path: string }[];
}

function Navbar({ brandName, imageSrcPath, navItems }: NavbarProps) {
  const [selectedIndex, setSelectedItem] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const currentIndex = navItems.findIndex(
      (item) => item.path === location.pathname
    );
    setSelectedItem(currentIndex);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.reload();
  };

  return isAuthenticated ? (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/home" className="flex items-center">
            <img
              src={imageSrcPath}
              width="40"
              height="40"
              className="h-10 w-10"
              alt="Logo"
            />
            <span className="ml-2 font-bold text-xl text-blue-600">
              {brandName}
            </span>
          </Link>

          <div className="hidden md:flex items-center">
            <div className="flex space-x-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => setSelectedItem(index)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    selectedIndex === index
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-500 hover:bg-blue-500 hover:text-gray-900"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <button
              onClick={handleLogout}
              className="bg-white text-gray-500 hover:bg-blue-500 hover:text-gray-900 p-2 rounded-md ml-4"
            >
              Çıkış Yap
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => {
                setSelectedItem(index);
                setIsOpen(false);
              }}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                selectedIndex === index
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  ) : null;
}

export default Navbar;
