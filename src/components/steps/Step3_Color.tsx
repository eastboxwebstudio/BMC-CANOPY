import React from 'react';

interface Step3ColorProps {
  colors: any[];
  onSelect: (color: any) => void;
  selectedColor: any;
}

const Step3Color: React.FC<Step3ColorProps> = ({ colors, onSelect, selectedColor }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800">Select Canopy Color</h2>
      <p className="text-center text-gray-600 mt-2">Pick a color for your canopy canvas.</p>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-6 mt-10">
        {colors.map((color) => (
          <div key={color.name} className="flex flex-col items-center cursor-pointer" onClick={() => onSelect(color)}>
            <div
              className={`w-20 h-20 rounded-full border-4 transition-all ${selectedColor?.name === color.name ? 'border-emerald-500 scale-110' : 'border-transparent'
                }`}
              style={{ backgroundColor: color.hex, border: color.name === 'White' ? '1px solid #ddd' : 'none' }}
            >
              {color.name === 'Transparent' && (
                <div className="w-full h-full bg-transparent rounded-full border-2 border-dashed border-gray-400"></div>
              )}
            </div>
            <p className={`mt-3 font-semibold ${selectedColor?.name === color.name ? 'text-emerald-600' : 'text-gray-700'}`}>
              {color.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step3Color;
