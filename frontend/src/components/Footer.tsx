import { Compass, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Compass className="w-8 h-8 text-primary-400" />
              <span className="text-2xl font-bold text-white">BookIt</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Discover and book amazing experiences across India. From adventure sports to cultural tours, find your next unforgettable journey with us.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-primary-400 transition-colors">
                  Experiences
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-primary-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-primary-400 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-primary-400 transition-colors">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Mail className="w-5 h-5 text-primary-400 mt-0.5" />
                <span className="text-sm">support@bookit.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="w-5 h-5 text-primary-400 mt-0.5" />
                <span className="text-sm">+91 1234567890</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-primary-400 mt-0.5" />
                <span className="text-sm">Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} BookIt. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
