import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { supabaseClient } from './lib/supabase';
import { BookingMode } from './types';
import { initialColors } from './constants';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import ProgressBar from './components/ProgressBar';
import OrderSummary from './components/OrderSummary';
import SelectionSummary from './components/SelectionSummary';

import Step1Canopy from './components/steps/Step1_Canopy';
import Step2Package from './components/steps/Step2_Package';
import Step3Color from './components/steps/Step3_Color';
import Step4Accessories from './components/steps/Step4_Accessories';
import Step5Details from './components/steps/Step5_Details';

import LoginPage from './components/admin/LoginPage';
import AdminDashboard, { BookingsPage, DashboardHome } from './components/admin/AdminDashboard';
import ContentManager from './components/admin/ContentManager';

const App: React.FC = () => {
  const [view, setView] = useState('home');
  const [adminView, setAdminView] = useState('dashboard');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [canopiesData, setCanopiesData] = useState<any[]>([]);
  const [packagesData, setPackagesData] = useState<any[]>([]);
  const [colorsData, setColorsData] = useState<any[]>(initialColors);
  const [accessoriesData, setAccessoriesData] = useState<any[]>([]);

  const [currentStep, setCurrentStep] = useState(1);
  const [bookingMode, setBookingMode] = useState<BookingMode>(BookingMode.AlaCarte);

  const [selectedCanopies, setSelectedCanopies] = useState<Record<string, number>>({});
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState<any>(colorsData[0]);
  const [selectedAccessories, setSelectedAccessories] = useState<Record<string, number>>({});
  const [bookingDetails, setBookingDetails] = useState({
    fullName: '', email: '', phone: '', eventDate: '', eventTime: '',
    guestCount: '', location: '', specialRequests: ''
  });

  // Fetch data from Supabase on initial load
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Attempt to sort by sort_order
        const [canopiesRes, packagesRes, accessoriesRes] = await Promise.all([
          supabaseClient.from('canopies').select('*').order('sort_order', { ascending: true }),
          supabaseClient.from('packages').select('*').order('sort_order', { ascending: true }),
          supabaseClient.from('accessories').select('*').order('sort_order', { ascending: true })
        ]);

        if (canopiesRes.error) throw canopiesRes.error;
        if (packagesRes.error) throw packagesRes.error;
        if (accessoriesRes.error) throw accessoriesRes.error;

        setCanopiesData(canopiesRes.data || []);
        setPackagesData(packagesRes.data || []);
        setAccessoriesData(accessoriesRes.data || []);
      } catch (err: any) {
        console.error("Error fetching data from Supabase:", err);
        // Fallback logic in case sort_order column doesn't exist yet
        if (err.message && err.message.includes('sort_order')) {
          console.warn("Attempting fallback fetch without sort_order.");
          try {
            const [canopiesRes, packagesRes, accessoriesRes] = await Promise.all([
              supabaseClient.from('canopies').select('*'),
              supabaseClient.from('packages').select('*'),
              supabaseClient.from('accessories').select('*')
            ]);
            setCanopiesData(canopiesRes.data || []);
            setPackagesData(packagesRes.data || []);
            setAccessoriesData(accessoriesRes.data || []);
          } catch (fallbackErr: any) {
            setError(`Failed to load data: ${fallbackErr.message}.`);
          }
        } else {
          setError(`Failed to load data: ${err.message}. Please ensure your Supabase tables (canopies, packages, accessories) are set up correctly and reload the page.`);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // CRUD Handlers
  const handleSaveCanopy = async (canopy: any) => {
    const { id, ...canopyToSave } = canopy;

    if (id) { // Update
      const { data, error } = await supabaseClient.from('canopies').update(canopyToSave).eq('id', id).select().single();
      if (error) { alert(`Error updating canopy: ${error.message}`); }
      else { setCanopiesData(prev => prev.map(c => c.id === data.id ? data : c)); }
    } else { // Create
      const { data, error } = await supabaseClient.from('canopies').insert(canopyToSave).select().single();
      if (error) { alert(`Error creating canopy: ${error.message}`); }
      else { setCanopiesData(prev => [...prev, data]); }
    }
  };
  const handleDeleteCanopy = async (id: string) => {
    if (!confirm("Are you sure you want to delete this canopy?")) return;
    const { error } = await supabaseClient.from('canopies').delete().eq('id', id);
    if (error) { alert(`Error deleting canopy: ${error.message}`); }
    else { setCanopiesData(prev => prev.filter(c => c.id !== id)); }
  };

  const handleSavePackage = async (pkg: any) => {
    const { id, ...pkgToSave } = pkg;

    if (id) { // Update
      const { data, error } = await supabaseClient.from('packages').update(pkgToSave).eq('id', id).select().single();
      if (error) { alert(`Error updating package: ${error.message}`); }
      else { setPackagesData(prev => prev.map(p => p.id === data.id ? data : p)); }
    } else { // Create
      const { data, error } = await supabaseClient.from('packages').insert(pkgToSave).select().single();
      if (error) { alert(`Error creating package: ${error.message}`); }
      else { setPackagesData(prev => [...prev, data]); }
    }
  };
  const handleDeletePackage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this package?")) return;
    const { error } = await supabaseClient.from('packages').delete().eq('id', id);
    if (error) { alert(`Error deleting package: ${error.message}`); }
    else { setPackagesData(prev => prev.filter(p => p.id !== id)); }
  };

  const handleSaveAccessory = async (accessory: any) => {
    const { id, ...accToSave } = accessory;

    if (id) { // Update
      const { data, error } = await supabaseClient.from('accessories').update(accToSave).eq('id', id).select().single();
      if (error) { alert(`Error updating accessory: ${error.message}`); }
      else { setAccessoriesData(prev => prev.map(a => a.id === data.id ? data : a)); }
    } else { // Create
      const { data, error } = await supabaseClient.from('accessories').insert(accToSave).select().single();
      if (error) { alert(`Error creating accessory: ${error.message}`); }
      else { setAccessoriesData(prev => [...prev, data]); }
    }
  };
  const handleDeleteAccessory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this accessory?")) return;
    const { error } = await supabaseClient.from('accessories').delete().eq('id', id);
    if (error) { alert(`Error deleting accessory: ${error.message}`); }
    else { setAccessoriesData(prev => prev.filter(a => a.id !== id)); }
  };

  // --- Reorder Handler ---
  const handleReorder = async (tableName: string, newItems: any[], setLocalState: React.Dispatch<React.SetStateAction<any[]>>) => {
    // Optimistic UI update
    setLocalState(newItems);

    // Update: We must send the FULL object to upsert to avoid overwriting other columns with null/defaults
    // if the backend treats it as a full row replacement.
    const updates = newItems.map((item, index) => ({
      ...item, // Spread existing properties (name, price, etc.)
      sort_order: index
    }));

    try {
      // select() is good practice to get the returned data back
      const { error } = await supabaseClient.from(tableName).upsert(updates);
      if (error) throw error;
    } catch (err) {
      console.error(`Error saving order for ${tableName}:`, err);
      alert(`Failed to save new order. Please ensure the 'sort_order' column exists in your database table '${tableName}'.`);
      // In a real app, we might revert local state here
    }
  };


  const stepsAlaCarte = ['Canopy', 'Color', 'Accessories', 'Details'];
  const stepsPackage = ['Package', 'Color', 'Accessories', 'Details'];
  const activeSteps = bookingMode === BookingMode.Package ? stepsPackage : stepsAlaCarte;
  const totalSteps = activeSteps.length;

  const resetState = useCallback(() => {
    setCurrentStep(1);
    setBookingMode(BookingMode.AlaCarte);
    setSelectedCanopies({});
    setSelectedPackage(null);
    setSelectedColor(colorsData[0]);
    setSelectedAccessories({});
    setBookingDetails({
      fullName: '', email: '', phone: '', eventDate: '', eventTime: '',
      guestCount: '', location: '', specialRequests: ''
    });
  }, [colorsData]);

  const navigateToHome = () => { setView('home'); resetState(); };
  const navigateToBooking = () => setView('booking');
  const navigateToAbout = () => setView('about');
  const navigateToContact = () => setView('contact');
  const navigateToLogin = () => setView('login');

  const handleLogin = (username: string, password: string) => {
    // Hardcoded for now as per original code, but should be replaced with real auth later
    if (username === 'admin' && password === 'password') {
      setIsAdminLoggedIn(true);
      setAdminView('dashboard');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    navigateToHome();
  };

  const handleNext = useCallback(() => setCurrentStep(prev => Math.min(prev + 1, totalSteps)), [totalSteps]);
  const handleBack = useCallback(() => {
    if (bookingMode === BookingMode.Package && currentStep === 2) {
      setCurrentStep(1);
    } else {
      setCurrentStep(prev => Math.max(prev - 1, 1));
    }
  }, [bookingMode, currentStep]);

  const handleCanopyQuantityChange = (compositeId: string, newQuantity: number) => {
    setSelectedCanopies(prev => ({
      ...prev,
      [compositeId]: newQuantity >= 0 ? newQuantity : 0,
    }));
  };

  const handleAccessoryQuantityChange = (id: string, newQuantity: number) => {
    setSelectedAccessories(prev => ({
      ...prev,
      [id]: newQuantity >= 0 ? newQuantity : 0,
    }));
  };

  const handleSingleCanopySelect = (canopy: any, size: any) => {
    let compositeId;
    if (canopy.sizes && size) {
      compositeId = `${canopy.id}_${size.name}`;
    } else if (canopy.sizes && Array.isArray(canopy.sizes) && canopy.sizes.length > 0) {
      compositeId = `${canopy.id}_${canopy.sizes[0].name}`;
    } else {
      compositeId = canopy.id;
    }
    setSelectedCanopies({ [compositeId]: 1 });
    handleNext();
  };

  const handlePackageSelect = (pkg: any) => {
    setSelectedPackage(pkg);

    // Auto-select canopy based on package description to ensure color selection and summary works
    let canopySet = false;
    const canopyItemString = pkg.items.find((item: string) => item.toLowerCase().includes('canopy'));

    if (canopyItemString && canopiesData.length > 0) {
      const matchingCanopy = canopiesData.find(c => canopyItemString.toLowerCase().includes(c.name.toLowerCase()));

      if (matchingCanopy) {
        let compositeId = matchingCanopy.id;
        if (Array.isArray(matchingCanopy.sizes) && matchingCanopy.sizes.length > 0) {
          const sizeMatch = canopyItemString.match(/\((.*?)\)/);
          let sizeName = matchingCanopy.sizes[0].name; // Default to first size
          if (sizeMatch) {
            const foundSize = matchingCanopy.sizes.find((s: any) => s.name === sizeMatch[1]);
            if (foundSize) sizeName = foundSize.name;
          }
          compositeId = `${matchingCanopy.id}_${sizeName}`;
        }
        setSelectedCanopies({ [compositeId]: 1 });
        canopySet = true;
      }
    }

    if (!canopySet && canopiesData.length > 0) {
      const defaultCanopy = canopiesData[0];
      let compositeId = defaultCanopy.id;
      if (Array.isArray(defaultCanopy.sizes) && defaultCanopy.sizes.length > 0) {
        compositeId = `${defaultCanopy.id}_${defaultCanopy.sizes[0].name}`;
      }
      setSelectedCanopies({ [compositeId]: 1 });
    }

    handleNext();
  };

  const handleColorSelect = (color: any) => { setSelectedColor(color); handleNext(); };

  const handleBookingModeChange = (mode: BookingMode) => {
    setBookingMode(mode);
    setSelectedCanopies({});
    setSelectedPackage(null);
    setSelectedAccessories({});
    setCurrentStep(1);
  };

  const financials = useMemo(() => {
    let subtotal = 0;

    if (bookingMode === BookingMode.AlaCarte) {
      Object.entries(selectedCanopies).forEach(([compositeId, quantity]) => {
        if (quantity > 0) {
          const idParts = compositeId.split('_');
          const canopyId = idParts[0];
          const sizeName = idParts.length > 1 ? idParts[1] : null;

          const canopy = canopiesData.find(c => c.id == canopyId);
          if (!canopy) return;

          let price;
          if (sizeName && Array.isArray(canopy.sizes)) {
            const size = canopy.sizes.find((s: any) => s.name === sizeName);
            price = size ? size.price : 0;
          } else {
            price = canopy.price;
          }
          subtotal += price * Number(quantity);
        }
      });
    }

    if (bookingMode === BookingMode.Package && selectedPackage) {
      subtotal += selectedPackage.price;
    }

    Object.entries(selectedAccessories).forEach(([id, quantity]) => {
      const accessory = accessoriesData.find(a => a.id == id);
      if (accessory) subtotal += accessory.price * Number(quantity);
    });

    const sst = subtotal * 0.06;
    const deliveryFee = 100;
    const grandTotal = subtotal + sst + deliveryFee;
    const deposit = grandTotal * 0.5;

    return { subtotal, sst, deliveryFee, grandTotal, deposit };
  }, [selectedCanopies, selectedPackage, selectedAccessories, bookingMode, canopiesData, accessoriesData]);


  const handleCompleteBooking = async () => {
    const hasCanopySelection = Object.values(selectedCanopies).some(q => q > 0);
    if (!hasCanopySelection) {
      alert("Please make a selection before completing the booking.");
      return;
    }

    // --- 1. Save to Supabase and Get ID ---
    const { grandTotal, deposit } = financials;

    const bookingPayload = {
      full_name: bookingDetails.fullName,
      email: bookingDetails.email,
      phone: bookingDetails.phone,
      event_date: bookingDetails.eventDate,
      event_time: bookingDetails.eventTime,
      location: bookingDetails.location,
      guest_count: bookingDetails.guestCount,
      special_requests: bookingDetails.specialRequests,
      booking_mode: bookingMode,
      selected_items: {
        canopies: selectedCanopies,
        package: selectedPackage,
        accessories: selectedAccessories,
        color: selectedColor
      },
      total_price: grandTotal,
      deposit_amount: deposit,
      status: 'Pending'
    };

    let bookingId = 'BARU';

    try {
      const { data, error } = await supabaseClient
        .from('bookings')
        .insert(bookingPayload)
        .select()
        .single();

      if (error) {
        console.error("Supabase Insert Error:", error);
        // Don't stop flow, just log error, user can still whatsapp
      } else if (data) {
        bookingId = `#${data.id}`;
      }
    } catch (err) {
      console.error("Booking Error:", err);
    }

    // --- 2. Construct WhatsApp Message ---
    let msg = `Salam BMC Canopy, saya ingin membuat tempahan (${bookingId}).\n\n`;

    msg += `*MAKLUMAT PELANGGAN*\n`;
    msg += `Nama: ${bookingDetails.fullName || '-'}\n`;
    msg += `No. Tel: ${bookingDetails.phone || '-'}\n`;
    msg += `Tarikh: ${bookingDetails.eventDate || '-'}\n`;
    msg += `Masa: ${bookingDetails.eventTime || '-'}\n`;
    msg += `Lokasi: ${bookingDetails.location || '-'}\n`;
    msg += `Tetamu: ${bookingDetails.guestCount || '-'}\n\n`;

    msg += `*SENARAI TEMPAHAN*\n`;

    if (bookingMode === BookingMode.AlaCarte) {
      Object.entries(selectedCanopies).forEach(([compositeId, quantity]) => {
        if (quantity > 0) {
          const idParts = compositeId.split('_');
          const canopyId = idParts[0];
          const sizeName = idParts.length > 1 ? idParts[1] : null;
          const canopy = canopiesData.find(c => c.id == canopyId);
          if (canopy) {
            let name = canopy.name;
            if (sizeName) name = `${canopy.name} (${sizeName})`;
            msg += `- ${name} (x${quantity})\n`;
          }
        }
      });
    }

    if (bookingMode === BookingMode.Package && selectedPackage) {
      msg += `- Pakej: ${selectedPackage.name}\n`;
    }

    if (selectedColor) {
      msg += `- Warna Kanopi: ${selectedColor.name}\n`;
    }

    const accessoryEntries = Object.entries(selectedAccessories).filter(([, qty]) => qty > 0);
    if (accessoryEntries.length > 0) {
      msg += `\n*Tambahan (Accessories):*\n`;
      accessoryEntries.forEach(([id, quantity]) => {
        const accessory = accessoriesData.find(a => a.id == id);
        if (accessory) {
          msg += `- ${accessory.name} (x${quantity})\n`;
        }
      });
    }

    if (bookingDetails.specialRequests) {
      msg += `\n*Catatan*: ${bookingDetails.specialRequests}\n`;
    }

    msg += `\n*RINGKASAN BAYARAN*\n`;
    msg += `Jumlah Besar: RM ${grandTotal.toFixed(2)}\n`;
    msg += `Deposit (50%): RM ${deposit.toFixed(2)}\n`;
    msg += `\nMohon pengesahan ketersediaan. Terima kasih.`;

    // Encode message correctly for URL
    const encodedMessage = encodeURIComponent(msg);

    // Use official WhatsApp API link instead of wasap.my for better reliability with long text
    const whatsappUrl = `https://wa.me/60166327901?text=${encodedMessage}`;

    // --- 3. Redirect ---
    window.open(whatsappUrl, '_blank');

    alert('Tempahan disimpan! Anda akan dibawa ke WhatsApp untuk menghantar butiran tempahan.');

    navigateToHome();
  };

  const renderStep = () => {
    if (bookingMode === BookingMode.AlaCarte) {
      switch (currentStep) {
        case 1: return <Step1Canopy canopies={canopiesData} bookingMode={bookingMode} onModeChange={handleBookingModeChange} selectedCanopies={selectedCanopies} onQuantityChange={handleCanopyQuantityChange} onSingleCanopySelect={handleSingleCanopySelect} />;
        case 2: return <Step3Color colors={colorsData} onSelect={handleColorSelect} selectedColor={selectedColor} />;
        case 3: return <Step4Accessories accessories={accessoriesData} selectedAccessories={selectedAccessories} onQuantityChange={handleAccessoryQuantityChange} />;
        case 4: return <Step5Details details={bookingDetails} setDetails={setBookingDetails} />;
        default: return null;
      }
    } else {
      switch (currentStep) {
        case 1: return <Step2Package packages={packagesData} onSelect={handlePackageSelect} />;
        case 2: return <Step3Color colors={colorsData} onSelect={handleColorSelect} selectedColor={selectedColor} />;
        case 3: return <Step4Accessories accessories={accessoriesData} selectedAccessories={selectedAccessories} onQuantityChange={handleAccessoryQuantityChange} />;
        case 4: return <Step5Details details={bookingDetails} setDetails={setBookingDetails} />;
        default: return null;
      }
    }
  };

  const isFinalStep = currentStep === totalSteps;
  const hasSelection = bookingMode === BookingMode.AlaCarte
    ? Object.values(selectedCanopies).some(q => q > 0)
    : !!selectedPackage;

  const renderBookingWizard = () => {
    // Initial screen for choosing booking mode
    if (currentStep === 1 && bookingMode === BookingMode.Package && !selectedPackage) {
      return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
            <h2 className="text-3xl font-bold text-center text-gray-800">Choose Your Booking Type</h2>
            <div className="flex justify-center my-8">
              <div className="relative flex w-full max-w-xs p-1 bg-gray-200 rounded-full">
                <span
                  className="absolute top-0 left-0 w-1/2 h-full p-1 transition-transform duration-300 ease-in-out"
                  style={{ transform: 'translateX(98%)' }}
                >
                  <span className="block w-full h-full bg-white rounded-full shadow-md"></span>
                </span>
                <button
                  onClick={() => handleBookingModeChange(BookingMode.AlaCarte)}
                  className="relative z-10 w-1/2 py-2 text-sm font-semibold text-center transition-colors duration-300"
                >
                  Ala Carte
                </button>
                <button
                  onClick={() => handleBookingModeChange(BookingMode.Package)}
                  className="relative z-10 w-1/2 py-2 text-sm font-semibold text-center transition-colors duration-300"
                >
                  Package
                </button>
              </div>
            </div>
            <Step2Package packages={packagesData} onSelect={handlePackageSelect} />
          </div>
        </main>
      )
    }

    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
          <ProgressBar steps={activeSteps} currentStep={currentStep} />
          <div className={`mt-10 ${isFinalStep ? 'grid lg:grid-cols-3 gap-12' : ''}`}>
            <div className={isFinalStep ? 'lg:col-span-2' : ''}>
              {renderStep()}
            </div>
            {isFinalStep && (
              <div className="lg:col-span-1">
                <OrderSummary
                  canopies={canopiesData}
                  accessories={accessoriesData}
                  selectedCanopies={selectedCanopies}
                  selectedPackage={selectedPackage}
                  selectedColor={selectedColor}
                  selectedAccessories={selectedAccessories}
                  subtotal={financials.subtotal}
                  sst={financials.sst}
                  deliveryFee={financials.deliveryFee}
                  grandTotal={financials.grandTotal}
                  deposit={financials.deposit}
                  bookingMode={bookingMode}
                />
              </div>
            )}
          </div>

          {!isFinalStep && hasSelection && (
            <SelectionSummary
              bookingMode={bookingMode}
              selectedCanopies={selectedCanopies}
              canopies={canopiesData}
              selectedPackage={selectedPackage}
              onCanopyQuantityChange={handleCanopyQuantityChange}
              selectedAccessories={selectedAccessories}
              accessories={accessoriesData}
              onAccessoryQuantityChange={handleAccessoryQuantityChange}
            />
          )}

          {hasSelection && (
            <div className="mt-12 flex justify-between items-start">
              <button onClick={handleBack} disabled={currentStep === 1} className="px-6 py-2 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors disabled:text-gray-400 disabled:bg-transparent disabled:cursor-not-allowed">Back</button>

              {!isFinalStep ? (
                <button onClick={handleNext} className="px-6 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors">Next</button>
              ) : (
                <div className="text-right">
                  <button onClick={handleCompleteBooking} className="px-8 py-3 bg-emerald-600 text-white font-bold text-lg rounded-lg hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg">
                    Complete Booking
                  </button>
                  <p className="text-xs text-gray-500 mt-2 max-w-xs ml-auto">
                    Clicking this will save your booking and redirect you to WhatsApp to confirm your order details.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    )
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-emerald-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <h2 className="mt-4 text-xl font-semibold text-gray-700">Loading Data...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600">An Error Occurred</h2>
          <p className="mt-2 text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (isAdminLoggedIn) {
    const renderAdminContent = () => {
      switch (adminView) {
        case 'canopies':
          return <ContentManager
            title="Canopies"
            items={canopiesData}
            fields={[
              { name: 'image_url', label: 'Image URL' },
              { name: 'name', label: 'Name' },
              { name: 'description', label: 'Description', type: 'textarea' },
              { name: 'price', label: 'Base Price (non-sized)', type: 'number' },
              { name: 'sizes', label: 'Sizes (JSON format)', type: 'textarea_json' }
            ]}
            onSave={handleSaveCanopy}
            onDelete={handleDeleteCanopy}
            onReorderSave={(newItems) => handleReorder('canopies', newItems, setCanopiesData)}
          />;
        case 'packages':
          return <ContentManager
            title="Packages"
            items={packagesData}
            fields={[
              { name: 'name', label: 'Name' },
              { name: 'price', label: 'Price', type: 'number' },
              { name: 'description', label: 'Description', type: 'textarea' },
              { name: 'items', label: 'Items (one per line)', type: 'textarea_array' }
            ]}
            onSave={handleSavePackage}
            onDelete={handleDeletePackage}
            onReorderSave={(newItems) => handleReorder('packages', newItems, setPackagesData)}
          />;
        case 'accessories':
          return <ContentManager
            title="Accessories"
            items={accessoriesData}
            fields={[
              { name: 'image_url', label: 'Image URL' },
              { name: 'name', label: 'Name' },
              { name: 'price', label: 'Price', type: 'number' },
              { name: 'category', label: 'Category' }
            ]}
            onSave={handleSaveAccessory}
            onDelete={handleDeleteAccessory}
            onReorderSave={(newItems) => handleReorder('accessories', newItems, setAccessoriesData)}
          />;
        case 'bookings':
          return <BookingsPage canopies={canopiesData} packages={packagesData} accessories={accessoriesData} />;
        case 'dashboard':
        default:
          return <DashboardHome canopies={canopiesData} packages={packagesData} accessories={accessoriesData} />;
      }
    };

    return (
      <AdminDashboard onLogout={handleLogout} activeView={adminView} setActiveView={setAdminView}>
        {renderAdminContent()}
      </AdminDashboard>
    );
  }

  if (view === 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (view) {
      case 'home': return <HomePage onBookNowClick={navigateToBooking} />;
      case 'booking': return renderBookingWizard();
      case 'about': return <AboutPage onBookNowClick={navigateToBooking} />;
      case 'contact': return <ContactPage />;
      default: return <HomePage onBookNowClick={navigateToBooking} />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
      <Header activeView={view} onNavigateHome={navigateToHome} onNavigateToBooking={navigateToBooking} onNavigateToAbout={navigateToAbout} onNavigateToContact={navigateToContact} />
      <div className="flex-grow">{renderContent()}</div>
      <Footer onNavigateHome={navigateToHome} onNavigateToBooking={navigateToBooking} onNavigateToAbout={navigateToAbout} onNavigateToContact={navigateToContact} onNavigateToLogin={navigateToLogin} />
    </div>
  );
};

export default App;
