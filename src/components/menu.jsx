// components/ui/menu.jsx
import React, { useState, useEffect, useRef } from 'react';

export const Menu = ({ children, items = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <div
        className="px-3 py-1 hover:bg-gray-900 rounded-lg cursor-pointer text-gray-400 hover:text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {children}
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 py-1 bg-gray-900 rounded-lg shadow-xl border border-gray-800 min-w-[200px] z-50">
          {items.map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export const MenuItem = ({ label, shortcut, action, type = 'item' }) => {
  if (type === 'separator') {
    return <hr className="my-1 border-gray-800" />;
  }

  return (
    <div
      className="px-4 py-2 hover:bg-gray-800 cursor-pointer flex items-center justify-between"
      onClick={() => {
        action?.();
      }}
    >
      <span className="text-gray-300">{label}</span>
      {shortcut && <span className="text-gray-500 text-sm ml-4">{shortcut}</span>}
    </div>
  );
};