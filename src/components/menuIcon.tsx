import React from 'react'

interface MenuIconProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MenuIcon({ isOpen, setIsOpen }: MenuIconProps) {
  return (
    <div 
      className={`menuIconContainer ${isOpen ? 'change' : ''}`} 
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="bar1"></div>
      <div className="bar2"></div>
      <div className="bar3"></div>
    </div>
  );
}
