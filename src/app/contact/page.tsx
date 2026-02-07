"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle, Clock, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="py-20 bg-white min-h-screen relative overflow-hidden">
       {/* Background Decoration */}
       <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -skew-x-12 transform translate-x-20 -z-10" />
       <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -z-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Get In Touch
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Have questions? We're here to help you start your learning journey
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
              
              <h3 className="text-2xl font-bold text-gray-900 mb-8 relative">Contact Information</h3>
              <p className="text-gray-600 mb-8 relative">Reach out to us through any of the following channels. We're always happy to answer your questions and provide guidance.</p>
              
              <div className="space-y-8 relative">
                <div className="flex items-start space-x-4 group/item">
                  <div className="bg-blue-50 p-4 rounded-xl text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors duration-300">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Address</h4>
                    <p className="text-gray-600 leading-relaxed">123, Education Street, Sector 15,<br />Noida, Uttar Pradesh - 201301</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group/item">
                  <div className="bg-blue-50 p-4 rounded-xl text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors duration-300">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Phone</h4>
                    <p className="text-gray-600 font-medium hover:text-primary transition-colors cursor-pointer">+91 98765 43210</p>
                    <div className="flex items-center mt-1 text-green-600">
                      <MessageCircle size={16} className="mr-1" />
                      <span className="text-sm font-medium">WhatsApp: +91 98765 43210</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group/item">
                  <div className="bg-blue-50 p-4 rounded-xl text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors duration-300">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600 hover:text-primary transition-colors cursor-pointer">info@achievesmartacademy.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group/item">
                  <div className="bg-blue-50 p-4 rounded-xl text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors duration-300">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Office Hours</h4>
                    <div className="text-gray-600">
                      <p className="font-medium">Monday - Saturday</p>
                      <p>8:00 AM - 8:00 PM</p>
                      <p className="text-sm text-gray-500 mt-1">Regular classes and consultation</p>
                    </div>
                    <div className="mt-2">
                      <p className="font-medium text-gray-900">Sunday</p>
                      <p className="text-red-500">Closed</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    <span className="font-bold text-gray-700">Emergency?</span> Contact via phone/WhatsApp
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-gray-200 h-64 rounded-2xl overflow-hidden relative shadow-lg border-4 border-white"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.066497743589!2d77.02663831508246!3d28.62777098241948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d04b6b6b6b6b6%3A0x6b6b6b6b6b6b6b6b!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1625641234567!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                title="Google Maps"
                className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              ></iframe>
            </motion.div>
          </motion.div>

          {/* Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h3>
            <p className="text-gray-600 mb-8">We'll respond within 24 hours</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-1">Class/Grade</label>
                  <select 
                    id="class" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                  >
                    <option value="">Select Class</option>
                    <option value="9">Class 9th</option>
                    <option value="10">Class 10th</option>
                    <option value="11">Class 11th</option>
                    <option value="12">Class 12th</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none bg-gray-50 focus:bg-white"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={formStatus !== 'idle'}
                className={`w-full font-bold py-4 rounded-lg transition-all flex items-center justify-center shadow-lg ${
                  formStatus === 'success' 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-primary hover:bg-blue-600 text-white'
                }`}
              >
                {formStatus === 'submitting' ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : formStatus === 'success' ? (
                  <span className="flex items-center">
                    Message Sent! <CheckCircle className="ml-2" />
                  </span>
                ) : (
                  <span className="flex items-center">
                    Send Message <Send size={18} className="ml-2" />
                  </span>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
