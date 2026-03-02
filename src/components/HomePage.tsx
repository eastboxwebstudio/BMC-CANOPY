import React from 'react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6">
    <div className="bg-emerald-100 text-emerald-600 rounded-full p-4 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

interface HomePageProps {
  onBookNowClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onBookNowClick }) => {
  return (
    <div className="bg-white">
      <div className="relative bg-gray-800">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Elegant event setup under a canopy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-60" aria-hidden="true"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">Your Perfect Event, Covered.</h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-200">
            From intimate gatherings to grand celebrations, BMC Canopy provides premium shelter solutions with style and simplicity.
          </p>
          <div className="mt-10">
            <button
              onClick={onBookNowClick}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-10 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Book Your Canopy Today
            </button>
          </div>
        </div>
      </div>
      <div className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Why Choose BMC Canopy?</h2>
            <p className="mt-4 text-lg text-gray-600">We make event planning easier and more elegant.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              title="Premium Quality"
              description="Our canopies are durable, stylish, and meticulously maintained to ensure your event looks its best, rain or shine."
            />
            <Feature
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>}
              title="Flexible Packages"
              description="Choose from curated packages or build your own setup 'Ala Carte'. Get exactly what you need, with no hidden costs."
            />
            <Feature
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}
              title="Effortless Booking"
              description="Our simple, step-by-step booking process lets you customize and confirm your rental in minutes, not hours."
            />
          </div>
        </div>
      </div>
      <div className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Book in 3 Simple Steps</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-20 h-20 bg-emerald-600 text-white rounded-full text-3xl font-bold mb-4">1</div>
              <h3 className="text-xl font-bold mb-2">Select & Customize</h3>
              <p className="text-gray-600">Choose your ideal canopy, pick a color, and decide between our value packages or an ala-carte setup.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-20 h-20 bg-emerald-600 text-white rounded-full text-3xl font-bold mb-4">2</div>
              <h3 className="text-xl font-bold mb-2">Add Accessories</h3>
              <p className="text-gray-600">Enhance your event with our wide range of add-ons, from elegant chairs to cooling fans and decor.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-20 h-20 bg-emerald-600 text-white rounded-full text-3xl font-bold mb-4">3</div>
              <h3 className="text-xl font-bold mb-2">Confirm & Celebrate</h3>
              <p className="text-gray-600">Fill in your event details, review your order, and complete the booking. We'll handle the rest!</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-emerald-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to plan your event?</span>
            <span className="block">Let's get started.</span>
          </h2>
          <button
            onClick={onBookNowClick}
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-emerald-600 bg-white hover:bg-emerald-50 sm:w-auto"
          >
            Start Your Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
