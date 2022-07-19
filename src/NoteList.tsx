import "./App.css";
import { Note } from "./App";
import { getFormattedDate } from "./utils/date";

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
      <div style={{ overflowY: "auto", height: "90vh" }}>
        {notes.map(({ id, title, text, updatedAt }) => {
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
