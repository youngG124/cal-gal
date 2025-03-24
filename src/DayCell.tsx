import React, { useRef } from "react";
import axios from "axios";

type DayCellProps = {
  date: string;
  photoUrl?: string;
  isToday?: boolean;
  onPhotoUpload?: (date: string, url?: string) => void;
};

function DayCell({ date, photoUrl, isToday = false, onPhotoUpload }: DayCellProps) {
  const day = new Date(date).getDay(); // 0 (Sun) ~ 6 (Sat)
  const isSunday = day === 0;
  const isSaturday = day === 6;
  const dayNumber = date.split("-")[2]; // "24" 이런 식

  const fileInputRef = useRef<HTMLInputElement>(null);

  const cellClass = `relative w-24 h-24 border rounded-lg overflow-hidden flex items-center justify-center cursor-pointer transition-all duration-200 ${
    isToday ? "bg-yellow-200 border-yellow-400" : "bg-white"
  }`;

  const handleClick = () => {
    fileInputRef.current?.click();
  }

  const handleRightClick = async (e : React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!photoUrl) return;

    const confirmDelete = window.confirm("Do you want to delete this image?");
    if (!confirmDelete) return;

    console.log('deleting : ' + date);

    try {
      const res = await axios.delete(`http://localhost:4000/delete/${date}`);
      console.log(res.data);
      onPhotoUpload?.(date, undefined);
    } catch (err) {
      console.error(err);
      alert("delete failed, err : " + err);
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("date", date);

    try {
      const res = await axios.post(`http://localhost:4000/upload/${date}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res.data);
      const fileUrl = `http://localhost:4000/uploads/${date}${getExtension(file.name)}`;
      onPhotoUpload?.(date, fileUrl);
    } catch (err) {
      console.error(err);
      alert("upload failed");
    }
  };

  // 확장자 유지 함수
const getExtension = (filename: string) => {
  const dotIndex = filename.lastIndexOf(".");
  return dotIndex !== -1 ? filename.substring(dotIndex) : ".jpg";
};

  return (
    <div onClick={handleClick} onContextMenu={handleRightClick} className={cellClass}>
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

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none"}}
      />
    </div>
  );
}
  
export default DayCell;