import React from 'react';
import ItemCard from '../ItemCard';
import { BookingMode } from '../../types';

interface Step1CanopyProps {
  canopies: any[];
  bookingMode: BookingMode;
  onModeChange: (mode: BookingMode) => void;
  selectedCanopies: Record<string, number>;
  onQuantityChange: (id: string, quantity: number) => void;
  onSingleCanopySelect: (item: any, size: any) => void;
}

const Step1Canopy: React.FC<Step1CanopyProps> = ({ canopies, bookingMode, onModeChange, selectedCanopies, onQuantityChange, onSingleCanopySelect }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-gray-800">Choose Your Canopy</h2>
      <p className="text-center text-gray-600 mt-2">Select a base canopy to start your booking.</p>

      <div className="flex justify-center my-8">
        <div className="relative flex w-full max-w-xs p-1 bg-gray-200 rounded-full">
          <span
            className="absolute top-0 left-0 w-1/2 h-full p-1 transition-transform duration-300 ease-in-out"
            style={{ transform: bookingMode === BookingMode.AlaCarte ? 'translateX(0%)' : 'translateX(98%)' }}
          >
            <span className="block w-full h-full bg-white rounded-full shadow-md"></span>
          </span>
          <button
            onClick={() => onModeChange(BookingMode.AlaCarte)}
            className="relative z-10 w-1/2 py-2 text-sm font-semibold text-center transition-colors duration-300"
          >
            Ala Carte
          </button>
          <button
            onClick={() => onModeChange(BookingMode.Package)}
            className="relative z-10 w-1/2 py-2 text-sm font-semibold text-center transition-colors duration-300"
          >
            Package
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mt-10">
        {canopies.map(canopy => (
          <ItemCard
            key={canopy.id}
            item={canopy}
            bookingMode={bookingMode}
            selectedCanopies={selectedCanopies}
            onQuantityChange={onQuantityChange}
            onSelect={onSingleCanopySelect}
          />
        ))}
      </div>
    </div>
  );
};

export default Step1Canopy;
