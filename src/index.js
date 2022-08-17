import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Game } from './components/Game.tsx';

//TODO not sure why, but can't auto resolve tsx extension. fix this!

  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  