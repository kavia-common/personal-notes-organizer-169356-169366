import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { listNotes, listTags, createNote, updateNote, deleteNote, getNote } from '../services/api';

// PUBLIC_INTERFACE
export const NotesContext = createContext(null);

/**
 * Note shape used in UI:
 * {
 *   id: string,
 *   title: string,
 *   content: string,
 *   tags: string[],
 *   updatedAt: string | number
 * }
 */

// PUBLIC_INTERFACE
export function NotesProvider({ children }) {
  /**
   * Provides notes state and actions across the app.
   * Handles fetching, selecting, creating, updating and deleting notes.
   */
  const [notes, setNotes] = useState([]);
  const [tags, setTags] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [query, setQuery] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function refreshNotes() {
    setLoading(true);
    setError('');
    try {
      const data = await listNotes({ query, tag: filterTag });
      setNotes(Array.isArray(data) ? data : []);
      // keep activeId if still present
      if (activeId && !data.find(n => n.id === activeId)) {
        setActiveId(data[0]?.id || null);
      }
    } catch (e) {
      setError(e.message || 'Failed to load notes');
    } finally {
      setLoading(false);
    }
  }

  async function refreshTags() {
    try {
      const data = await listTags();
      setTags(Array.isArray(data) ? data : []);
    } catch {
      // non-fatal
    }
  }

  useEffect(() => {
    refreshNotes();
    refreshTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, filterTag]);

  const activeNote = useMemo(
    () => notes.find(n => n.id === activeId) || null,
    [notes, activeId]
  );

  // PUBLIC_INTERFACE
  async function handleCreateNote() {
    /** Creates a new note with default values and selects it. */
    setSaving(true);
    setError('');
    try {
      const draft = await createNote({ title: 'Untitled', content: '', tags: [] });
      await refreshNotes();
      setActiveId(draft.id);
      return draft;
    } catch (e) {
      setError(e.message || 'Failed to create note');
      return null;
    } finally {
      setSaving(false);
    }
  }

  // PUBLIC_INTERFACE
  async function handleUpdateNote(id, data) {
    /** Updates a note and refreshes the list. */
    setSaving(true);
    setError('');
    try {
      await updateNote(id, data);
      await refreshNotes();
    } catch (e) {
      setError(e.message || 'Failed to save note');
    } finally {
      setSaving(false);
    }
  }

  // PUBLIC_INTERFACE
  async function handleDeleteNote(id) {
    /** Deletes a note and updates selection. */
    setSaving(true);
    setError('');
    try {
      await deleteNote(id);
      await refreshNotes();
      if (activeId === id) {
        setActiveId(prev => {
          const remaining = notes.filter(n => n.id !== id);
          return remaining[0]?.id || null;
        });
      }
    } catch (e) {
      setError(e.message || 'Failed to delete note');
    } finally {
      setSaving(false);
    }
  }

  // PUBLIC_INTERFACE
  async function handleSelectNote(id) {
    /** Selects a note and ensures it's loaded if needed. */
    setActiveId(id);
    // Optionally refetch single note to ensure freshness
    try {
      const full = await getNote(id);
      setNotes(prev => prev.map(n => (n.id === id ? full : n)));
    } catch {
      // ignore
    }
  }

  const value = {
    notes,
    tags,
    activeId,
    activeNote,
    query,
    filterTag,
    loading,
    saving,
    error,
    setQuery,
    setFilterTag,
    setActiveId,
    handleCreateNote,
    handleUpdateNote,
    handleDeleteNote,
    handleSelectNote,
    refreshNotes,
    refreshTags
  };

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

// PUBLIC_INTERFACE
export function useNotes() {
  /** Hook to access the notes context safely. */
  const ctx = useContext(NotesContext);
  if (!ctx) {
    throw new Error('useNotes must be used within NotesProvider');
  }
  return ctx;
};
