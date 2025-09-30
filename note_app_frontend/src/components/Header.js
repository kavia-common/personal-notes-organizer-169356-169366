import React from 'react';
import { useNotes } from '../context/NotesContext';

// PUBLIC_INTERFACE
export default function Header() {
  /** App header with brand and quick actions. */
  const { saving, handleCreateNote, refreshNotes } = useNotes();
  return (
    <header className="header">
      <div className="brand">
        <div className="brand-badge">N</div>
        <div className="brand-title">Notes · Ocean</div>
      </div>
      <div className="header-actions">
        <button className="btn btn-ghost" onClick={refreshNotes} aria-label="Refresh notes">
          🔄 Refresh
        </button>
        <button className="btn btn-primary" onClick={handleCreateNote} disabled={saving} aria-label="Create note">
          ＋ New
        </button>
      </div>
    </header>
  );
}
