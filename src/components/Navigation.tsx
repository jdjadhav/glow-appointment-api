
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Activity, Menu, X, Stethoscope } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">SkinCare Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-gray-600 hover:text-blue-600 transition-colors ${isActive('/') ? 'text-blue-600 font-semibold' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/news" 
              className={`text-gray-600 hover:text-blue-600 transition-colors ${isActive('/news') ? 'text-blue-600 font-semibold' : ''}`}
            >
              News
            </Link>
            <Link 
              to="/contact" 
              className={`text-gray-600 hover:text-blue-600 transition-colors ${isActive('/contact') ? 'text-blue-600 font-semibold' : ''}`}
            >
              Contact
            </Link>
            <Link 
              to="/about" 
              className={`text-gray-600 hover:text-blue-600 transition-colors ${isActive('/about') ? 'text-blue-600 font-semibold' : ''}`}
            >
              About
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-600 hover:text-blue-600 py-2">Home</Link>
              <Link to="/news" className="text-gray-600 hover:text-blue-600 py-2">News</Link>
              <Link to="/contact" className="text-gray-600 hover:text-blue-600 py-2">Contact</Link>
              <Link to="/about" className="text-gray-600 hover:text-blue-600 py-2">About</Link>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Link to="/login">
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
