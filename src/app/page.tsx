"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Trophy, Star, Target, Zap } from 'lucide-react';
import Image from 'next/image';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 lg:py-32">
        {/* Background Image & Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-gray-900"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" 
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/60"></div>
        </div>

        {/* Abstract Shapes (Subtle) */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
           <motion.div 
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20"
          />
          <motion.div 
            animate={{ 
              y: [0, 20, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:w-1/2 space-y-8"
            >
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-blue-100 font-medium text-sm mb-2"
              >
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> 
                <span>Your Success, Our Mission</span>
              </motion.div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Welcome to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Achieve Smart Academy</span>
              </h1>
              
              <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
                We are committed to providing quality education with a focus on concept clarity and student success. With 18 years of teaching excellence, our experienced faculty ensures personalized attention to every student, helping them achieve their academic goals.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/contact" className="bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30 hover:-translate-y-1 flex items-center">
                  Enroll Now <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link href="/courses" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-xl font-bold transition-all hover:-translate-y-1">
                  View Courses
                </Link>
              </div>
            </motion.div>
            
            {/* Right Content - Glassmorphism Cards */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 relative h-[500px] hidden lg:block"
            >
              {/* Central Abstract Element */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
              
              {/* Floating Card 1: Toppers */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-10 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-2xl w-64"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-green-500/20 p-3 rounded-xl">
                    <Trophy className="w-8 h-8 text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-200 uppercase tracking-wider">Achievements</p>
                    <p className="text-xl font-bold text-white">100% Results</p>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-green-400 w-full rounded-full"></div>
                </div>
              </motion.div>

              {/* Floating Card 2: Students */}
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 left-10 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-2xl w-72"
              >
                 <div className="flex items-center gap-4">
                  <div className="bg-blue-500/20 p-3 rounded-xl">
                    <Users className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-200 uppercase tracking-wider">Community</p>
                    <p className="text-xl font-bold text-white">500+ Students</p>
                  </div>
                </div>
                 <div className="flex -space-x-3 mt-4">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white/10 bg-gray-300 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${10+i}`} alt="student" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white/10 bg-blue-600 flex items-center justify-center text-xs text-white font-bold">
                    +
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 3: Rating */}
              <motion.div 
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-1/2 right-0 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-xl shadow-xl transform translate-x-4"
              >
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                  <span className="text-white font-bold">5.0</span>
                </div>
                <p className="text-xs text-blue-200 mt-1">Parent Reviews</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Down Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white/50 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We are committed to student success through our proven teaching methodologies.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: <Users className="w-8 h-8 text-blue-500" />,
                title: "Experienced Faculty",
                description: "18+ years of teaching excellence"
              },
              {
                icon: <Trophy className="w-8 h-8 text-yellow-500" />,
                title: "Proven Results",
                description: "Consistent high achievers and toppers"
              },
              {
                icon: <Zap className="w-8 h-8 text-indigo-500" />,
                title: "Concept Clarity",
                description: "Focus on deep understanding"
              },
              {
                icon: <Target className="w-8 h-8 text-purple-500" />,
                title: "Personalized Attention",
                description: "Small batches for better learning"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group text-center"
              >
                <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {React.cloneElement(feature.icon as React.ReactElement, { className: "w-8 h-8 group-hover:text-white transition-colors" })}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">Join us today and experience personalized coaching that transforms learning into success.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/contact" className="bg-white text-primary hover:bg-gray-100 px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                Enquire Now
              </Link>
              <Link href="/courses" className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all hover:-translate-y-1">
                Explore Courses
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
