import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useTheme } from '../../context/ThemeContext';
import StepsLogo from '../../STEPS_transparent-removebg-preview.png';

const Footer = () => {
  const { darkMode } = useTheme();

  const companyInfo = {
    name: 'STEPS Education Limited',
    description: 'We aim to help only 50 students per intake to maintain our service quality. Education | Training | Excellence.',
    socialLinks: [
      { platform: 'facebook', url: 'https://facebook.com/stepseducation' },
      { platform: 'twitter', url: 'https://twitter.com/stepseducation' },
      { platform: 'instagram', url: 'https://instagram.com/stepseducation' },
      { platform: 'linkedin', url: 'https://linkedin.com/company/stepseducation' }
    ]
  };

  const quickLinks = [
    { name: 'Home', url: '/' },
    { name: 'Admission Process', url: '/admission-process' },
    { name: 'CV & Jobs Portal', url: '/cv-jobs' },
    { name: 'Contact', url: '/contact' }
  ];

  const services = [
    { name: 'International Student Recruitment', url: '/admission-process' },
    { name: 'Documents Assessment', url: '/admission-process' },
    { name: 'University Selection', url: '/admission-process' },
    { name: 'Visa Application Guidance', url: '/admission-process' },
    { name: 'CV & Resume Writing', url: '/cv-jobs' },
    { name: 'Career Counseling', url: '/cv-jobs' }
  ];

  const contactInfo = {
    address: 'City Gate House, 246–250 Romford Road, Stratford, London E7 9HZ',
    phone: '+4407988501805',
    whatsapp: '+447309093612',
    email: 'stepseducationlimited@gmail.com'
  };

  // Helper function to render social media icons
  const renderSocialIcon = (platform) => {
    switch (platform) {
      case 'facebook':
        return <FaFacebook size={20} />;
      case 'twitter':
        return <FaTwitter size={20} />;
      case 'instagram':
        return <FaInstagram size={20} />;
      case 'linkedin':
        return <FaLinkedin size={20} />;
      default:
        return null;
    }
  };

  return (
    <footer className={darkMode ? 'bg-gray-800 text-white' : 'bg-blue-900 text-white'}>
      <div className="container mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="mb-6 md:mb-0 md:col-span-1">
            <div className="flex items-center mb-4">
              <img src={StepsLogo} alt="STEPS Education Logo" className="h-16 w-auto mr-2" />
              <h1 className="text-2xl font-bold">
                STEPS Education
              </h1>
            </div>
            <p className="text-sm md:text-base max-w-md mb-4 text-white">
              {companyInfo.description}
            </p>
            <div className="flex space-x-4">
              {companyInfo.socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-800 hover:bg-blue-700'} p-2 rounded-full transition-colors`}
                  aria-label={social.platform}
                >
                  {renderSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full md:col-span-3">
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.url} className="text-white hover:text-blue-300 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Our Services</h4>
              <ul className="space-y-2">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link to={service.url} className="text-white hover:text-blue-300 transition-colors">
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex">
                  <FaMapMarkerAlt className="mt-1 mr-3 flex-shrink-0 text-blue-300" />
                  <span className="text-white text-sm break-words">
                    {contactInfo.address}
                  </span>
                </li>
                <li className="flex items-center">
                  <FaWhatsapp className="mr-3 flex-shrink-0 text-blue-300" />
                  <a href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9+]/g, '')}`} className="text-white hover:text-blue-300 transition-colors text-sm">
                    {contactInfo.whatsapp}
                  </a>
                </li>
                <li className="flex items-center">
                  <FaPhone className="mr-3 flex-shrink-0 text-blue-300" />
                  <a href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`} className="text-white hover:text-blue-300 transition-colors text-sm">
                    {contactInfo.phone}
                  </a>
                </li>
                <li className="flex items-center">
                  <FaEnvelope className="mr-3 flex-shrink-0 text-blue-300" />
                  <a href={`mailto:${contactInfo.email}`} className="text-white hover:text-blue-300 transition-colors text-sm">
                    {contactInfo.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-blue-800'} mt-8 pt-6 text-center`}>
          <p className="text-white">
            © {new Date().getFullYear()} STEPS Education Limited. All rights reserved.
          </p>
          <p className="mt-2 text-sm text-blue-200">
            YOUR DREAM OUR JOB!
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;