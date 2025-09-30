import React from 'react';
import './App.css';
import { NotesProvider } from './context/NotesContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Fab from './components/Fab';

// PUBLIC_INTERFACE
function App() {
  /** Root app shell composing header, sidebar, main content and FAB. */
  return (
    <NotesProvider>
      <div className="app-shell">
        <Header />
        <Sidebar />
        <MainContent />
        <Fab />
      </div>
    </NotesProvider>
  );
}

export default App;
