import "./App.css";
import { Note } from "./App";
import { getFormattedDate } from "./utils/date";
import { useState } from "react";

type Props = {
  selectedNoteId: number;
  setSelectedNoteId: Function;
  notes: Array<Note>;
  deleteNote: Function;
  exportCsv: Function;
};

const NoteList: React.FC<Props> = (
  { selectedNoteId, setSelectedNoteId, notes, deleteNote, exportCsv },
) => {
  const [titleFilterText, setTitleFilterText] = useState("");

  const filteredNotes = notes.filter((note) => {
    return note.title.toLocaleLowerCase().includes(
      titleFilterText.toLocaleLowerCase(),
    );
  });

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div>
          <button onClick={() => exportCsv()}>Export CSV</button>
        </div>
        <div>
          <button onClick={() => deleteNote(selectedNoteId)}>Delete</button>
        </div>
      </div>
      <div style={{ display: "grid" }}>
        <input
          id="titleFilterText"
          name="titleFilterText"
          value={titleFilterText}
          onChange={(e) => setTitleFilterText(e.target.value)}
        />
      </div>
      <div style={{ overflowY: "auto", height: "90vh" }}>
        {filteredNotes.map(({ id, title, text, updatedAt }) => {
          const formattedDate = getFormattedDate(updatedAt);

          return (
            <div
              style={selectedNoteId === id
                ? {
                  background: "#bdffbe",
                  textAlign: "left",
                  paddingLeft: 16,
                  borderRadius: 10,
                  borderBottom: "1px #eef solid",
                  height: 60,
                }
                : {
                  textAlign: "left",
                  paddingLeft: 16,
                  borderBottom: "1px #eef solid",
                  height: 60,
                }}
              onClick={() => setSelectedNoteId(id)}
              key={id}
            >
              <div style={{ paddingTop: 8 }}>{title}</div>
              <div style={{ paddingTop: 8, fontSize: 14, display: "flex" }}>
                <span style={{ marginRight: 8 }}>{formattedDate}</span>
                <span
                  style={{
                    display: "block",
                    color: "#666",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {text}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NoteList;
