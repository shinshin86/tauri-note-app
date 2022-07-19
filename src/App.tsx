import { useEffect, useState } from "react";
import "./App.css";
import NoteList from "./NoteList";
import Editor from "./Editor";
import type { NewNote, Note } from "./types/Note";
import { create, remove, selectAll, update } from "./models/notes";
import { save } from "@tauri-apps/api/dialog";
import { writeTextFile } from "@tauri-apps/api/fs";
import { stringify as csvStringify } from "./utils/csv";

export type { Note };

const EMPTY_NOTE_ID = 0;

function App() {
  const [selectedNoteId, setSelectedNoteId] = useState<number>(EMPTY_NOTE_ID);
  const [notes, setNotes] = useState<Array<Note>>([]);

  const addNote = async ({ title, text }: NewNote): Promise<Note> => {
    const note = await create({ title, text });

    setSelectedNoteId(note.id);

    await refreshAllNote();

    return note;
  };

  const refreshAllNote = async (): Promise<void> => {
    const notes: Array<Note> = await selectAll();
    setNotes(notes);
  };

  const updateNote = async (note: Note): Promise<void> => {
    await update(note);

    await refreshAllNote();
  };

  const createNewNote = () => {
    setSelectedNoteId(EMPTY_NOTE_ID);
  };

  const deleteNote = async () => {
    await remove(selectedNoteId);

    setSelectedNoteId(EMPTY_NOTE_ID);

    await refreshAllNote();
  };

  const exportAllNotesJson = async () => {
    const notes: Array<Note> = await selectAll();
    const data = JSON.stringify(notes);
    const filename = "all-notes.json";
    const path = await save({ defaultPath: filename });
    if (path) {
      await writeTextFile(path, data);
    }
  };

  const exportAllNotesCsv = async () => {
    const notes: Array<Note> = await selectAll();
    const csvData = csvStringify(notes);
    const filename = "all-notes.csv";
    const path = await save({ defaultPath: filename });
    if (path) {
      await writeTextFile(path, csvData);
    }
  };

  useEffect(() => {
    const load = async (): Promise<void> => {
      await refreshAllNote();
    };

    load();
  }, []);

  return (
    <div className="App">
      <div className="NoteListContainer">
        <NoteList
          selectedNoteId={selectedNoteId}
          setSelectedNoteId={setSelectedNoteId}
          notes={notes}
          deleteNote={deleteNote}
          exportCsv={exportAllNotesCsv}
        />
      </div>
      <div className="EditorContainer">
        <Editor
          note={notes.find((note) => note.id === selectedNoteId) || null}
          addNote={addNote}
          updateNote={updateNote}
          createNewNote={createNewNote}
        />
      </div>
    </div>
  );
}

export default App;
