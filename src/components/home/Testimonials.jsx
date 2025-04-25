import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import LoadingSpinner from '../shared/LoadingSpinner';
import ErrorMessage from '../shared/ErrorMessage';

const Testimonials = ({ content }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = () => {
      try {
        setLoading(true);
        // Get testimonials from localStorage
        const storedTestimonials = JSON.parse(localStorage.getItem('testimonialsDatabase')) || [];
        
        // Sort by featured and limit to 3 testimonials
        const sortedTestimonials = storedTestimonials
          .filter(testimonial => testimonial.featured) // Only show featured testimonials
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);
          
        setTestimonials(sortedTestimonials);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError('Failed to load testimonials');
        setLoading(false);
      }
    };

    // Initial fetch
    fetchTestimonials();
    
    // Set up storage event listener to detect changes from other tabs/windows
    const handleStorageChange = (e) => {
      if (e.key === 'testimonialsDatabase') {
        console.log('Testimonials database updated, refreshing...');
        fetchTestimonials();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Poll for changes every 2 seconds (as a backup for changes in the same tab)
    const intervalId = setInterval(fetchTestimonials, 2000);
    
    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);
  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <ErrorMessage message={error} />
        </div>
      </section>
    );
  }

  // If no testimonials are available, create some defaults
  if (testimonials.length === 0) {
    // Create default testimonials
    const defaultTestimonials = [
      {
        _id: 'default-1',
        name: "Sarah Johnson",
        university: "University of Oxford",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        text: "GradWay made my dream of studying at Oxford a reality. Their guidance was invaluable throughout the application process.",
        rating: 5
      },
      {
        _id: 'default-2',
        name: "Michael Chen",
        university: "Harvard University",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        text: "The team's expertise in visa applications and university admissions was crucial to my success. Highly recommended!",
        rating: 5
      },
      {
        _id: 'default-3',
        name: "Emma Wilson",
        university: "University of Toronto",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        text: "Thanks to GradWay, I'm now pursuing my master's degree in Canada. Their support was exceptional at every step.",
        rating: 5
      }
    ];
    
    return renderTestimonials(defaultTestimonials);
  }
  
  return renderTestimonials(testimonials);
};

// Helper function to render testimonials
const renderTestimonials = (testimonialsList) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            What Our Students Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from students who have successfully achieved their academic goals with our support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsList.map((testimonial) => (
            <div
              key={testimonial._id}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-navy">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.university}</p>
                  {testimonial.rating && (
                    <div className="flex text-gold mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="w-3 h-3" />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <FaQuoteLeft className="text-navy/20 text-4xl mb-4" />
              <p className="text-gray-600 italic">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

};

export default Testimonials; 