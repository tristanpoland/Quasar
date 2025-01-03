import React, { useState, useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';
import { FileTree } from './FileTree';

export const FileExplorer = ({
  files,
  expandedFolders,
  onFileSelect,
  onFolderToggle,
  sidebarWidth,
  setSidebarWidth
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const dragRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sidebarWidth);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newWidth = Math.max(200, Math.min(400, e.pageX - startX));
    setSidebarWidth(newWidth);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div
      className="bg-black border-r border-gray-900 flex flex-col relative"
      style={{ width: `${sidebarWidth}px` }}
      ref={dragRef}
    >
      <div className="p-4 text-xs text-gray-400 font-medium flex items-center justify-between">
        <span>EXPLORER</span>
        <Plus
          size={16}
          className="text-gray-400 hover:text-white cursor-pointer"
          onClick={() => {/* TODO: Add new file creation */}}
        />
      </div>
      <FileTree
        items={files}
        expandedFolders={expandedFolders}
        onFileSelect={onFileSelect}
        onFolderToggle={onFolderToggle}
      />
      <div
        className="absolute h-full w-1 right-0 top-0 cursor-ew-resize hover:bg-indigo-500/20"
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default FileExplorer;