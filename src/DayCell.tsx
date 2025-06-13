import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import PhotoModal from "./PhotoModal.tsx";

type DayCellProps = {
  date: string;
  photoUrl?: string;
  isToday?: boolean;
  onPhotoUpload?: (date: string, url?: string) => void;
  password: string;
};

function DayCell({ date, photoUrl, isToday = false, onPhotoUpload, password }: DayCellProps) {
  const day = new Date(date).getDay(); // 0 (Sun) ~ 6 (Sat)
  const isSunday = day === 0;
  const isSaturday = day === 6;
  const dayNumber = date.split("-")[2]; // "24" 이런 식

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {

    const cellDate = new Date(date);
    const today = new Date();

    if (cellDate > today) return;

    if(photoUrl) {
      setShowModal(true);
    } else {
      fileInputRef.current?.click();
    }    
  }

  const handleRightClick = async (e : React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!photoUrl) return;

    const confirmDelete = window.confirm("Do you want to delete this image?");
    if (!confirmDelete) return;

    console.log('deleting : ' + date);

    try {
      const res = await axios.delete(`/api/delete/${date}`, {
        headers: {
          "x-access-token": password
        },
      });
      console.log(res.data);
      onPhotoUpload?.(date, undefined);
    } catch (err) {
      console.error(err);
      alert("delete failed, err : " + err);
    }
  }

  useEffect(() => {
    if(!showModal) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowModal(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("date", date);

    try {
      const res = await axios.post(`/api/upload/${date}`, formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          "x-access-token": password
        },
      });
      console.log(res.data);
      const timestamp = new Date().getTime(); // 현재 시간(ms)
      const fileUrl = `/api/image/${date}?t=${timestamp}`;
      onPhotoUpload?.(date, fileUrl);
    } catch (err) {
      console.error(err);
      alert("upload failed : " + err);
    }
  };  

  const cellClass = `min-w-[45px]
  relative w-full rounded-xl overflow-hidden shadow-sm border border-gray-200 
  ${isToday ? "bg-yellow-200 border-yellow-400" : ""}
  ${showModal ? "" : "hover:scale-[1.02] hover:shadow-md transition-transform duration-200"}
  cursor-pointer
  `;

  return (
    <>
      <div onClick={handleClick} onContextMenu={handleRightClick} className={cellClass}>
        <span
          className={`absolute top-1 left-1 text-xs drop-shadow-sm font-medium z-10
            ${isSunday ? "text-red-500" : isSaturday ? "text-blue-500" : "text-gray-600"}`}>
          {dayNumber}
        </span>

        {/* 이미지 */}
        {photoUrl && (
          <img
            src={photoUrl}
            alt="사진"
            className="absolute w-full h-full object-cover rounded-lg z-0"
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

      {showModal && photoUrl && (
        <PhotoModal
          photoUrl={photoUrl}
          date={date}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
  
export default DayCell;