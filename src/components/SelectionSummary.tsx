import React from 'react';
import { BookingMode } from '../types';

interface SelectionSummaryProps {
  bookingMode: BookingMode;
  selectedCanopies: Record<string, number>;
  canopies: any[];
  selectedPackage: any;
  onCanopyQuantityChange: (id: string, quantity: number) => void;
  selectedAccessories: Record<string, number>;
  accessories: any[];
  onAccessoryQuantityChange: (id: string, quantity: number) => void;
}

const SelectionSummary: React.FC<SelectionSummaryProps> = ({ bookingMode, selectedCanopies, canopies, selectedPackage, onCanopyQuantityChange, selectedAccessories, accessories, onAccessoryQuantityChange }) => {
  const alaCarteEntries = Object.entries(selectedCanopies).filter(([, quantity]) => quantity > 0);
  const accessoryEntries = Object.entries(selectedAccessories).filter(([, quantity]) => quantity > 0);

  const hasPackage = bookingMode === BookingMode.Package && selectedPackage;
  const hasAlaCarte = bookingMode === BookingMode.AlaCarte && alaCarteEntries.length > 0;
  const hasAccessories = accessoryEntries.length > 0;

  if (!hasPackage && !hasAlaCarte && !hasAccessories) {
    return null;
  }

  let displaySubtotal = 0;

  // Package item
  const packageItem = hasPackage ? {
    name: selectedPackage.name,
    price: selectedPackage.price,
  } : null;
  if (packageItem) {
    displaySubtotal += packageItem.price;
  }

  // Ala carte canopy items
  const canopyItems = hasAlaCarte ? alaCarteEntries.map(([compositeId, quantity]) => {
    const idParts = compositeId.split('_');
    const canopyId = idParts[0];
    const sizeName = idParts.length > 1 ? idParts[1] : null;
    const canopy = canopies.find(c => c.id == canopyId);
    if (!canopy) return null;

    let price;
    let name = canopy.name;
    if (sizeName && canopy.sizes) {
      const size = canopy.sizes.find((s: any) => s.name === sizeName);
      price = size ? size.price : 0;
      name = `${canopy.name} (${sizeName})`;
    } else {
      price = canopy.price;
    }

    const lineTotal = price * quantity;
    displaySubtotal += lineTotal;
    return { compositeId, name, quantity, price, lineTotal };
  }).filter(Boolean) : [];

  // Accessory items
  const accessoryItems = hasAccessories ? accessoryEntries.map(([id, quantity]) => {
    const accessory = accessories.find(a => a.id == id);
    if (!accessory) return null;
    const lineTotal = accessory.price * quantity;
    displaySubtotal += lineTotal;
    return {
      id,
      name: accessory.name,
      quantity,
      price: accessory.price,
      lineTotal,
    };
  }).filter(Boolean) : [];

  return (
    <div className="mt-12 bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Your Current Selection</h3>

      {packageItem && (
        <div className="space-y-4 pb-4 mb-4 border-b border-gray-200">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-900">{packageItem.name}</p>
            <p className="text-sm text-gray-600">
              Price: RM {packageItem.price.toFixed(2)}
            </p>
          </div>
        </div>
      )}

      {canopyItems.length > 0 && bookingMode === BookingMode.AlaCarte && (
        <div className={`space-y-4 ${hasAccessories ? 'pb-4 mb-4 border-b border-gray-200' : ''}`}>
          {canopyItems.map((item: any) => (
            <div key={item.compositeId} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-600">
                  Qty: {item.quantity} &times; RM {item.price.toFixed(2)} = RM {item.lineTotal.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => onCanopyQuantityChange(item.compositeId, 0)}
                className="text-sm font-medium text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {accessoryItems.length > 0 && (
        <div className="space-y-4">
          <p className="font-semibold text-gray-700">Add-ons:</p>
          {accessoryItems.map((item: any) => (
            <div key={item.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-600">
                  Qty: {item.quantity} &times; RM {item.price.toFixed(2)} = RM {item.lineTotal.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => onAccessoryQuantityChange(item.id, 0)}
                className="text-sm font-medium text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-right text-lg font-bold text-gray-800">
          Current Subtotal: RM {displaySubtotal.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default SelectionSummary;
