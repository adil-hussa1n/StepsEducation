import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="relative py-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3"
          alt="Students studying"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/90"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Start Your Journey Now
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Take the first step towards your international education dreams. Our expert consultants are ready to guide you through every step of the process.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-3 bg-white text-navy font-semibold rounded-md hover:bg-gray-100 transition-colors duration-300"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA; 