"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Calendar, Book, FileText, AlertCircle } from 'lucide-react';

interface UpdateItem {
  _id?: string;
  title: string;
  date: string;
  type: string;
  category: string;
  description: string;
  isHighlight: boolean;
}

const Updates = () => {
  const [updates, setUpdates] = useState<UpdateItem[]>([]);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const res = await fetch('/api/updates');
        const json = await res.json();
        if (json.success) {
          setUpdates(json.data);
        }
      } catch (err) {
        console.error('Failed to fetch updates', err);
      }
    };
    fetchUpdates();
  }, []);

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
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Test': return 'bg-red-100 text-red-600 border-red-200';
      case 'Homework': return 'bg-green-100 text-green-600 border-green-200';
      case 'Notice': return 'bg-blue-100 text-blue-600 border-blue-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Test': return <FileText size={16} />;
      case 'Homework': return <Book size={16} />;
      case 'Notice': return <Bell size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  return (
    <div className="py-20 bg-gray-50 min-h-screen relative">
       {/* Background pattern */}
       <div className="absolute inset-0 opacity-5 pointer-events-none" 
            style={{ 
              backgroundImage: 'radial-gradient(#3B82F6 1px, transparent 1px)', 
              backgroundSize: '20px 20px' 
            }}>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4 text-primary"
          >
            <Bell className="w-8 h-8" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Daily Updates & Notices
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Stay informed with latest homework, tests, and important announcements.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-white/20 p-2 rounded-lg mr-3">
                   <Bell className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Notice Board</h3>
              </div>
              <div className="flex items-center space-x-1">
                 <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <span className="text-white/90 text-xs font-medium ml-1">Live Updates</span>
              </div>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="p-6 space-y-4"
            >
              {updates.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No updates available at the moment.
                </div>
              ) : (
                updates.map((update, index) => (
                <motion.div 
                  key={update._id || index} 
                  variants={itemVariants}
                  whileHover={{ x: 5, backgroundColor: "rgba(249, 250, 251, 1)" }}
                  className="p-4 rounded-xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${getTypeColor(update.type)}`}>
                          {getTypeIcon(update.type)}
                          {update.type}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center">
                          <Calendar size={12} className="mr-1" />
                          {new Date(update.date).toLocaleDateString()}
                        </span>
                        {update.isHighlight && (
                          <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold animate-pulse">
                            NEW
                          </span>
                        )}
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                        {update.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {update.description}
                      </p>
                    </div>
                    
                    <div className="flex-shrink-0">
                       <button className="text-primary text-sm font-medium hover:underline flex items-center">
                         View Details
                       </button>
                    </div>
                  </div>
                </motion.div>
              )))}
            </motion.div>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-primary">
                <Book size={24} />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Homework</h4>
              <p className="text-sm text-gray-600">Daily assignments and practice exercises</p>
            </div>
            <div className="bg-red-50 p-6 rounded-xl border border-red-100 text-center">
              <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-red-600">
                <FileText size={24} />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Tests</h4>
              <p className="text-sm text-gray-600">Scheduled unit tests and mock exams</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl border border-green-100 text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-green-600">
                <Bell size={24} />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Notices</h4>
              <p className="text-sm text-gray-600">Important announcements and holidays</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Updates;
