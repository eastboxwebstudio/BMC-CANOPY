import React from 'react';
import { BookingMode } from '../types';

interface OrderSummaryProps {
  canopies: any[];
  accessories: any[];
  selectedCanopies: Record<string, number>;
  selectedPackage: any;
  selectedColor: any;
  selectedAccessories: Record<string, number>;
  subtotal: number;
  sst: number;
  deliveryFee: number;
  grandTotal: number;
  deposit: number;
  bookingMode: BookingMode;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  canopies,
  accessories,
  selectedCanopies,
  selectedPackage,
  selectedColor,
  selectedAccessories,
  subtotal,
  sst,
  deliveryFee,
  grandTotal,
  deposit,
  bookingMode
}) => {

  const SummaryLineItem = ({ label, value, isBold, isPrice }: { label: string, value: string | number, isBold?: boolean, isPrice?: boolean }) => (
    <div className={`flex justify-between items-center py-1 ${isBold ? 'font-bold' : ''}`}>
      <p className="text-gray-600 text-sm">{label}</p>
      <p className={`${isBold ? 'text-gray-800 text-base' : 'text-gray-700 text-sm'}`}>{isPrice && 'RM '}{value}</p>
    </div>
  );

  const canopyEntries = Object.entries(selectedCanopies).filter(([, quantity]) => quantity > 0);

  return (
    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 h-full">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-4">Order Summary</h2>
      <div className="space-y-4">
        {canopyEntries.length > 0 && (
          <div className="space-y-2 pb-4 border-b">
            {bookingMode === BookingMode.AlaCarte && canopyEntries.map(([compositeId, quantity]) => {
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

              return (
                <SummaryLineItem
                  key={compositeId}
                  label={`${name} x${quantity}`}
                  value={(price * quantity).toFixed(2)}
                  isBold
                  isPrice
                />
              );
            })}
            {selectedColor && <SummaryLineItem label="Color (All Canopies)" value={selectedColor.name} />}
          </div>
        )}

        {bookingMode === BookingMode.Package && selectedPackage && (
          <div className="space-y-2 pb-4 border-b">
            <SummaryLineItem label={selectedPackage.name} value={selectedPackage.price.toFixed(2)} isBold isPrice />
            <div className="pl-4 text-sm text-gray-500 pt-2">
              {selectedPackage.items.map((item: string) => <p key={item}>- {item}</p>)}
            </div>
          </div>
        )}

        {Object.keys(selectedAccessories).length > 0 && (
          <div className="space-y-2 pb-4 border-b">
            <p className="font-bold text-gray-600 text-base">Add-ons:</p>
            {Object.entries(selectedAccessories).map(([id, quantity]) => {
              const accessory = accessories.find(a => a.id == id);
              if (!accessory || quantity === 0) return null;
              return <SummaryLineItem key={id} label={`${accessory.name} x${quantity}`} value={(accessory.price * Number(quantity)).toFixed(2)} isPrice />;
            })}
          </div>
        )}

        <div className="pt-4 space-y-2">
          <SummaryLineItem label="Subtotal" value={subtotal.toFixed(2)} isPrice />
          <SummaryLineItem label="SST (6%)" value={sst.toFixed(2)} isPrice />
          <SummaryLineItem label="Delivery" value={deliveryFee.toFixed(2)} isPrice />
          <div className="flex justify-between items-center text-xl font-bold text-emerald-700 mt-4 pt-4 border-t">
            <p>Grand Total</p>
            <p>RM {grandTotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center text-lg font-semibold text-gray-800 mt-2 bg-emerald-50 p-3 rounded-lg">
            <p>Booking Deposit (50%)</p>
            <p>RM {deposit.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-2">Terms & Conditions</h3>
        <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
          <li><strong>Deposit:</strong> 50% required upon booking</li>
          <li><strong>Balance:</strong> 50% due 7 days before event</li>
          <li><strong>Includes:</strong> Setup, configuration & support</li>
          <li><strong>Changes:</strong> Within 48hrs may incur additional fees</li>
          <li><strong>Cancellation:</strong> 30+ days: Full refund | 15-29 days: 50% refund | Within 14 days: No refund</li>
        </ul>
      </div>

    </div>
  );
};

export default OrderSummary;
