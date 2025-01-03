import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export const Notifications = ({ notifications }) => {
  return (
    <div className="fixed top-4 right-4 z-50">
      <AnimatePresence>
        {notifications.map(notification => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg mb-2 shadow-lg"
          >
            {notification.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};