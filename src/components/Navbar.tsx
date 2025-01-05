import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Admin", path: "/admin" },
    { name: "Profile", path: "/profile", icon: <User className="h-4 w-4" /> },
  ];

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              Soundmaster
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-700 hover:text-primary transition-colors duration-200 flex items-center gap-2"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            <Button
              onClick={() => navigate('/live-lesson')}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <Video className="h-4 w-4" />
              Lesson Live
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-primary transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            <Button
              onClick={() => {
                navigate('/live-lesson');
                setIsOpen(false);
              }}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center"
            >
              <Video className="h-4 w-4" />
              Lesson Live
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;