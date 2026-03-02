import React from 'react';

interface AccessoryItemProps {
  accessory: any;
  quantity: number;
  onQuantityChange: (id: string, quantity: number) => void;
}

const AccessoryItem: React.FC<AccessoryItemProps> = ({ accessory, quantity, onQuantityChange }) => {
  const isSelected = quantity > 0;
  return (
    <div className={`border rounded-xl overflow-hidden transition-all duration-300 flex flex-col ${isSelected ? 'border-emerald-500 ring-2 ring-emerald-500' : 'border-gray-200 hover:shadow-lg'}`}>
      <img src={accessory.image_url} alt={accessory.name} className="w-full h-40 object-cover" referrerPolicy="no-referrer" />
      <div className="p-4 flex-grow flex flex-col text-center">
        <p className="font-semibold text-gray-800 flex-grow">{accessory.name}</p>
        <p className="text-lg text-emerald-600 font-bold mt-2">RM {accessory.price}</p>
        <div className="flex items-center justify-center space-x-4 mt-4">
          <button
            onClick={() => onQuantityChange(accessory.id, Math.max(0, quantity - 1))}
            className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors flex items-center justify-center font-bold"
            aria-label={`Decrease quantity of ${accessory.name}`}
          >
            -
          </button>
          <span className="w-10 text-center font-semibold text-xl">{quantity}</span>
          <button
            onClick={() => onQuantityChange(accessory.id, quantity + 1)}
            className="w-8 h-8 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition-colors flex items-center justify-center font-bold"
            aria-label={`Increase quantity of ${accessory.name}`}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

interface Step4AccessoriesProps {
  accessories: any[];
  selectedAccessories: Record<string, number>;
  onQuantityChange: (id: string, quantity: number) => void;
}

const Step4Accessories: React.FC<Step4AccessoriesProps> = ({ accessories, selectedAccessories, onQuantityChange }) => {
  const accessoryCategories = Array.from(new Set(accessories.map(a => a.category)));

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800">Accessorize Your Event</h2>
      <p className="text-center text-gray-600 mt-2">Add optional items to enhance your setup.</p>
      <div className="mt-10 space-y-12">
        {accessoryCategories.map(category => (
          <div key={category as string}>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">{category as string}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {accessories.filter(a => a.category === category).map((accessory) => (
                <AccessoryItem
                  key={accessory.id}
                  accessory={accessory}
                  quantity={selectedAccessories[accessory.id] || 0}
                  onQuantityChange={onQuantityChange}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step4Accessories;
