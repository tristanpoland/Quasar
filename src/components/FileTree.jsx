import React from 'react';
import { ChevronRight, FileCode, Folder } from 'lucide-react';

export const FileTree = ({ 
  items, 
  path = [], 
  onFileSelect,
  expandedFolders,
  onFolderToggle 
}) => {
  return (
    <div className="text-gray-400 text-sm">
      {Object.entries(items).map(([name, content]) => {
        const currentPath = [...path, name];
        const isFolder = typeof content === 'object';
        const isExpanded = expandedFolders.includes(currentPath.join('/'));

        return (
          <div key={name} className="ml-3">
            <div
              className="flex items-center gap-2 hover:bg-gray-900 py-2 px-3 cursor-pointer rounded-lg group"
              onClick={() => {
                if (isFolder) {
                  onFolderToggle(currentPath.join('/'));
                } else {
                  onFileSelect(name, content, currentPath);
                }
              }}
            >
              {isFolder ? (
                <>
                  <ChevronRight 
                    size={16} 
                    className={`transform transition-transform ${
                      isExpanded ? 'rotate-90' : ''
                    }`} 
                  />
                  <Folder size={16} className="text-indigo-400" />
                </>
              ) : (
                <>
                  <span className="w-4" />
                  <FileCode size={16} className="text-violet-400" />
                </>
              )}
              <span className="group-hover:text-white">{name}</span>
            </div>
            {isFolder && isExpanded && (
              <FileTree
                items={content}
                path={currentPath}
                onFileSelect={onFileSelect}
                expandedFolders={expandedFolders}
                onFolderToggle={onFolderToggle}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
