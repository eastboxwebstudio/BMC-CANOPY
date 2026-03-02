import React, { useState, useMemo } from 'react';
import { BookingMode } from '../types';

interface ItemCardProps {
  item: any;
  bookingMode: BookingMode;
  selectedCanopies: Record<string, number>;
  onQuantityChange: (id: string, quantity: number) => void;
  onSelect: (item: any, size: any) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, bookingMode, selectedCanopies, onQuantityChange, onSelect }) => {
  const isSized = Array.isArray(item.sizes) && item.sizes.length > 0;
  const [currentSize, setCurrentSize] = useState(isSized ? item.sizes[0] : null);

  const isSelected = useMemo(() => {
    if (isSized) {
      return Object.keys(selectedCanopies).some(k => k.startsWith(item.id) && selectedCanopies[k] > 0);
    }
    return (selectedCanopies[item.id] || 0) > 0;
  }, [selectedCanopies, item.id, isSized]);

  const compositeId = isSized && currentSize ? `${item.id}_${currentSize.name}` : item.id;
  const quantity = selectedCanopies[compositeId] || 0;
  const price = isSized && currentSize ? currentSize.price : item.price;

  return (
    <div className={`border rounded-xl overflow-hidden transition-all duration-300 flex flex-col ${isSelected ? 'border-emerald-500 ring-2 ring-emerald-500' : 'border-gray-200 hover:shadow-lg'}`}>
      {item.image_url && <img src={item.image_url} alt={item.name} className="w-full h-48 object-cover" referrerPolicy="no-referrer" />}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
        <p className="text-2xl font-bold text-emerald-600 mt-2">RM {price || 'N/A'}</p>
        <p className="text-gray-600 mt-3 text-sm flex-grow">{item.description}</p>

        {isSized && (
          <div className="mt-4">
            <label htmlFor={`size-select-${item.id}`} className="block text-sm font-medium text-gray-700 mb-1">Select Size:</label>
            <select
              id={`size-select-${item.id}`}
              value={currentSize?.name}
              onChange={(e) => {
                const newSize = item.sizes.find((s: any) => s.name === e.target.value);
                if (newSize) setCurrentSize(newSize);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
            >
              {item.sizes.map((size: any) => (
                <option key={size.name} value={size.name}>
                  {size.name} - RM {size.price}
                </option>
              ))}
            </select>
          </div>
        )}

        {item.items && (
          <ul className="mt-4 space-y-2 text-sm text-gray-500 list-disc list-inside">
            {item.items.map((listItem: string) => <li key={listItem}>{listItem}</li>)}
          </ul>
        )}

        <div className="mt-6">
          {bookingMode === BookingMode.AlaCarte ? (
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => onQuantityChange(compositeId, Math.max(0, quantity - 1))}
                className="w-10 h-10 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors flex items-center justify-center font-bold text-lg"
                aria-label={`Decrease quantity of ${item.name}`}
              >
                -
              </button>
              <span className="w-12 text-center font-semibold text-2xl">{quantity}</span>
              <button
                onClick={() => onQuantityChange(compositeId, quantity + 1)}
                className="w-10 h-10 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition-colors flex items-center justify-center font-bold text-lg"
                aria-label={`Increase quantity of ${item.name}`}
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => onSelect(item, currentSize)}
              className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-lg hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              {isSelected ? 'Selected' : 'Add to Selection'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
