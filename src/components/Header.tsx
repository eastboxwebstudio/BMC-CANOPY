import React, { useState } from 'react';

interface HeaderProps {
  activeView: string;
  onNavigateHome: () => void;
  onNavigateToBooking: () => void;
  onNavigateToAbout: () => void;
  onNavigateToContact: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeView, onNavigateHome, onNavigateToBooking, onNavigateToAbout, onNavigateToContact }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const linkClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const inactiveClasses = "text-gray-600 hover:text-emerald-600";
  const activeClasses = "text-emerald-600 font-semibold";

  const mobileLinkClasses = "block px-3 py-2 rounded-md text-base font-medium";
  const mobileInactiveClasses = "text-gray-700 hover:text-white hover:bg-emerald-600";
  const mobileActiveClasses = "bg-emerald-700 text-white";

  const handleMobileLinkClick = (navigationFunction: () => void) => {
    navigationFunction();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <button onClick={() => handleMobileLinkClick(onNavigateHome)} className="text-2xl font-bold text-emerald-600">
              BMC Canopy
            </button>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button onClick={onNavigateHome} className={`${linkClasses} ${activeView === 'home' ? activeClasses : inactiveClasses}`}>Home</button>
              <button onClick={onNavigateToBooking} className={`${linkClasses} ${activeView === 'booking' ? activeClasses : inactiveClasses}`}>Book Now</button>
              <button onClick={onNavigateToAbout} className={`${linkClasses} ${activeView === 'about' ? activeClasses : inactiveClasses}`}>About</button>
              <button onClick={onNavigateToContact} className={`${linkClasses} ${activeView === 'contact' ? activeClasses : inactiveClasses}`}>Contact</button>
            </div>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu, show/hide based on menu state. */}
      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button onClick={() => handleMobileLinkClick(onNavigateHome)} className={`w-full text-left ${mobileLinkClasses} ${activeView === 'home' ? mobileActiveClasses : mobileInactiveClasses}`}>Home</button>
            <button onClick={() => handleMobileLinkClick(onNavigateToBooking)} className={`w-full text-left ${mobileLinkClasses} ${activeView === 'booking' ? mobileActiveClasses : mobileInactiveClasses}`}>Book Now</button>
            <button onClick={() => handleMobileLinkClick(onNavigateToAbout)} className={`w-full text-left ${mobileLinkClasses} ${activeView === 'about' ? mobileActiveClasses : mobileInactiveClasses}`}>About</button>
            <button onClick={() => handleMobileLinkClick(onNavigateToContact)} className={`w-full text-left ${mobileLinkClasses} ${activeView === 'contact' ? mobileActiveClasses : mobileInactiveClasses}`}>Contact</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
