import React, { useState, useEffect } from 'react';
import { Link, Location, Outlet, useLocation } from 'react-router-dom';

import MenuIcon from './components/menuIcon.js';
import wordsData from './words.json' with { type: "json" }
import Word from './models/word.js';

function Scroll(location: Location) {
  requestAnimationFrame(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1))

      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  })
}



export default function Layout() {
  const words: Word[] = wordsData

  const [isOpen, setIsOpen] = useState(false)
  const [startX, setStartX] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const location = useLocation()

  useEffect(() => Scroll(location), [location])

  useEffect(() => Scroll(location), [isOpen])
  
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
        <div
          id="outletContainer"
          onPointerDown={(e) => {
            setStartX(e.clientX);
          }}
          onPointerUp={(e) => {
            if (startX === null) return;
            
            const deltaX = e.clientX - startX;
            const SWIPE_THRESHOLD = 75;

            if (deltaX > SWIPE_THRESHOLD) {
              setIsOpen(true);
            } else {
              setIsOpen(false);
            }

            setStartX(null);
          }}

          onTouchStart={(e) => {
            setTouchStartX(e.touches[0].clientX);
          }}
          onTouchEnd={(e) => {
            if (touchStartX === null) return;

            const touchEndX = e.changedTouches[0].clientX;
            const deltaX = touchEndX - touchStartX;

            const SWIPE_THRESHOLD = 125;

            if (deltaX > SWIPE_THRESHOLD) {
              setIsOpen(true);
            } else if (deltaX < -SWIPE_THRESHOLD) {
              setIsOpen(false);
            }

            setTouchStartX(null);
          }}
        >
          <Outlet />
        </div>
      </main>
    </>
  );
}

