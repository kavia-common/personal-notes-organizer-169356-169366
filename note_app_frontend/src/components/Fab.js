import React from 'react';
import { useNotes } from '../context/NotesContext';

// PUBLIC_INTERFACE
export default function Fab() {
  /** Floating action button to quickly create a note. */
  const { handleCreateNote, saving } = useNotes();
  return (
    <button
      className="fab"
      onClick={handleCreateNote}
      disabled={saving}
      aria-label="Create new note"
      title="New note"
    >
      ＋
    </button>
  );
}
