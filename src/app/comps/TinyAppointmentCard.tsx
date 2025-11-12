import React, { useEffect, useState } from 'react'

const TinyAppointmentCard = ({
  doctorName,
  time,
  date,
}: {
  doctorName: string;
  time: string;
  date: string;
}) => {
  // Combine date and time into a single ISO string
  // date: "2025-10-20T00:00:00.000Z", time: "10:00"
  // Desired: "2025-10-20T10:00:00.000Z"
  const slotDateTimeISO = (() => {
    const datePart = date.split("T")[0]; // "2025-10-20"
    return `${datePart}T${time}:00.000Z`;
  })();

  const slotTime = new Date(slotDateTimeISO);
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const updateTimer = () => {
      if (isNaN(slotTime.getTime())) {
        setTimeLeft("--:--:--");
        return;
      }
      const now = new Date();
      const diff = slotTime.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft("00:00:00");
        return;
      }
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(
        `${hours.toString().padStart(2, '0')}:` +
        `${minutes.toString().padStart(2, '0')}:` +
        `${seconds.toString().padStart(2, '0')}`
      );
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [slotDateTimeISO]);

  return (
    <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg shadow-sm">
      <div className="flex flex-col">
        <span className="font-semibold text-gray-800">{doctorName}</span>
        <span className="text-xs text-gray-500">Doctor</span>
      </div>
      <div className="flex flex-col items-end">
        <span className="font-mono text-lg text-blue-600">{timeLeft}</span>
        <span className="text-xs text-gray-400">Time left</span>
      </div>
    </div>
  );
};

export default TinyAppointmentCard