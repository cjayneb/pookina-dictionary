import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import MenuIcon from './components/menuIcon.js';
import wordsData from './words.json' with { type: "json" }
import Word from './models/word.js';

export default function Layout() {
  const words: Word[] = wordsData

  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation()

  useEffect(() => {
    requestAnimationFrame(() => {
      if (location.hash) {
        const element = document.getElementById(location.hash.substring(1))

        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        document.getElementsByTagName('main')[0].scrollIntoView({behavior: 'smooth'})
      }
    });
  }, [location])

  useEffect(() => {
    console.log("isOpen changed:", isOpen);
    requestAnimationFrame(() => {
      if (location.hash) {
        const element = document.getElementById(location.hash.substring(1))

        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        document.getElementsByTagName('main')[0].scrollIntoView({behavior: 'smooth'})
      }
    });
  }, [isOpen]);
  
  return (
    <>
      <nav id="navBar" className={isOpen ? 'open' : ''}>
        {/* Link components update the URL without refreshing the browser */}
        <Link to="/">Home</Link>
        
        <details>
          <summary><Link to="/words">Words</Link></summary>
          <ul>
            {words.sort((a, b) => a.word.localeCompare(b.word)).map((word) => (
              <li key={word.id}><Link to={"/words#"+word.id}>{word.word}</Link></li>
            ))}
          </ul>
        </details>
        <Link to="/health">Health</Link>
      </nav>

      <main>
        <MenuIcon isOpen={isOpen} setIsOpen={setIsOpen} />
        <div id="outletContainer" onClick={() => setIsOpen(false)}>
          <Outlet />
        </div>
      </main>
    </>
  );
}

