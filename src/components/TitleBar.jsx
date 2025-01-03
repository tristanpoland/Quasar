import React from 'react';
import { appWindow } from '@tauri-apps/api/window';
import { Minus, Maximize2, X, Command, Search, Bell, Cloud, RefreshCw } from 'lucide-react';
import { MenuBar } from './MenuBar';
import { WindowControls } from './WindowControls';

export const TitleBar = ({
  windowState,
  toggleMaximize,
  setIsPaletteOpen,
  setSearchQuery
}) => {
  return (
    <div
      className="h-12 bg-black flex items-center justify-between select-none px-4 border-b border-gray-900"
      onMouseDown={console.log('onMouseDown')}
      data-tauri-drag-region
    >
      <MenuBar />
      <div className="flex items-center gap-3 flex-1 ml-4 max-w-md max-h-10">
        {/* <Command size={20} className="text-indigo-400" /> */}
        <div
          className="text-center flex items-center gap-2 px-3 py-1.5 bg-gray-900 rounded-lg cursor-pointer flex-1 w-xl center content-center pl-[28%] max-h-10"
          onClick={() => {
            setIsPaletteOpen(true);
            setSearchQuery('');
          }}
        >
          <Search size={16} className="text-gray-400" />
          <span className="text-gray-400 text-sm text-center">Search commands... (⌘K)</span>
        </div>
      </div>
      <WindowControls windowState={windowState} toggleMaximize={toggleMaximize} />
    </div>
  );
};