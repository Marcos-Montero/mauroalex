import React, { ChangeEvent, useEffect, useState } from "react";

export const DurationInput = ({
  onChange,
  defaultValue,
}: {
  onChange: (duration: number) => void;
  defaultValue?: number;
}) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const handleHoursChange = (e: ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInt(e.target.value.replace(/^0+/, ""));
    const value = !parsed ? 0 : parsed >= 24 ? 23 : parsed < 0 ? 0 : parsed;
    setHours(value);
  };
  const handleMinutesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInt(e.target.value.replace(/^0+/, ""));

    const value = !parsed ? 0 : parsed >= 60 ? 59 : parsed < 0 ? 0 : parsed;
    setMinutes(value);
  };
  const handleSecondsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInt(e.target.value.replace(/^0+/, ""));

    const value = !parsed ? 0 : parsed >= 60 ? 59 : parsed < 0 ? 0 : parsed;
    setSeconds(value);
  };

  useEffect(() => {
    if (!defaultValue) return;
    setHours(Math.floor(defaultValue / 3600));
    setMinutes(Math.floor((defaultValue % 3600) / 60));
    setSeconds(defaultValue % 60);
  }, [defaultValue]);
  useEffect(() => {
    const newSum = hours * 3600 + minutes * 60 + seconds;
    onChange(newSum);
  }, [hours, minutes, seconds, onChange]);
  return (
    <div className="flex">
      <div className="relative">
        <input
          type="number"
          name="hours"
          max={24}
          min={0}
          value={hours}
          onChange={handleHoursChange}
          className="bg-white/10 p-1 text-center backdrop-blur-xl focus:outline-none "
        />
        <label
          htmlFor="hours"
          className="absolute top-[-5px] left-[10px] text-[8px] bg-white/10"
        >
          H
        </label>
      </div>
      :
      <div className="relative">
        <input
          type="number"
          name="minutes"
          max={60}
          min={0}
          value={minutes}
          onChange={handleMinutesChange}
          className="bg-white/10 p-1 text-center backdrop-blur-xl focus:outline-none "
        />
        <label
          htmlFor="minutes"
          className="absolute top-[-5px] left-[10px] text-[8px] bg-white/10"
        >
          M
        </label>
      </div>
      :
      <div className="relative">
        <input
          type="number"
          name="seconds"
          max={60}
          min={0}
          value={seconds}
          onChange={handleSecondsChange}
          className="bg-white/10 p-1 text-center backdrop-blur-xl focus:outline-none "
        />
        <label
          htmlFor="seconds"
          className="absolute top-[-5px] left-[10px] text-[8px] bg-white/10"
        >
          S
        </label>
      </div>
    </div>
  );
};
