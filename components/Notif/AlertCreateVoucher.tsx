"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type props = {
  title: string
}

export default function AlertsCreateVoucher({title}: props) {
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
      window.location.replace("/dashboard/admin/voucher")
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
      <div className="bg-slate-100 relative px-4 py-3 shadow-md rounded-b">
        <div
          className="absolute top-0 left-0 bg-teal-500 h-1"
          style={{ width: `${progress}%` }}></div>
        <div className="flex items-center">
          <svg
            className="h-6 w-6 text-teal-500 mr-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
          </svg>
          <div>
            <p className="font-bold text-teal-900">Success</p>
            <p className="text-sm text-teal-900">
              Anda berhasil menambahkan {title}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
