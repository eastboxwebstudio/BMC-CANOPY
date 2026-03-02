import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  isTextArea?: boolean;
  placeholder?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, name, value, onChange, type = 'text', isTextArea = false, placeholder }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {isTextArea ? (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
      />
    ) : (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
      />
    )}
  </div>
);

interface Step5DetailsProps {
  details: any;
  setDetails: React.Dispatch<React.SetStateAction<any>>;
}

const Step5Details: React.FC<Step5DetailsProps> = ({ details, setDetails }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDetails((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800">Booking Details</h2>
      <p className="text-gray-600 mt-2">Please provide your information to finalize the booking.</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <FormField label="Full Name" name="fullName" value={details.fullName} onChange={handleChange} placeholder="John Doe" />
        </div>
        <FormField label="Email" name="email" value={details.email} onChange={handleChange} type="email" placeholder="john.doe@example.com" />
        <FormField label="Phone Number" name="phone" value={details.phone} onChange={handleChange} type="tel" placeholder="012-345 6789" />
        <FormField label="Event Date" name="eventDate" value={details.eventDate} onChange={handleChange} type="date" />
        <FormField label="Event Time" name="eventTime" value={details.eventTime} onChange={handleChange} type="time" />
        <FormField label="Estimated Guest Count" name="guestCount" value={details.guestCount} onChange={handleChange} type="number" placeholder="e.g., 100" />
        <FormField label="Event Location / Address" name="location" value={details.location} onChange={handleChange} placeholder="Full address of the event" />
        <div className="md:col-span-2">
          <FormField label="Special Requests" name="specialRequests" value={details.specialRequests} onChange={handleChange} isTextArea placeholder="Any special requirements or notes..." />
        </div>
      </div>
    </div>
  );
};

export default Step5Details;
