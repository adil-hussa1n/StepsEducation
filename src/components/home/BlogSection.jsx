import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'UK Tier 4 Student Visa: 2023 Updates and Changes',
      excerpt: 'Recent changes to the UK Tier 4 Student Visa application process and how they affect international students.',
      date: 'Oct 15, 2023',
      category: 'Visa Updates',
      image: 'https://images.unsplash.com/photo-1591692575450-74c699965a63?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Mr. Mohsin'
    },
    {
      id: 2,
      title: '5 Tips for a Successful University Interview',
      excerpt: 'Prepare for your university interview with these expert tips that will help you stand out from other applicants.',
      date: 'Sep 28, 2023',
      category: 'Admission Tips',
      image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Education Team'
    },
    {
      id: 3,
      title: 'How to Choose the Right University and Course',
      excerpt: 'Factors to consider when selecting your university and course to ensure it aligns with your career goals.',
      date: 'Sep 12, 2023',
      category: 'Career Guidance',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: 'Education Team'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12
      } 
    }
  };

  return (
    <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 dark:from-indigo-800/30 dark:to-blue-800/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium mb-4 border border-indigo-100 dark:border-indigo-700">
            Resources
          </span>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent mb-6">
            Latest from Our Blog
          </h2>
          <div className="w-24 h-2 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full mx-auto mb-8"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            Stay up-to-date with the latest news, tips, and updates on admissions, 
            visa processes, and educational opportunities.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              whileHover={{ 
                y: -12, 
                transition: { type: "spring", stiffness: 200, damping: 10 }
              }}
              className="group bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl border border-gray-100/50 dark:border-gray-700/50 hover:border-indigo-200 dark:hover:border-indigo-700 transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>{post.date}</span>
                  <span>By {post.author}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-5">
                  {post.excerpt}
                </p>
                
                <Link 
                  to="#" 
                  className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium group-hover:text-indigo-800 dark:group-hover:text-indigo-300 transition-colors duration-300"
                >
                  <span>Read More</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link
            to="/blog"
            className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 font-semibold rounded-2xl hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 transform hover:-translate-y-1 group shadow-lg shadow-indigo-900/5 dark:shadow-none"
          >
            <span className="mr-2">View All Articles</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection; 