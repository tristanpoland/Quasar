// src/components/ModernIDE/MenuBar.jsx
import React from 'react';
import { Menu } from './menu';

export const MenuBar = ({ editor }) => {
  const menuItems = {
    File: [
      { label: 'New File', action: () => {}, shortcut: '⌘N' },
      { label: 'Open Project', action: () => {}, shortcut: '⌘O' },
      // ... more items
    ],
    // ... more menus
  };

  return (
    <div className="flex items-center gap-4">
      {Object.entries(menuItems).map(([name, items]) => (
        <Menu key={name} items={items} />
      ))}
    </div>
  );
};