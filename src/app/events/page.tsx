"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Trophy, Star, Sparkles } from 'lucide-react';

interface Event {
  _id?: string;
  title: string;
  date: string;
  type?: string;
  description: string;
  location?: string;
  status?: string;
}

const Events = () => {
  const [recentEvents, setRecentEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const fetchedEvents: Event[] = data.data;
          
          const newUpcoming = fetchedEvents.filter(e => 
            e.status === 'Upcoming' || e.status === 'Coming Soon'
          );
          
          const newRecent = fetchedEvents.filter(e => 
            e.status !== 'Upcoming' && e.status !== 'Coming Soon'
          );

          setUpcomingEvents(newUpcoming);
          setRecentEvents(newRecent);
        }
      })
      .catch(err => console.error("Failed to fetch events", err));
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
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
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
            className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full mb-4 text-purple-600"
          >
            <Sparkles className="w-8 h-8" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Events & Celebrations
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Celebrating achievements, milestones, and creating memorable moments together.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Events */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 h-full flex flex-col"
          >
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-white/20 p-2 rounded-lg mr-3">
                   <Trophy className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Recent Events</h3>
              </div>
            </div>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="p-6 space-y-6 flex-grow"
            >
              {recentEvents.length === 0 && (
                  <p className="text-center text-gray-500 py-4">No recent events to display.</p>
              )}
              {recentEvents.map((event, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  whileHover={{ x: 5, backgroundColor: "rgba(249, 250, 251, 1)" }}
                  className="border-b border-gray-100 last:border-0 pb-6 last:pb-0 group rounded-lg p-2 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">{event.title}</h4>
                    <span className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-full whitespace-nowrap border border-purple-100">
                      {event.type}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                  <div className="flex items-center text-gray-400 text-xs">
                    <Calendar size={12} className="mr-1" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 h-full flex flex-col"
          >
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 flex items-center">
              <div className="bg-white/20 p-2 rounded-lg mr-3">
                <Calendar className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Upcoming Events</h3>
            </div>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="p-6 space-y-4 flex-grow"
            >
              {upcomingEvents.length === 0 && (
                  <p className="text-center text-gray-500 py-4">No upcoming events scheduled.</p>
              )}
              {upcomingEvents.map((event, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="bg-blue-50/50 rounded-xl p-5 border border-blue-100 hover:shadow-md transition-all relative overflow-hidden"
                >
                  {event.status === "Coming Soon" && (
                    <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 rounded-bl-lg uppercase tracking-wider">
                      Coming Soon
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-2 mb-3">
                    <h4 className="font-bold text-gray-900 text-lg">{event.title}</h4>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1 text-blue-500" />
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                      {event.location && (
                        <span className="flex items-center">
                            <MapPin size={14} className="mr-1 text-red-500" />
                            {event.location}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm bg-white p-3 rounded-lg border border-gray-100">
                    {event.description}
                  </p>
                </motion.div>
              ))}
              
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-center">
                 <p className="text-blue-700 font-medium text-sm flex items-center">
                   <Star className="w-4 h-4 mr-2" />
                   Stay tuned for more updates!
                 </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Events;
