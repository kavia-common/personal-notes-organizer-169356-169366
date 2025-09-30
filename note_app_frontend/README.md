# Notes · Ocean (React SPA)

A responsive single-page application for creating, editing, organizing, and deleting personal notes.

- Theme: Ocean Professional (Blue & Amber accents)
- Layout: Header with app name, Sidebar with lists/tags, Main editor/viewer, FAB for new note
- Tech: React 18 (CRA), vanilla CSS; no heavy UI frameworks

## Features

- Create, edit, delete notes
- Organize via tags and search
- Responsive, modern UI with subtle gradients and shadows
- Backend API integration (configurable)

## Quick Start

1) Install deps
   npm install

2) Configure environment
   - Copy .env.example to .env and set REACT_APP_API_BASE to your backend API (e.g., http://localhost:4000/api)

3) Run
   npm start
   Open http://localhost:3000/

Build:
   npm run build

## API Contract (expected)

- GET    /notes?query=&tag=      -> [{ id, title, content, tags, updatedAt }]
- POST   /notes                  -> { id, title, content, tags, updatedAt }
- GET    /notes/:id              -> { id, title, content, tags, updatedAt }
- PUT    /notes/:id              -> updated note
- DELETE /notes/:id              -> 204
- GET    /tags                   -> ["work","personal",...]

Configure base URL via REACT_APP_API_BASE.

## Project Structure

src/
  components/ Header, Sidebar, MainContent, NoteEditor, Fab
  context/    NotesContext (global state + actions)
  services/   api (HTTP client)
  App.js      App shell
  App.css     Theme and layout styles

## Accessibility & UX

- Keyboard-friendly inputs and buttons
- Clear visual states and hints
- Save disabled until changes are present
