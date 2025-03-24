import React, { useState } from "react";
import DayCell from "./DayCell.tsx";

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(() => new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0~11

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(
    today.getDate()
  ).padStart(2, "0")}`;

  const firstDayOfMonth = new Date(year, month, 1);
  const startWeekday = firstDayOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const goToPrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const blankCells = Array.from({ length: startWeekday }, (_, i) => (
    <div key={`blank-${i}`} />
  ));

  const dayCells = Array.from({ length: daysInMonth }, (_, i) => {
    const date = i + 1;
    const fullDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      date
    ).padStart(2, "0")}`;
    const isToday = fullDate === todayStr;

    return <DayCell key={fullDate} date={fullDate} isToday={isToday} />;
  });

  return (
    <div className="flex flex-col items-center">
      {/* 월 이동 버튼 */}
      <div className="flex items-center gap-4 mb-4">
        <button onClick={goToPrevMonth} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
          ← 이전 달
        </button>
        <div className="font-semibold text-lg">
          {year}년 {month + 1}월
        </div>
        <button onClick={goToNextMonth} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
          다음 달 →
        </button>
      </div>

      {/* 달력 */}
      <div className="grid grid-cols-7 gap-3 p-4 bg-gray-50 rounded-lg" style={{ maxWidth: "700px", width: "100%" }}>
        {blankCells}
        {dayCells}
      </div>
    </div>
  );
};

export default Calendar;