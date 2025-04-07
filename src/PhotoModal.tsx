// components/PhotoModal.tsx
import React from "react";

type PhotoModalProps = {
  photoUrl: string;
  onClose: () => void;
  date: string;
};

const PhotoModal = ({ photoUrl, onClose, date }: PhotoModalProps) => {

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-4 max-w-xl max-h-[80vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={photoUrl} alt={`Photo for ${date}`} className="w-full h-auto rounded mb-4" />
        
        {/* 댓글 기능은 이후 추가 */}
        <div className="text-sm text-gray-600">💬 댓글 기능 예정</div>
      </div>
    </div>
  );
};

export default PhotoModal;