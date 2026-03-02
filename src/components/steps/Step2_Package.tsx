import React, { useState } from 'react';

interface Step2PackageProps {
  packages: any[];
  onSelect: (pkg: any) => void;
}

const Step2Package: React.FC<Step2PackageProps> = ({ packages, onSelect }) => {
  const [localSelected, setLocalSelected] = useState<any>(null);

  const handleSelect = (pkg: any) => {
    setLocalSelected(pkg);
    onSelect(pkg);
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-gray-800">Select a Package</h2>
      <p className="text-center text-gray-600 mt-2">Choose one of our curated packages for a complete setup.</p>
      <div className="grid md:grid-cols-2 gap-8 mt-10 max-w-4xl mx-auto">
        {packages.map(pkg => (
          <div key={pkg.id} onClick={() => handleSelect(pkg)} className={`border rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${localSelected?.id === pkg.id ? 'border-emerald-500 ring-2 ring-emerald-500' : 'border-gray-200 hover:shadow-lg'}`}>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800">{pkg.name}</h3>
              <p className="text-2xl font-bold text-emerald-600 mt-2">RM {pkg.price}</p>
              <p className="text-gray-600 mt-3 text-sm">{pkg.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-500 list-disc list-inside">
                {pkg.items.map((listItem: string) => <li key={listItem}>{listItem}</li>)}
              </ul>
              <button
                className="w-full mt-6 bg-emerald-600 text-white font-semibold py-3 rounded-lg hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                {localSelected?.id === pkg.id ? 'Selected' : 'Select Package'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step2Package;
