import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    // Animate navbar items on mount
    gsap.from('.nav-item', {
      duration: 1,
      y: -15,
      opacity: 0,
      stagger: 0.08,
      ease: 'power2.out',
      delay: 0.1
    });

    // Animate menu items on hover
    const menuButtons = document.querySelectorAll('.nav-link');
    menuButtons.forEach((btn) => {
      btn.addEventListener('mouseenter', function () {
        gsap.to(this, {
          duration: 0.3,
          y: -3,
          ease: 'power2.out'
        });
      });
      btn.addEventListener('mouseleave', function () {
        gsap.to(this, {
          duration: 0.3,
          y: 0,
          ease: 'power2.out'
        });
      });
    });
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (menuButtonRef.current) {
      gsap.to(menuButtonRef.current, {
        duration: 0.4,
        rotate: isMobileMenuOpen ? 0 : 90,
        ease: 'power2.out'
      });
    }
  };

  return (
    <nav className="fixed w-full top-0 z-[999] bg-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 border-b border-black/5">
          {/* Logo - Left Side */}
          <div className="nav-item text-2xl font-bold text-black cursor-pointer hover:text-gray-700 transition-colors duration-300">
            Logo
          </div>

          {/* Desktop Menu - Right Side */}
          <div className="hidden md:flex items-center space-x-1">
            {['Home', 'About', 'Portfolio', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="nav-link relative px-4 py-2 text-black font-medium text-sm uppercase tracking-wide transition-colors duration-300 group"
              >
                {item}
                <span className="absolute bottom-1 left-4 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-6"></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            onClick={toggleMobileMenu}
            className="md:hidden text-black focus:outline-none transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-transparent backdrop-blur-sm border-b border-black/5 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="px-4 py-4 space-y-2">
            {['Home', 'About', 'Portfolio', 'Contact'].map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="nav-link block w-full text-left px-4 py-3 text-black hover:bg-black/5 rounded-lg transition-all duration-300 font-medium text-sm uppercase tracking-wide"
                style={{
                  animation: isMobileMenuOpen ? `slideIn 0.3s ease-out ${index * 0.05}s both` : 'none'
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
