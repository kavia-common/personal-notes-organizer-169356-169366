import React, { useMemo } from 'react';
import { useNotes } from '../context/NotesContext';
import { timeAgo } from '../utils/time';

// PUBLIC_INTERFACE
export default function Sidebar() {
  /** Sidebar with search, tags filter, and list of notes. */
  const {
    notes, tags, activeId,
    query, setQuery,
    filterTag, setFilterTag,
    handleSelectNote
  } = useNotes();

  const ordered = useMemo(() => {
    return [...notes].sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
  }, [notes]);

  return (
    <aside className="sidebar" aria-label="Sidebar">
      <div className="search" role="search">
        <span>🔎</span>
        <input
          type="search"
          placeholder="Search notes..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label="Search notes"
        />
      </div>

      <div>
        <div className="section-title">Tags</div>
        <div className="tags" role="list">
          <button
            className={`tag ${!filterTag ? 'active' : ''}`}
            onClick={() => setFilterTag('')}
          >
            All
          </button>
          {tags.map(t => (
            <button
              key={t}
              className={`tag ${filterTag === t ? 'active' : ''}`}
              onClick={() => setFilterTag(t)}
            >
              #{t}
            </button>
          ))}
        </div>
      </div>

      <div className="divider" />

      <div className="note-list" role="list">
        {ordered.map(n => (
          <article
            key={n.id}
            className="note-item"
            onClick={() => handleSelectNote(n.id)}
            aria-selected={activeId === n.id}
          >
            <div className="note-item-title">{n.title || 'Untitled'}</div>
            <div className="note-item-meta">
              {n.tags?.slice(0, 3).map(tag => `#${tag}`).join('  ')}
              {n.tags?.length ? ' · ' : ''}
              {n.updatedAt ? timeAgo(n.updatedAt) : ''}
            </div>
          </article>
        ))}
        {!ordered.length && (
          <div className="note-item" style={{ textAlign: 'center', color: '#6b7280' }}>
            No notes yet. Click “＋ New” to create one.
          </div>
        )}
      </div>
    </aside>
  );
}
