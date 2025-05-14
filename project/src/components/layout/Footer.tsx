import React from 'react';
import { MapPin, Mail, Github as GitHub } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-4">
              <MapPin className="h-6 w-6 text-blue-400 mr-2" />
              <h3 className="text-xl font-bold">ToiletMapSL</h3>
            </div>
            <p className="text-gray-300 max-w-md">
              Helping locals and tourists in Sri Lanka find clean and accessible public toilets through community-driven mapping and reviews.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-300 hover:text-white transition">Home</a></li>
                <li><a href="/add" className="text-gray-300 hover:text-white transition">Add Location</a></li>
                <li><a href="/login" className="text-gray-300 hover:text-white transition">Login</a></li>
                <li><a href="/register" className="text-gray-300 hover:text-white transition">Register</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <a href="mailto:info@toiletmapsl.com" className="text-gray-300 hover:text-white transition">info@toiletmapsl.com</a>
                </li>
                <li className="flex items-center">
                  <GitHub className="h-4 w-4 mr-2" />
                  <a href="https://github.com/toiletmapsl" className="text-gray-300 hover:text-white transition">GitHub</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center md:text-left">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} ToiletMapSL. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;