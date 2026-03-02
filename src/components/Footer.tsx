import React from 'react';

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateToBooking: () => void;
  onNavigateToAbout: () => void;
  onNavigateToContact: () => void;
  onNavigateToLogin: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigateHome, onNavigateToBooking, onNavigateToAbout, onNavigateToContact, onNavigateToLogin }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="https://wasap.my/+60166327901" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <span className="sr-only">WhatsApp</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.06 22L7.31 20.62C8.75 21.41 10.36 21.86 12.04 21.86C17.5 21.86 21.95 17.41 21.95 11.95C21.95 6.49 17.5 2 12.04 2M12.04 20.13C10.56 20.13 9.12 19.71 7.89 18.93L7.53 18.72L4.35 19.65L5.3 16.54L5.07 16.17C4.21 14.86 3.77 13.38 3.77 11.85C3.77 7.39 7.49 3.67 12.04 3.67C16.59 3.67 20.31 7.39 20.31 11.85C20.31 16.31 16.6 20.13 12.04 20.13M17.44 14.59C17.24 14.59 16.03 13.98 15.83 13.9C15.63 13.82 15.5 13.78 15.38 14C15.25 14.22 14.79 14.73 14.63 14.89C14.46 15.04 14.3 15.06 14.04 14.98C13.79 14.9 12.85 14.59 11.75 13.63C10.89 12.89 10.32 12.08 10.19 11.85C10.07 11.63 10.18 11.51 10.31 11.39C10.42 11.29 10.56 11.12 10.69 10.97C10.81 10.82 10.86 10.7 10.98 10.48C11.1 10.26 11.02 10.08 10.94 9.93C10.86 9.77 10.3 8.56 10.09 8.09C9.88 7.63 9.68 7.69 9.53 7.69C9.4 7.69 9.24 7.69 9.08 7.69C8.92 7.69 8.65 7.77 8.43 7.97C8.2 8.17 7.69 8.63 7.69 9.73C7.69 10.83 9.1 12.21 9.22 12.37C9.34 12.53 11.42 15.81 14.54 17.21C15.35 17.58 16 17.75 16.48 17.73C17.06 17.71 17.89 17.15 18.09 16.5C18.29 15.85 18.29 15.31 18.21 15.23C18.13 15.15 17.98 15.08 17.82 15C17.66 14.91 17.76 14.59 17.44 14.59Z" />
              </svg>
            </a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">&copy; {currentYear} Berkat Maju Canopy Enterprise (CA0035524-M). All Rights Reserved.</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-center">
          <div className="flex space-x-6 justify-center">
            <button onClick={onNavigateHome} className="text-base text-gray-400 hover:text-white">Home</button>
            <button onClick={onNavigateToBooking} className="text-base text-gray-400 hover:text-white">Book Now</button>
            <button onClick={onNavigateToAbout} className="text-base text-gray-400 hover:text-white">About</button>
            <button onClick={onNavigateToContact} className="text-base text-gray-400 hover:text-white">Contact</button>
            <button onClick={onNavigateToLogin} className="text-base text-gray-400 hover:text-white">Admin Login</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
