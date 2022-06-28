import React from 'react';
import logo from './trivia.png';
import './App.css';
import Content from './Components/Content';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>SUA VEZ</p>
        <Content />
      </header>

    </div>
  );
}
