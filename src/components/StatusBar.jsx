import React from 'react';
import { GitBranch } from 'lucide-react';

export const StatusBar = ({ activeFile, gitBranch = 'main' }) => {
    const getFileType = (filename) => {
      if (!filename) return 'Plain Text';
      const ext = filename.split('.').pop();
      const typeMap = {
        js: 'JavaScript',
        ts: 'TypeScript',
        jsx: 'React',
        tsx: 'React TypeScript',
        css: 'CSS',
        html: 'HTML',
        json: 'JSON',
        md: 'Markdown',
        py: 'Python',
        rs: 'Rust',
        go: 'Go',
        java: 'Java'
      };
      return typeMap[ext] || 'Plain Text';
    };
   
    return (
      <div className="h-8 bg-black border-t border-gray-900 flex items-center justify-between px-4 text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-indigo-400">
            <GitBranch size={14} />
            <span>{gitBranch}</span>
          </div>
          <span className="text-gray-500">No Issues</span>
        </div>
        <div className="flex items-center gap-4 text-gray-500">
          <span>{getFileType(activeFile)}</span>
          <span>UTF-8</span>
        </div>
      </div>
    );
   };