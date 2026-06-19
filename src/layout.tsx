import React, { useState, useEffect } from 'react';
import { Link, Location, Outlet, useLocation } from 'react-router-dom';

import MenuIcon from './components/menuIcon.js';
import wordsData from './words.json' with { type: "json" }
import Word from './models/word.js';

const SWIPE_THRESHOLD = 125;

function Scroll(location: Location) {
  requestAnimationFrame(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1))

      if (element) {
        element.scrollIntoView()
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

function HandleSwipe(endX, startX, setTouchStartX, setStartX, setIsOpen) {
  if (startX === null) return

  const deltaX = endX - startX

  if (deltaX > SWIPE_THRESHOLD) {
    setIsOpen(true)
  } else {
    setIsOpen(false)
  }

  setTouchStartX(null)
  setStartX(null)
}

export default function Layout() {
  const words: Word[] = wordsData

  const [isOpen, setIsOpen] = useState(false)
  const [startX, setStartX] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [currentTitle, setCurrentTitle] = useState('');
  const [showStickyTitle, setShowStickyTitle] = useState(false);

  const location = useLocation()

  useEffect(() => Scroll(location), [location])
  useEffect(() => Scroll(location), [isOpen])
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const container = document.getElementById('outletContainer');
    if (!container) return;

    const h2 = document.getElementById('page-title')
    if (!h2) {
      setCurrentTitle('');
      setShowStickyTitle(false);
      return;
    }

    setCurrentTitle(h2.textContent ?? '');

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyTitle(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-105px 0px 0px 0px"
      }
    );

    observer.observe(h2);

    return () => observer.disconnect();
  }, [location.pathname, location.hash]);

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
        <div className="topBar" onClick={() => setIsOpen(!isOpen)}>
          <MenuIcon isOpen={isOpen} setIsOpen={setIsOpen} />

          <span
            className={`pageTitle ${showStickyTitle ? 'visible' : ''}`}
          >
            {currentTitle}
          </span>
        </div>
        <div
          id="outletContainer"
          onPointerDown={(e : PointerEvent) => {
            setStartX(e.clientX);
          }}
          onPointerUp={(e : PointerEvent) => HandleSwipe(
            e.clientX, startX, setTouchStartX, setStartX, setIsOpen
          )}

          onTouchStart={(e : TouchEvent) => {
            setTouchStartX(e.touches[0].clientX);
          }}
          onTouchEnd={(e : TouchEvent) => HandleSwipe(
            e.changedTouches[0].clientX, touchStartX, setTouchStartX, setStartX, setIsOpen
          )}
        >
          <Outlet />
        </div>
      </main>
    </>
  );
}

