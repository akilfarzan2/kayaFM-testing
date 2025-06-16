import React from 'react';
import { motion } from 'framer-motion';

export default function BlankPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
        <p className="text-gray-500 text-lg">Please scan the QR code to access the attendance system</p>
      </motion.div>
    </div>
  );
}