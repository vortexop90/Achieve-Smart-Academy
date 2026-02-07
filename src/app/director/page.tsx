"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap, Quote } from 'lucide-react';

interface DirectorData {
  name: string;
  role: string;
  image: string;
  qualifications: string;
  experience: string;
  message: string;
}

const Director = () => {
  const [director, setDirector] = useState<DirectorData>({
    name: "Dr. Rajesh Kumar",
    role: "Founder & Director",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    qualifications: "M.Sc. Mathematics, M.A. English, B.Ed., ADCA",
    experience: "18 Years as Mathematics Teacher, Academic Coordinator, and Vice Principal",
    message: "Education is not just about scoring marks, it's about building character, developing critical thinking, and preparing students for life's challenges. At Achieve Smart Academy, we are committed to nurturing every student's potential through personalized attention and innovative teaching methods."
  });

  useEffect(() => {
    fetch('/api/director')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          // If array, take first; if object, take it
          const dirData = Array.isArray(data.data) ? data.data[0] : data.data;
          if (dirData) {
            setDirector(dirData);
          }
        }
      })
      .catch(err => console.error("Failed to fetch director info", err));
  }, []);

  return (
    <div className="py-20 bg-gray-50 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-full min-h-[500px] lg:min-h-full">
              <motion.div 
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0"
              >
                <img 
                  src={director.image} 
                  alt="Director" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent mix-blend-multiply"></div>
              </motion.div>
              
              <div className="absolute bottom-0 left-0 w-full p-10 text-white z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h2 className="text-4xl font-bold mb-2">{director.name}</h2>
                  <p className="text-blue-200 text-lg font-medium tracking-wide uppercase">{director.role}</p>
                  <div className="w-20 h-1 bg-blue-400 mt-6 rounded-full"></div>
                </motion.div>
              </div>
            </div>
            
            <div className="p-10 lg:p-16 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center space-x-3 mb-8">
                  <span className="h-px w-12 bg-primary"></span>
                  <span className="text-primary font-bold uppercase tracking-wider text-sm">Meet Our Director</span>
                </div>
                
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                  Leading with vision, <span className="text-primary">teaching with passion</span>
                </h3>
                
                <div className="space-y-8 mb-10">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-start space-x-5 group"
                  >
                    <div className="bg-blue-50 p-3 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <GraduationCap className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">Qualifications</h4>
                      <p className="text-gray-600">{director.qualifications}</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-start space-x-5 group"
                  >
                    <div className="bg-blue-50 p-3 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <Briefcase className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">Experience</h4>
                      <p className="text-gray-600">{director.experience}</p>
                    </div>
                  </motion.div>
                </div>

                <div className="relative bg-blue-50 p-8 rounded-2xl">
                  <Quote className="absolute top-4 left-4 w-8 h-8 text-blue-200 rotate-180" />
                  <p className="italic text-gray-700 text-lg relative z-10 pl-6">
                    "{director.message}"
                  </p>
                  <p className="text-right mt-4 font-bold text-primary">- Words of Wisdom</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Vision, Values, Commitment Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
          {[
            {
              title: "Our Vision",
              content: "To be the leading educational institution that transforms students into confident, knowledgeable individuals ready to excel in their academic and professional lives.",
              color: "bg-blue-500",
              delay: 0.2
            },
            {
              title: "Our Values",
              content: "Integrity, excellence, innovation, and dedication drive everything we do. We believe in nurturing not just academic skills but also character and values.",
              color: "bg-indigo-500",
              delay: 0.4
            },
            {
              title: "Our Commitment",
              content: "Personalized attention, quality teaching materials, regular assessments, and continuous support to ensure every student reaches their full potential.",
              color: "bg-purple-500",
              delay: 0.6
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: item.delay }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-t-4 border-primary"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Director;
