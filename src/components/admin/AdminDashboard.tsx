import React, { useState, useEffect } from 'react';
import { supabaseClient } from '../../lib/supabase';
import AdminModal from './AdminModal';

interface AdminDashboardProps {
  children: React.ReactNode;
  onLogout: () => void;
  activeView: string;
  setActiveView: (view: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ children, onLogout, activeView, setActiveView }) => {
  const navItems = ['Dashboard', 'Canopies', 'Packages', 'Accessories', 'Bookings'];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-emerald-600">Admin Portal</h1>
            <button
              onClick={onLogout}
              className="px-4 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <div className="flex pt-16">
        <aside className="w-64 bg-gray-800 text-white min-h-screen p-4 fixed">
          <nav>
            <ul>
              {navItems.map(item => (
                <li key={item}>
                  <button
                    onClick={() => setActiveView(item.toLowerCase())}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeView === item.toLowerCase() ? 'bg-emerald-600' : 'hover:bg-gray-700'}`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="flex-1 ml-64 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export const DashboardHome: React.FC<{ canopies: any[], packages: any[], accessories: any[] }> = ({ canopies, packages, accessories }) => (
  <div>
    <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow transition hover:shadow-lg">
        <h3 className="text-lg font-semibold text-gray-700">Total Canopies</h3>
        <p className="text-4xl font-bold text-emerald-600 mt-2">{canopies.length}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow transition hover:shadow-lg">
        <h3 className="text-lg font-semibold text-gray-700">Total Packages</h3>
        <p className="text-4xl font-bold text-emerald-600 mt-2">{packages.length}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow transition hover:shadow-lg">
        <h3 className="text-lg font-semibold text-gray-700">Total Accessories</h3>
        <p className="text-4xl font-bold text-emerald-600 mt-2">{accessories.length}</p>
      </div>
    </div>
  </div>
);

export const BookingsPage: React.FC<{ canopies: any[], packages: any[], accessories: any[] }> = ({ canopies, packages, accessories }) => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewBooking, setViewBooking] = useState<any>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    const { data, error } = await supabaseClient.from('bookings').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching bookings:', error);
      alert('Failed to load bookings');
    } else {
      setBookings(data || []);
    }
    setLoading(false);
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    const { error } = await supabaseClient.from('bookings').update({ status: newStatus }).eq('id', id);
    if (error) {
      alert('Failed to update status');
    } else {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading bookings...</div>;

  return (
    <div className="bg-white p-8 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Booking Management</h2>
        <button onClick={fetchBookings} className="text-sm text-emerald-600 hover:text-emerald-800 font-medium">Refresh</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Event Date</th>
              <th className="px-6 py-3">Total (RM)</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-4 text-center">No bookings found.</td></tr>
            ) : (
              bookings.map(booking => (
                <tr key={booking.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">#{booking.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">{booking.full_name}</div>
                    <div className="text-xs text-gray-500">{booking.phone}</div>
                  </td>
                  <td className="px-6 py-4">{booking.event_date}</td>
                  <td className="px-6 py-4 font-bold">RM {booking.total_price}</td>
                  <td className="px-6 py-4">
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusUpdate(booking.id, e.target.value)}
                      className={`text-xs font-semibold px-2 py-1 rounded-full border-0 cursor-pointer ${booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          booking.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                            booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                        }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => setViewBooking(booking)} className="font-medium text-emerald-600 hover:underline">View Details</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AdminModal isOpen={!!viewBooking} onClose={() => setViewBooking(null)} title={`Booking #${viewBooking?.id} Details`}>
        {viewBooking && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="font-bold">Name:</span> {viewBooking.full_name}</div>
              <div><span className="font-bold">Email:</span> {viewBooking.email}</div>
              <div><span className="font-bold">Phone:</span> {viewBooking.phone}</div>
              <div><span className="font-bold">Location:</span> {viewBooking.location}</div>
              <div><span className="font-bold">Event Date:</span> {viewBooking.event_date}</div>
              <div><span className="font-bold">Time:</span> {viewBooking.event_time}</div>
              <div><span className="font-bold">Guests:</span> {viewBooking.guest_count}</div>
              <div><span className="font-bold">Mode:</span> {viewBooking.booking_mode}</div>
            </div>

            {viewBooking.special_requests && (
              <div className="bg-yellow-50 p-3 rounded-md text-sm border border-yellow-200">
                <span className="font-bold text-yellow-800">Special Requests:</span>
                <p className="mt-1 text-gray-700">{viewBooking.special_requests}</p>
              </div>
            )}

            <div className="border-t pt-4">
              <h4 className="font-bold text-gray-800 mb-2">Ordered Items</h4>
              <div className="bg-gray-50 p-4 rounded-md text-sm space-y-2 max-h-60 overflow-y-auto">
                {(() => {
                  const items = viewBooking.selected_items;
                  if (!items) return <p>No items found.</p>;
                  const els: React.ReactNode[] = [];
                  if (items.canopies) {
                    Object.entries(items.canopies).forEach(([key, qty]) => {
                      if ((qty as number) > 0) {
                        const [id, size] = key.split('_');
                        const canopy = canopies.find(c => c.id == id);
                        const name = canopy ? (size ? `${canopy.name} (${size})` : canopy.name) : `Canopy #${key}`;
                        els.push(<div key={key} className="flex justify-between"><span>{name}</span><span>x{qty as number}</span></div>);
                      }
                    });
                  }
                  if (items.package) {
                    els.push(<div key="pkg" className="font-semibold text-emerald-700">Package: {items.package.name}</div>);
                  }
                  if (items.accessories) {
                    Object.entries(items.accessories).forEach(([key, qty]) => {
                      if ((qty as number) > 0) {
                        const accessory = accessories.find(a => a.id == key);
                        const name = accessory ? accessory.name : `Accessory ID #${key}`;
                        els.push(<div key={key} className="flex justify-between"><span>{name}</span><span>x{qty as number}</span></div>);
                      }
                    });
                  }
                  return els;
                })()}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t font-bold text-lg">
              <span>Total Price:</span>
              <span>RM {viewBooking.total_price}</span>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
};

export default AdminDashboard;
