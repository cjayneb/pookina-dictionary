import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <nav>
        {/* Link components update the URL without refreshing the browser */}
        <Link to="/">Home</Link>
        <Link to="/health">Health</Link>
      </nav>
      
      {/* The active route component will inject itself right here */}
      <main>
        <Outlet />
      </main>
    </>
  );
}
