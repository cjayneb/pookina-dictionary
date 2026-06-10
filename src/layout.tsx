import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import MenuIcon from './components/menuIcon.js';

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <nav id="navBar" className={isOpen ? 'open' : ''}>
        {/* Link components update the URL without refreshing the browser */}
        <Link to="/">Home</Link>
        <Link to="/words">Words</Link>
        <Link to="/health">Health</Link>
      </nav>

      <main>
        <MenuIcon isOpen={isOpen} setIsOpen={setIsOpen} />
        <Outlet />
      </main>
    </>
  );
}
