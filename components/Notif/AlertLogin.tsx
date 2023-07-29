"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Props = {
    submitError: string
}

export default function AlertsLogin({submitError}:Props) {
  const [showAlert, setShowAlert] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    const updateProgress = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 3000 - elapsedTime);
      const percentage = (remainingTime / 3000) * 100;
      setProgress(percentage);
    };

    const startTime = Date.now();
    const interval = setInterval(updateProgress, 10);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!showAlert) {
      window.location.reload();
    }
  }, [showAlert]);

  if (!showAlert) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <div className="bg-opacity-70 backdrop-filter backdrop-blur-xl backdrop-brightness-110 shadow-xl rounded-b p-4">
        <div className="absolute top-0 left-0 bg-red-500 h-1" style={{ width: `${progress}%` }}></div>
        <div className="flex items-center">
          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="h-6 w-6 text-red-500 mr-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <motion.path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 11 14H9a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 10 19Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </motion.svg>
          <div>
            <p>Error</p>
            <p>{submitError}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
