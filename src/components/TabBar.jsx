import React from 'react';
import { FileCode, X, Columns } from 'lucide-react';

export const TabBar = ({
  openFiles,
  activeFile,
  onFileSelect,
  onFileClose,
  onSplitViewToggle
}) => {
  const getFileName = (path) => path?.split('/').pop() || '';

  return (
    <div className="flex items-center px-2 h-12 border-b border-gray-900 gap-2 overflow-x-auto">
      {openFiles.map(file => (
        <div
          key={file}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer whitespace-nowrap
            ${activeFile === file ? 'bg-gray-900' : 'hover:bg-gray-900/50'}`}
          onClick={() => onFileSelect(file)}
        >
          <FileCode size={16} className="text-violet-400 shrink-0" />
          <span className="text-sm">{getFileName(file)}</span>
          <X
            size={14}
            className="text-gray-500 hover:text-white shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              onFileClose(file);
            }}
          />
        </div>
      ))}
      <button
        className="ml-auto p-2 hover:bg-gray-900 rounded-lg shrink-0"
        onClick={onSplitViewToggle}
      >
        <Columns size={16} className="text-gray-400" />
      </button>
    </div>
  );
};

export default TabBar;