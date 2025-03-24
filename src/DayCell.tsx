// src/DayCell.tsx
type DayCellProps = {
    date: string;
    photoUrl?: string;
    onClick?: () => void;
  };
  
  function DayCell({ date, photoUrl, onClick }: DayCellProps) {
    return (
      <div
        onClick={onClick}
        className="w-24 h-24 border border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:shadow-md transition-all duration-200"
      >
        {photoUrl ? (
          <img
            src={photoUrl}
            alt="사진"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <span className="text-sm text-gray-600">{date}</span>
        )}
      </div>
    );
  }
  
  export default DayCell;  