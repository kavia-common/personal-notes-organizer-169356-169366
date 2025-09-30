/**
 * API client for notes management.
 * Uses REACT_APP_API_BASE env var to configure the backend URL.
 * Endpoints expected:
 *  - GET    /notes?query=&tag=
 *  - POST   /notes
 *  - GET    /notes/:id
 *  - PUT    /notes/:id
 *  - DELETE /notes/:id
 *  - GET    /tags
 */

const BASE_URL = process.env.REACT_APP_API_BASE || '';

async function http(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };
  const resp = await fetch(url, { ...options, headers });
  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    throw new Error(`API ${resp.status}: ${text || resp.statusText}`);
  }
  if (resp.status === 204) return null;
  return resp.json();
}

// PUBLIC_INTERFACE
export async function listNotes({ query = '', tag = '' } = {}) {
  /** List notes with optional search query and tag filter. */
  const qs = new URLSearchParams();
  if (query) qs.append('query', query);
  if (tag) qs.append('tag', tag);
  const q = qs.toString();
  return http(`/notes${q ? `?${q}` : ''}`);
}

// PUBLIC_INTERFACE
export async function getNote(id) {
  /** Get a single note by id. */
  return http(`/notes/${encodeURIComponent(id)}`);
}

// PUBLIC_INTERFACE
export async function createNote(payload) {
  /** Create a new note: { title, content, tags: string[] } */
  return http('/notes', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

// PUBLIC_INTERFACE
export async function updateNote(id, payload) {
  /** Update a note by id. */
  return http(`/notes/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
}

// PUBLIC_INTERFACE
export async function deleteNote(id) {
  /** Delete a note by id. */
  return http(`/notes/${encodeURIComponent(id)}`, {
    method: 'DELETE'
  });
}

// PUBLIC_INTERFACE
export async function listTags() {
  /** List all existing tags. */
  return http('/tags');
}
