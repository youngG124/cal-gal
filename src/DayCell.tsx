type DayCellProps = {
    date: string;
    photoUrl?: string;
    onClick?: () => void;
    isToday?: boolean;
  };
  
  function DayCell({ date, photoUrl, onClick, isToday = false }: DayCellProps) {
    const day = new Date(date).getDay(); // 0 (Sun) ~ 6 (Sat)
    const isSunday = day === 0;
    const isSaturday = day === 6;
    const dayNumber = date.split("-")[2]; // "24" 이런 식
  
    const cellClass = `relative w-24 h-24 border rounded-lg overflow-hidden flex items-center justify-center cursor-pointer transition-all duration-200 ${
      isToday ? "bg-yellow-200 border-yellow-400" : "bg-white"
    }`;
  
    return (
      <div onClick={onClick} className={cellClass}>
        {/* 날짜 숫자 */}
        <span
          className={`absolute top-1 left-1 text-xs font-medium ${
            isSunday ? "text-red-500" : isSaturday ? "text-blue-500" : "text-gray-600"    
          }`}
        >
          {dayNumber}
        </span>
  
        {/* 이미지 */}
        {photoUrl && (
          <img
            src={photoUrl}
            alt="사진"
            className="w-full h-full object-cover rounded-lg"
          />
        )}
      </div>
    );
  }
  
  export default DayCell;
  