import React from 'react';
import Link from 'next/link';
import { GraduationCap, Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary p-1.5 rounded-md">
                <GraduationCap className="text-white w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold leading-none">Achieve Smart</span>
                <span className="text-xs text-gray-400 tracking-wider">ACADEMY</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering students with quality education, concept clarity, and personalized attention for over 18 years. Join us to achieve academic excellence.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/director" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  About Director
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Our Courses
                </Link>
              </li>
              <li>
                <Link href="/results" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Toppers & Results
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Gallery & Events
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2 inline-block">Our Courses</h3>
            <ul className="space-y-3">
              <li className="text-gray-400 text-sm">Mathematics (Class 6-10)</li>
              <li className="text-gray-400 text-sm">Mathematics (Class 11-12)</li>
              <li className="text-gray-400 text-sm">Competitive Mathematics</li>
              <li className="text-gray-400 text-sm">Board Exam Preparation</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-gray-700 pb-2 inline-block">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400 text-sm">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>123, Education Street, Sector 15, Noida, UP - 201301</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 text-sm">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 text-sm">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span>info@achievesmartacademy.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Achieve Smart Academy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
