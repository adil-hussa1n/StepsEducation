import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ScholarshipCalculator = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      nationality: '',
      courseLevel: '',
      grades: '',
      englishLevel: '',
      hasExtraCurricular: false,
    },
    validationSchema: Yup.object({
      nationality: Yup.string().required('Required'),
      courseLevel: Yup.string().required('Required'),
      grades: Yup.string().required('Required'),
      englishLevel: Yup.string().required('Required')
    }),
    onSubmit: (values) => {
      setLoading(true);
      
      // Simulate calculation delay
      setTimeout(() => {
        // Basic algorithm to calculate scholarship amount
        let baseAmount = 0;
        
        // Base amount based on course level
        switch(values.courseLevel) {
          case 'undergraduate':
            baseAmount = 5000;
            break;
          case 'postgraduate':
            baseAmount = 7500;
            break;
          case 'phd':
            baseAmount = 10000;
            break;
          default:
            baseAmount = 3000;
        }
        
        // Adjust based on grades
        let gradeMultiplier = 1.0;
        switch(values.grades) {
          case 'excellent':
            gradeMultiplier = 1.5;
            break;
          case 'good':
            gradeMultiplier = 1.2;
            break;
          case 'average':
            gradeMultiplier = 1.0;
            break;
          case 'below':
            gradeMultiplier = 0.7;
            break;
          default:
            gradeMultiplier = 1.0;
        }
        
        // English level bonus
        let englishBonus = 0;
        switch(values.englishLevel) {
          case 'native':
            englishBonus = 1000;
            break;
          case 'advanced':
            englishBonus = 750;
            break;
          case 'intermediate':
            englishBonus = 500;
            break;
          case 'basic':
            englishBonus = 0;
            break;
          default:
            englishBonus = 0;
        }
        
        // Extra-curricular bonus
        const extraCurricularBonus = values.hasExtraCurricular ? 1000 : 0;
        
        // Calculate total
        const scholarshipAmount = (baseAmount * gradeMultiplier) + englishBonus + extraCurricularBonus;
        
        // Eligibility check (basic example)
        const isEligible = values.grades !== 'below' || values.englishLevel !== 'basic';
        
        // Calculate percentage of tuition covered (example)
        let tuitionFee = 0;
        switch(values.courseLevel) {
          case 'undergraduate':
            tuitionFee = 20000;
            break;
          case 'postgraduate':
            tuitionFee = 25000;
            break;
          case 'phd':
            tuitionFee = 30000;
            break;
          default:
            tuitionFee = 20000;
        }
        
        const percentageCovered = Math.min(100, Math.round((scholarshipAmount / tuitionFee) * 100));
        
        setResult({
          amount: Math.round(scholarshipAmount),
          isEligible,
          percentageCovered,
          recommendedUniversities: [
            'University of Manchester',
            'University of Leeds',
            'Queen Mary University of London',
            'University of Sheffield'
          ]
        });
        
        setLoading(false);
      }, 1500);
    },
  });

  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      } 
    }
  };

  const resultVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 20 
      } 
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-xl dark:shadow-indigo-900/20 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
        <h3 className="text-2xl font-bold mb-2">Scholarship Calculator</h3>
        <p className="opacity-80">Estimate your potential scholarship amount based on your profile</p>
      </div>
      
      <div className="p-6 md:p-8">
        <motion.form 
          initial="hidden"
          animate="visible"
          variants={formVariants}
          onSubmit={formik.handleSubmit}
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${result ? 'mb-8' : ''}`}
        >
          <div>
            <label htmlFor="nationality" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Nationality
            </label>
            <select
              id="nationality"
              name="nationality"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nationality}
              className={`w-full px-4 py-3 rounded-xl border ${formik.touched.nationality && formik.errors.nationality ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors duration-300`}
            >
              <option value="">Select your nationality</option>
              <option value="uk">UK</option>
              <option value="eu">EU/EEA</option>
              <option value="international">International</option>
            </select>
            {formik.touched.nationality && formik.errors.nationality ? (
              <p className="mt-1 text-sm text-red-500 dark:text-red-400">{formik.errors.nationality}</p>
            ) : null}
          </div>
          
          <div>
            <label htmlFor="courseLevel" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Course Level
            </label>
            <select
              id="courseLevel"
              name="courseLevel"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.courseLevel}
              className={`w-full px-4 py-3 rounded-xl border ${formik.touched.courseLevel && formik.errors.courseLevel ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors duration-300`}
            >
              <option value="">Select course level</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="postgraduate">Postgraduate/Masters</option>
              <option value="phd">PhD/Doctoral</option>
            </select>
            {formik.touched.courseLevel && formik.errors.courseLevel ? (
              <p className="mt-1 text-sm text-red-500 dark:text-red-400">{formik.errors.courseLevel}</p>
            ) : null}
          </div>
          
          <div>
            <label htmlFor="grades" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Academic Grades
            </label>
            <select
              id="grades"
              name="grades"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.grades}
              className={`w-full px-4 py-3 rounded-xl border ${formik.touched.grades && formik.errors.grades ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors duration-300`}
            >
              <option value="">Select grade range</option>
              <option value="excellent">Excellent (First Class/A/4.0+)</option>
              <option value="good">Good (2:1/B/3.0-3.9)</option>
              <option value="average">Average (2:2/C/2.0-2.9)</option>
              <option value="below">Below Average (Third/D/Below 2.0)</option>
            </select>
            {formik.touched.grades && formik.errors.grades ? (
              <p className="mt-1 text-sm text-red-500 dark:text-red-400">{formik.errors.grades}</p>
            ) : null}
          </div>
          
          <div>
            <label htmlFor="englishLevel" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              English Language Proficiency
            </label>
            <select
              id="englishLevel"
              name="englishLevel"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.englishLevel}
              className={`w-full px-4 py-3 rounded-xl border ${formik.touched.englishLevel && formik.errors.englishLevel ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors duration-300`}
            >
              <option value="">Select proficiency level</option>
              <option value="native">Native Speaker</option>
              <option value="advanced">Advanced (IELTS 7.0+)</option>
              <option value="intermediate">Intermediate (IELTS 6.0-6.5)</option>
              <option value="basic">Basic (IELTS below 6.0)</option>
            </select>
            {formik.touched.englishLevel && formik.errors.englishLevel ? (
              <p className="mt-1 text-sm text-red-500 dark:text-red-400">{formik.errors.englishLevel}</p>
            ) : null}
          </div>
          
          <div className="md:col-span-2">
            <div className="flex items-center">
              <input
                id="hasExtraCurricular"
                name="hasExtraCurricular"
                type="checkbox"
                onChange={formik.handleChange}
                checked={formik.values.hasExtraCurricular}
                className="h-5 w-5 text-indigo-600 dark:text-indigo-400 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors duration-300"
              />
              <label htmlFor="hasExtraCurricular" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                I have significant extra-curricular achievements (sports, volunteering, leadership)
              </label>
            </div>
          </div>
          
          <div className="md:col-span-2 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-xl shadow-lg shadow-indigo-500/20 dark:shadow-indigo-900/30 transition-all duration-300 flex justify-center items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Calculating...
                </>
              ) : (
                'Calculate Potential Scholarship'
              )}
            </button>
          </div>
        </motion.form>
        
        {result && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={resultVariants}
            className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-6 rounded-3xl border border-indigo-100 dark:border-indigo-800/30 shadow-lg transition-colors duration-300"
          >
            <h4 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 mb-4">Your Scholarship Estimate</h4>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 shadow-md transition-colors duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-300 font-medium">Estimated Amount:</span>
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">£{result.amount.toLocaleString()}</span>
              </div>
              
              <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${result.percentageCovered}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-indigo-600 to-blue-600"
                />
              </div>
              
              <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                Approximately {result.percentageCovered}% of tuition covered
              </div>
            </div>
            
            <div className="mb-6">
              <h5 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Eligibility Status:</h5>
              <div className={`flex items-center text-sm ${result.isEligible ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d={result.isEligible ? "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" : "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"} clipRule="evenodd" />
                </svg>
                {result.isEligible ? 'You are likely eligible for scholarship' : 'You may not be eligible for scholarship'}
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">Recommended Universities:</h5>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {result.recommendedUniversities.map((university, index) => (
                  <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-indigo-500 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {university}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                This is an estimate only. Actual scholarship amounts may vary based on university-specific criteria and available funding.
              </p>
              
              <button
                onClick={() => setResult(null)}
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium transition-colors duration-300"
              >
                Calculate again
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ScholarshipCalculator; 