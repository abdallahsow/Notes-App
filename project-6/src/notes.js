import { useState } from "react";
import { nanoid } from "nanoid";
import Split from "react-split";
import Sidebar from "./Sidebar";
import Editor from "./Editor";
import "./notes.css";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState(
    [notes[0] && notes[0].id] || ""
  );

  const createNewNote = () => {
    const newNote = {
      id: nanoid(),
      body: "Tye your note here",
    };

    setNotes([newNote, ...notes]);
  };

  return (
    <main>
      {notes.length ? (
        <Split></Split>
      ) : (
        <div>
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
};
