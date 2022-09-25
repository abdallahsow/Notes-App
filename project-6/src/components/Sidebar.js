export default function Sidebar(props) {
  const { notes, currentNote, setCurrentNoteId, newNote, handleDelete } = props;

  const noteElements = notes.map((note, index) => (
    <div key={note.id}>
      <div
        className={`title ${note.id === currentNote.id ? "selected-one" : ""}`}
        onClick={() => setCurrentNoteId(note.id)}
      >
        <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
        <button
          className="delete-btn"
          onClick={(event) => handleDelete(event, note.id)}
        >
          <i className="gg-trash trash-icon"></i>
        </button>
      </div>
    </div>
  ));

  return (
    <section className="pane sidebar">
      <div className="sidebar-header">
        <h3>Notes</h3>
        <button className="new-note" onClick={newNote}>
          +
        </button>
      </div>
      {noteElements}
    </section>
  );
}
