"use client";

// src/components/ModernIDE/CommandPalette.jsx
import React, { useEffect, useState } from 'react';
import { Command } from 'lucide-react';

export const CommandPalette = ({ 
  commands, 
  searchQuery, 
  setSearchQuery, 
  onClose 
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const filteredCommands = commands.filter(cmd => 
    cmd.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch(e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(i => 
            i < filteredCommands.length - 1 ? i + 1 : i
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(i => i > 0 ? i - 1 : i);
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
            onClose();
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredCommands, selectedIndex, onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-24"
      onClick={onClose}
    >
      <div 
        className="w-[600px] bg-gray-900 rounded-lg shadow-2xl border border-gray-800"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 p-3 border-b border-gray-800">
          <Command className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            className="flex-1 bg-transparent text-white outline-none placeholder-gray-500"
            placeholder="Type a command or search..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            autoFocus
          />
        </div>

        <div className="max-h-96 overflow-y-auto py-2">
          {filteredCommands.map((cmd, index) => (
            <div
              key={cmd.id}
              className={`flex items-center justify-between px-4 py-3 cursor-pointer
                ${index === selectedIndex ? 'bg-indigo-500/20' : 'hover:bg-gray-800'}`}
              onClick={() => {
                cmd.action();
                onClose();
              }}
            >
              <div className="flex items-center gap-3">
                <cmd.icon className="w-5 h-5 text-gray-400" />
                <span className="text-gray-200">{cmd.name}</span>
              </div>
              {cmd.shortcut && (
                <div className="flex gap-1">
                  {cmd.shortcut.split('+').map((key, i) => (
                    <kbd
                      key={i}
                      className="px-2 py-1 text-xs text-gray-400 bg-gray-800 rounded-md"
                    >
                      {key}
                    </kbd>
                  ))}
                </div>
              )}
            </div>
          ))}

          {filteredCommands.length === 0 && (
            <div className="px-4 py-3 text-gray-500 text-center">
              No commands found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;