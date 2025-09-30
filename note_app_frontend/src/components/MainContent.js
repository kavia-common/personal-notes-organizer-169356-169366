import React from 'react';
import { useNotes } from '../context/NotesContext';
import NoteEditor from './NoteEditor';

// PUBLIC_INTERFACE
export default function MainContent() {
  /** Main area with note editor or empty state. */
  const { activeNote } = useNotes();
  return (
    <main className="main">
      <div className="main-inner">
        {activeNote ? (
          <NoteEditor />
        ) : (
          <div className="editor-card" style={{ padding: 24, textAlign: 'center' }}>
            <h2 style={{ margin: 0 }}>Welcome to Notes · Ocean</h2>
            <p style={{ color: '#6b7280' }}>
              Select a note from the left or create a new one to get started.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
