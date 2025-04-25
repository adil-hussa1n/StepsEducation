import React from 'react';

const steps = [
  {
    number: "1",
    title: "Initial Consultations",
    description: "Our first step is to understand you and your child on an academic and personal level."
  },
  {
    number: "2",
    title: "School & University Search",
    description: "We review our recommended school and university options with you in detail."
  },
  {
    number: "3",
    title: "Application Guidance",
    description: "We deliver expert guidance throughout every step of the process to maximise your chance."
  },
  {
    number: "4",
    title: "Entrance Exams",
    description: "We utilise our resources and network of tutors to help you prepare for exams."
  },
  {
    number: "5",
    title: "Interview Preparation",
    description: "Our admissions specialists work to build your skills and confidence."
  },
  {
    number: "6",
    title: "Portfolio Building",
    description: "Our advisors may suggest extra-curricular activities to improve student profiles."
  }
];

const AdmissionsPathway = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            The Admissions Pathway
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our approach is centred around finding the best options for your child
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-navy text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-navy mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdmissionsPathway; 