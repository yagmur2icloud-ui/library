import React from 'react'

const Loading:React.FC = () => {
  return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-sm text-gray-500">Yükleniyor...</p>
        </div>
      </div>
    );
}

export default Loading
