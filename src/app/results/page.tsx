"use client";

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { Trophy, Star, Medal } from 'lucide-react';

interface Topper {
  _id?: string;
  name: string;
  class: string;
  score: string;
  subject: string;
  image: string;
}

const Results = () => {
  const [toppers, setToppers] = useState<Topper[]>([]);

  useEffect(() => {
    fetch('/api/results')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setToppers(data.data);
        }
      })
      .catch(err => console.error("Failed to fetch results", err));
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="py-20 bg-gradient-to-b from-white to-blue-50 min-h-screen relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-50"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-40 -left-20 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block p-4 bg-yellow-100 rounded-full mb-6 shadow-lg transform rotate-3 hover:rotate-6 transition-transform">
            <Trophy className="w-10 h-10 text-yellow-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Our <span className="text-primary">Success Stories</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Celebrating excellence and hard work of our top achievers.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {[
            { label: "Students Taught", value: "500+" },
            { label: "Success Rate", value: "98%" },
            { label: "90%+ Scorers", value: "50+" },
            { label: "Years Experience", value: "18+" }
          ].map((stat, i) => (
            <div key={i} className="text-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {toppers.length === 0 ? (
            <div className="col-span-4 text-center py-10 text-gray-500">
              No results to display yet.
            </div>
          ) : (
            toppers.map((student, index) => (
            <motion.div
              key={student._id || index}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 group"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={student.image} 
                  alt={student.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 font-bold px-3 py-1 rounded-full text-xs shadow-lg flex items-center gap-1 transform rotate-3 group-hover:rotate-0 transition-transform">
                  <Star size={12} className="fill-current" />
                  Topper
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-0.5">{student.name}</h3>
                  <p className="text-gray-200 text-sm">{student.class}</p>
                </div>
              </div>
              <div className="p-6 text-center bg-white relative">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white p-1.5 rounded-full shadow-lg">
                   <div className="bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg border-4 border-white">
                      <Medal size={24} />
                   </div>
                </div>
                
                <div className="mt-6">
                  <div className="text-4xl font-extrabold text-gray-800 mb-1 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                    {student.score}
                  </div>
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Score</div>
                  <p className="text-gray-700 font-medium bg-gray-50 py-2 px-4 rounded-lg inline-block text-sm">
                    {student.subject}
                  </p>
                </div>
              </div>
            </motion.div>
          )))}
        </motion.div>

        {/* Motivational Quote */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto bg-primary/5 p-8 rounded-3xl"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Join the League of Toppers</h3>
          <p className="text-gray-600 mb-8">
            At Achieve Smart Academy, we believe every student has the potential to excel. 
            With the right guidance and dedication, you can be our next success story.
          </p>
          <button className="bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
            Start Your Journey
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Results;
