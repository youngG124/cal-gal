import React, { useState, useEffect } from "react";
import DayCell from "./DayCell.tsx";

const Calendar: React.FC = () => {
const [currentDate, setCurrentDate] = useState(() => new Date());
const [ photoMap, setPhotoMap ] = useState<{ [date: string]: string }>({});

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

const handlePhotoUpload = (date: string, url?: string) => {
  // url이 undefined면 삭제된 거라고 간주
  if (url) {
    setPhotoMap(prev => ({ ...prev, [date]: url }));
  } else {
    // 삭제된 경우에는 제거
    setPhotoMap(prev => {
      const copy = { ...prev };
      delete copy[date];
      return copy;
    });
  }
}

useEffect(() => {
  const loadExistingPhotos = async () => {
    const newPhotoMap : { [date: string]: string } = {};
    const today = new Date();

    for (let i=1; i <= daysInMonth; i++) {
      const fullDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      const dateObj = new Date(fullDate);

      if (dateObj > today) continue;

      const url = `http://localhost/image/${fullDate}`;

      try {
        // 이미지가 실제 존재하는지 HEAD 요청으로 확인
        const res = await fetch(url, { method: "HEAD" });
        if (res.ok) {
          newPhotoMap[fullDate] = url;
        }
      } catch (err) {
        // 이미지가 없으면 무시
      }
    }
    
    setPhotoMap(newPhotoMap);
  };

  loadExistingPhotos();
}, [year, month, daysInMonth]);

const blankCells = Array.from({ length: startWeekday }, (_, i) => (
  <div key={`blank-${i}`} />
));

const dayCells = Array.from({ length: daysInMonth }, (_, i) => {
  const date = i + 1;
  const fullDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(
    date
  ).padStart(2, "0")}`;
  const isToday = fullDate === todayStr;

  return <DayCell
    key={fullDate}
    date={fullDate}
    isToday={isToday}
    photoUrl={photoMap[fullDate]}
    onPhotoUpload={handlePhotoUpload}
  />;
});

  return (
    <div className="font-serif flex flex-col items-center">
      {/* 월 이동 버튼 */}
      <div className="flex items-center gap-4 mb-4">
        <button onClick={goToPrevMonth} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
          ←
        </button>
        <div className="text-lg">
          {year}년 {month + 1}월
        </div>
        <button onClick={goToNextMonth} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
          →
        </button>
      </div>

      {/* 달력 */}
      <div className="grid grid-cols-7 gap-[3px] w-full max-w-screen-lg p-4" style={{ height:"80vh" }}>
        {blankCells}
        {dayCells}
      </div>
    </div>
  );
};

export default Calendar;