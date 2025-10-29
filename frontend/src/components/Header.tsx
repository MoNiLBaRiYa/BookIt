import { Link, useLocation } from 'react-router-dom';
import { Compass, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-soft sticky top-0 z-50 border-b border-secondary-100">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-secondary-900 group-hover:text-primary-600 transition-colors">
              BookIt
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-semibold transition-colors px-4 py-2 rounded-xl ${
                location.pathname === '/' 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-secondary-700 hover:text-primary-600 hover:bg-secondary-50'
              }`}
            >
              Experiences
            </Link>
            <a
              href="#"
              className="text-sm font-semibold text-secondary-700 hover:text-primary-600 hover:bg-secondary-50 transition-colors px-4 py-2 rounded-xl"
            >
              About
            </a>
            <a
              href="#"
              className="text-sm font-semibold text-secondary-700 hover:text-primary-600 hover:bg-secondary-50 transition-colors px-4 py-2 rounded-xl"
            >
              Contact
            </a>
            <div className="btn-primary ml-4">
              Sign In
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-secondary-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-secondary-700" />
            ) : (
              <Menu className="w-6 h-6 text-secondary-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-2 border-t border-secondary-100">
            <Link
              to="/"
              className="block px-4 py-3 text-sm font-semibold text-secondary-700 hover:bg-secondary-50 rounded-xl transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Experiences
            </Link>
            <a
              href="#"
              className="block px-4 py-3 text-sm font-semibold text-secondary-700 hover:bg-secondary-50 rounded-xl transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="block px-4 py-3 text-sm font-semibold text-secondary-700 hover:bg-secondary-50 rounded-xl transition-colors"
            >
              Contact
            </a>
            <div className="pt-2">
              <div className="btn-primary w-full text-center">
                Sign In
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
