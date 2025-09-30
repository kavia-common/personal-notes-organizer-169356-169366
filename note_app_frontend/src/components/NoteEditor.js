import React, { useEffect, useMemo, useState } from 'react';
import { useNotes } from '../context/NotesContext';

// PUBLIC_INTERFACE
export default function NoteEditor() {
  /** Editor for the active note: title, tags, content, save and delete. */
  const { activeNote, handleUpdateNote, handleDeleteNote, saving } = useNotes();

  // local draft state to avoid saving on each keystroke
  const [title, setTitle] = useState(activeNote?.title || '');
  const [content, setContent] = useState(activeNote?.content || '');
  const [tags, setTags] = useState(activeNote?.tags || []);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    setTitle(activeNote?.title || '');
    setContent(activeNote?.content || '');
    setTags(activeNote?.tags || []);
    setTagInput('');
  }, [activeNote?.id]);

  const changed = useMemo(() => {
    return (
      (activeNote?.title || '') !== title ||
      (activeNote?.content || '') !== content ||
      JSON.stringify(activeNote?.tags || []) !== JSON.stringify(tags)
    );
  }, [title, content, tags, activeNote]);

  async function onSave() {
    if (!activeNote) return;
    await handleUpdateNote(activeNote.id, { title, content, tags });
  }

  async function onDelete() {
    if (!activeNote) return;
    const ok = window.confirm('Delete this note? This cannot be undone.');
    if (ok) {
      await handleDeleteNote(activeNote.id);
    }
  }

  function addTagFromInput() {
    const t = tagInput.trim().replace(/^#/, '');
    if (!t) return;
    if (!tags.includes(t)) setTags(prev => [...prev, t]);
    setTagInput('');
  }

  function removeTag(t) {
    setTags(prev => prev.filter(x => x !== t));
  }

  function onTagKeyDown(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTagFromInput();
    } else if (e.key === 'Backspace' && !tagInput) {
      // fast remove last
      setTags(prev => prev.slice(0, -1));
    }
  }

  return (
    <section className="editor-card" aria-label="Note editor">
      <div className="editor-toolbar">
        <input
          className="title-input"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Note title"
          aria-label="Note title"
        />
        <div className="row">
          <button className="btn" onClick={onDelete} disabled={saving} aria-label="Delete note">
            🗑 Delete
          </button>
          <button
            className="btn btn-primary"
            onClick={onSave}
            disabled={saving || !changed}
            aria-label="Save note"
          >
            💾 Save
          </button>
        </div>
      </div>

      <div className="tag-input-row">
        <div className="row" style={{ flexWrap: 'wrap' }}>
          {tags.map(t => (
            <span className="tag-chip" key={t}>
              #{t}
              <span className="x" onClick={() => removeTag(t)} aria-label={`Remove tag ${t}`}>
                ✕
              </span>
            </span>
          ))}
        </div>
        <input
          className="tag-input"
          value={tagInput}
          onChange={e => setTagInput(e.target.value)}
          onKeyDown={onTagKeyDown}
          placeholder="Add tag and press Enter"
          aria-label="Add tag"
        />
      </div>

      <textarea
        className="editor-textarea"
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Start writing your note..."
        aria-label="Note content"
      />
    </section>
  );
}
