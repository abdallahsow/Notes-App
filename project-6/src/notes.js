import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Split from "react-split";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import "./notes.css";

const App = () => {
  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.notes) || []
  );
  const [currentNoteId, setCurrentNoteId] = useState(
    [notes[0] && notes[0].id] || ""
  );

  const createNewNote = () => {
    const newNote = {
      id: nanoid(),
      body: "Type your note here",
    };

    setNotes(() => [newNote, ...notes]);
    setCurrentNoteId(newNote.id);
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function updateNote(text) {
    setNotes(() => {
      const orderedArray = [];
      for (const note of notes) {
        if (note.id === currentNoteId) {
          orderedArray.unshift({ ...note, body: text });
        } else {
          orderedArray.push(note);
        }
      }
      return orderedArray;
    });
  }

  function deleteNote(event, noteId) {
    event.stopPropagation();
    setNotes((prevNotes) => prevNotes.filter((prevNote) => prevNote.id !== noteId));
  }

  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  return (
    <main className="app">
      {notes.length ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            handleDelete={deleteNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
};

export default App;
