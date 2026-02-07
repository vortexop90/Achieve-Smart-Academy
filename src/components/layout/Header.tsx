"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Director', path: '/director' },
    { name: 'Courses', path: '/courses' },
    { name: 'Results', path: '/results' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Events', path: '/events' },
    { name: 'Updates', path: '/updates' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  // Determine header style based on scroll state and page
  // On Home page: Transparent at top (white text), Solid White on scroll (dark text)
  // On Other pages: Always Solid White (dark text) for consistency, or transparent if they also have hero images. 
  // Let's assume other pages have standard content padding, so we might need a placeholder or just keep it solid.
  // For simplicity and "modern" feel, let's apply the transparent effect primarily on Home, 
  // but if other pages don't have a hero image, transparent text might be invisible against white background.
  // So: If not Home, default to "scrolled" style (Solid White).
  
  const isTransparent = isHomePage && !isScrolled;
  
  const headerBgClass = isTransparent 
    ? 'bg-transparent shadow-none' 
    : 'bg-white shadow-md';
    
  const textColorClass = isTransparent 
    ? 'text-white hover:text-blue-200' 
    : 'text-gray-600 hover:text-primary';
    
  const logoTextClass = isTransparent ? 'text-white' : 'text-gray-800';
  const logoSubTextClass = isTransparent ? 'text-blue-200' : 'text-secondary';
  const logoIconBgClass = isTransparent ? 'bg-white/20 backdrop-blur-sm' : 'bg-primary';
  const logoIconColorClass = isTransparent ? 'text-white' : 'text-white';
  const mobileMenuButtonClass = isTransparent ? 'text-white' : 'text-gray-600';

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerBgClass}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className={`p-2 rounded-lg transition-colors duration-300 ${logoIconBgClass}`}>
              <GraduationCap className={`${logoIconColorClass} w-8 h-8`} />
            </div>
            <div>
              <h1 className={`text-2xl font-bold leading-none transition-colors duration-300 ${logoTextClass}`}>Achieve Smart</h1>
              <p className={`text-sm font-medium tracking-wider transition-colors duration-300 ${logoSubTextClass}`}>ACADEMY</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`text-base font-medium transition-colors duration-300 ${
                  pathname === item.path 
                    ? (isTransparent ? 'text-white font-bold' : 'text-primary font-bold') 
                    : textColorClass
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className={`px-6 py-2.5 rounded-full font-bold transition-all duration-300 shadow-lg transform hover:-translate-y-0.5 ${
                isTransparent 
                  ? 'bg-white text-primary hover:bg-blue-50' 
                  : 'bg-primary text-white hover:bg-blue-600'
              }`}
            >
              Enroll Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden hover:text-primary focus:outline-none transition-colors duration-300 ${mobileMenuButtonClass}`}
            onClick={toggleMenu}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden shadow-xl"
          >
            <nav className="flex flex-col p-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-medium py-2 border-b border-gray-50 last:border-0 ${
                    pathname === item.path ? 'text-primary' : 'text-gray-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="bg-primary text-center text-white py-3 rounded-lg font-medium shadow-md"
              >
                Enroll Now
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
