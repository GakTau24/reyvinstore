"use client"
import React, { useState, useEffect } from "react";

export default function Alerts() {
  const [showAlert, setShowAlert] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  if (!showAlert) {
    return null;
  }
  return (
    <div
      className="bg-orange-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg"
      role="alert"
    >
      <p className="font-bold">Warning</p>
      <p>Anda Berhasil menghapus data.</p>
    </div>
  );
}
