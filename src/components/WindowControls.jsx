import React from 'react';
import { Minus, Maximize2, X, Maximize } from 'lucide-react';
import { appWindow } from '@tauri-apps/api/window';

export const WindowControls = ({ windowState, toggleMaximize }) => {
  return (
    <div className="flex gap-2 ml-4">
      <button 
        className="hover:bg-gray-900 p-2 rounded-lg"
        onClick={() => appWindow.minimize()}
      >
        <Minus size={18} className="text-gray-400" />
      </button>
      <button
        className="hover:bg-gray-900 p-2 rounded-lg"
        onClick={toggleMaximize}
      >
        {windowState === 'maximized' ? (
          <Maximize2 size={18} className="text-gray-400" />
        ) : (
          <Maximize size={18} className="text-gray-400" />
        )}
      </button>
      <button 
        className="hover:bg-red-500/10 p-2 rounded-lg group"
        onClick={() => appWindow.close()}
      >
        <X size={18} className="text-gray-400 group-hover:text-red-400" />
      </button>
    </div>
  );
};

export default WindowControls;