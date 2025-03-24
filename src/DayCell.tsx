type DayCellProps = {
    date: string;
    photoUrl?: string;
    onClick?: () => void;
    isToday?: boolean;
  };
  
  function DayCell({ date, photoUrl, onClick, isToday = false }: DayCellProps) {
    const cellClass = `w-24 h-24 border rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 ${
      isToday ? "bg-yellow-200 border-yellow-400 font-bold" : "bg-white"
    }`;
  
    return (
      <div onClick={onClick} className={cellClass}>
        {photoUrl ? (
          <img src={photoUrl} alt="사진" className="w-full h-full object-cover rounded-lg" />
        ) : (
          <span className="text-sm text-gray-700">{date.split("-")[2]}</span>
        )}
      </div>
    );
  }
  
  export default DayCell;
  