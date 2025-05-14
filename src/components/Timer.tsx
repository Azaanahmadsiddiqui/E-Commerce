"use client";

import React, { useState, useEffect } from "react";

const LiveDataTime = () => {
  const [timeLeft, setTimeLeft] = useState({
    days:0,
    hours:0,
    minutes:0,
    seconds:0,
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if(difference <= 0) {
         clearInterval(timerInterval);
         setTimeLeft({days:0, hours:0, minutes:0, seconds:0});
         return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds});
    };

    const timerInterval = setInterval(updateTimer, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  return (
       <div className="flex justify-center items-center space-x-4">
          <div className="flex flex-col items-center">
            <span className="text-gray-500 text-xs">Days</span>
            <span className="text-3xl font-bold">{timeLeft.days.toString().padStart(2, "0")}</span>
          </div>
          <span className="text-brandPrimary text-lg font-bold">:</span>
          <div className="flex flex-col items-center">
            <span className="text-gray-500 text-xs">Hours</span>
            <span className="text-3xl font-bold">{timeLeft.hours.toString().padStart(2, "0")}</span>
          </div>
          <span className="text-brandPrimary text-lg font-bold">:</span>
          <div className="flex flex-col items-center">
            <span className="text-gray-500 text-xs">Minutes</span>
            <span className="text-3xl font-bold">{timeLeft.minutes.toString().padStart(2, "0")}</span>
          </div>
          <span className="text-brandPrimary text-lg font-bold">:</span>
          <div className="flex flex-col items-center">
            <span className="text-gray-500 text-xs">Seconds</span>
            <span className="text-3xl font-bold">{timeLeft.seconds.toString().padStart(2, "0")}</span>
          </div>
       </div>
  );
  
};

export default LiveDataTime