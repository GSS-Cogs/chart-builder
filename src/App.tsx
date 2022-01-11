import React from 'react';
import Header from './components/header/Header';
import ChartPanel from './components/chart-panel/ChartPanel';
import SidePanel from './components/side-panel/SidePanel';
import './App.css';

function App() {
  return (
    <div id="app">
      <Header />
      <div id="content">
        <SidePanel />
        <ChartPanel />
      </div>
    </div>
  );
}

export default App;
