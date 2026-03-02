import React from 'react';
import storyImage from '../assets/story.jpg';

interface AboutPageProps {
  onBookNowClick: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBookNowClick }) => {
  return (
    <div className="bg-white">
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Crafting Unforgettable Events, One Canopy at a Time.
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-600">
            Learn about our passion for quality and our commitment to making your special occasions perfect.
          </p>
        </div>
      </div>
      <div className="py-16 sm:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Our Story</h2>
              <p className="mt-4 text-lg text-gray-600">
                BMC Canopy was founded on a simple principle: every event deserves a beautiful, reliable, and stress-free foundation. We started as a small team with a passion for bringing people together, and we saw a need for high-quality canopy rentals that were matched by even higher-quality customer service.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                Today, we've grown, but our core mission remains the same. We believe we're providing more than just shelter; we're providing the perfect backdrop for your most cherished memories—from weddings and corporate functions to backyard parties and community gatherings.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                className="w-full h-full object-cover"
                src={storyImage}
                alt="Team setting up a canopy"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Our Commitment to You</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <h3 className="text-xl font-bold text-emerald-600 mb-2">Quality You can Trust</h3>
              <p className="text-gray-600">Every piece of equipment, from our largest marquee tent to the smallest chair, is meticulously maintained, cleaned, and inspected to ensure it meets our rigorous standards.</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-bold text-emerald-600 mb-2">Service That Shines</h3>
              <p className="text-gray-600">Our dedicated team is here to support you at every step. From initial inquiry to final takedown, we pride ourselves on being professional, punctual, and helpful.</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-bold text-emerald-600 mb-2">Flexibility for Your Vision</h3>
              <p className="text-gray-600">Whether you need a simple, elegant setup or a fully customized package with all the trimmings, our flexible booking options are designed to bring your unique vision to life.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-emerald-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to make your next event a success?</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-emerald-200">
            Let us help you create the perfect setting.
          </p>
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

export default AboutPage;
