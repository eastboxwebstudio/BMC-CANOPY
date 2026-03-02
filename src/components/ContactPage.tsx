import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="divide-y-2 divide-gray-200">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Get in touch</h2>
            <div className="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:mt-0 lg:col-span-2">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Collaborate</h3>
                <dl className="mt-2 text-base text-gray-500">
                  <div><dd>+6016-6327901</dd></div>
                  <div className="mt-1"><dd>azrbooking.space@gmail.com</dd></div>
                </dl>
              </div>
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Our Office</h3>
                <dl className="mt-2 text-base text-gray-500">
                  <dd>Berkat Maju Canopy Enterprise (CA0035524-M)</dd>
                  <dd>NO.128, Lorong sg. isap 80,</dd>
                  <dd>Sg. isap perdana, 25150 Kuantan, Pahang.</dd>
                </dl>
              </div>
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Opening Hours</h3>
                <dl className="mt-2 text-base text-gray-500">
                  <dd>Monday - Friday</dd>
                  <dd>9:00 AM - 6:00 PM</dd>
                  <dd>Sat & Sun: By Appointment</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-16 lg:grid lg:grid-cols-3 lg:gap-8">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Our Location</h2>
            <div className="mt-8 lg:mt-0 lg:col-span-2">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.089413695223!2d103.27506517497417!3d3.7907068961831523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31c8b0ba82abfd1d%3A0x9fdeb1b4497fbee6!2s128%2C%20Lorong%20Sungai%20Isap%2080%2C%20Perumahan%20Sungai%20Isap%20Tiga%2C%2025150%20Kuantan%2C%20Pahang!5e0!3m2!1sen!2smy!4v1768967365932!5m2!1sen!2smy"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
