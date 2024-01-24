"use client"
import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';

const Count = () => {
  const [status, setStatus] = useState('');

  useEffect(() => {
    const checkTime = () => {
      const jakartaTime = DateTime.now().setZone('Asia/Jakarta');
      const currentTime = jakartaTime.hour;

      if (currentTime >= 10 && currentTime < 21) {
        setStatus('Online (Open Order)');
      } else {
        setStatus('Offline (Close Order)');
      }
    };

    const intervalId = setInterval(checkTime, 1000)
    return () => clearInterval(intervalId);
  }, []);

  const textColor = status === 'Sedang Buka' ? 'text-green-700' : 'text-red-700';

  return (
    <div className='flex justify-center items-center py-3'>
      <h1 className="font-bold text-bold">Status: <span className={`${textColor}`}>{status}</span></h1>
      <p>Open: 10:00 (WIB)</p>
      <p>Close: 21:00 (WIB)</p>
    </div>
  );
};

export default Count;
