"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, BookOpen, Star, Zap, ArrowRight } from 'lucide-react';

interface Course {
  _id: string;
  title: string;
  description: string;
  duration: string;
  features: string[];
  level: string;
  image: string;
  color?: string;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCourses(data.data);
        }
      })
      .catch(err => console.error("Failed to fetch courses", err));
  }, []);

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Our Courses
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Comprehensive coaching programs designed to build strong foundations and achieve academic excellence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col group"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border border-white/30">
                    {course.level}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6 line-clamp-2">{course.description}</p>
                
                <div className="space-y-4">
                  <div className="flex items-center text-sm font-medium text-gray-500 bg-gray-50 p-3 rounded-lg">
                    <Clock size={18} className="mr-2 text-primary" />
                    Duration: {course.duration}
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center text-sm uppercase tracking-wider">
                      <Zap size={16} className="mr-2 text-yellow-500" />
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {course.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-gray-600 text-sm">
                          <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="p-6 pt-0 mt-auto">
                <button className="w-full bg-gray-900 hover:bg-primary text-white py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center group-hover:gap-2">
                  Enquire Now <ArrowRight className="w-0 group-hover:w-5 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Our Courses Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Courses?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We provide the best learning environment for students to excel.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { title: "Expert Faculty", desc: "Learn from experienced teachers with 18+ years of teaching excellence" },
              { title: "Small Batch Size", desc: "Personalized attention with limited students per batch" },
              { title: "Regular Assessments", desc: "Weekly tests and progress tracking to ensure consistent improvement" },
              { title: "Comprehensive Material", desc: "Well-structured study materials covering entire syllabus" },
              { title: "Doubt Clearing Sessions", desc: "Dedicated time for resolving student queries and difficulties" },
              { title: "Proven Track Record", desc: "Consistent results with students scoring 95%+ in board exams" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary rounded-3xl p-12 text-center text-white relative overflow-hidden max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Ready to Excel in Your Studies?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">Join our proven coaching programs and experience the difference.</p>
            <button className="bg-white text-primary px-8 py-3 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
              Get Started Today
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Courses;
