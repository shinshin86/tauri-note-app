import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Note } from "./types/Note";
import { isChanged } from "./utils/editor";

type Props = {
  note: Note | null;
  addNote: Function;
  updateNote: Function;
  createNewNote: Function;
};

type PrevContent = {
  title: string;
  text: string;
};

let prevContent: PrevContent = { title: "", text: "" };

const delay = 500;

const Editor: React.FC<Props> = (
  { note, addNote, updateNote, createNewNote },
) => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [title, setTitle] = useState<string>(note?.title || "");
  const [text, setText] = useState<string>(note?.text || "");

  prevContent = {
    title: note?.title || "",
    text: note?.text || "",
  };

  const debounceTimer: React.MutableRefObject<number | null> = useRef(null);

  const onChangeNoteHandler = async (): Promise<void> => {
    // TODO: Validation error if no title
    if (!title) return;

    if (!!debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // init timer
    debounceTimer.current = delay;

    debounceTimer.current = setTimeout(async () => {
      if (!isChanged({ title, text }, prevContent)) return;

      if (selectedNote) {
        await updateNote({
          ...selectedNote,
          title,
          text,
        });
      } else {
        const newNote = await addNote({ title, text });
        setSelectedNote(newNote);
      }
    }, delay);
  };

  useEffect(() => {
    if (note?.id === selectedNote?.id) {
      return;
    }

    setSelectedNote(note);
    setTitle(note?.title || "");
    setText(note?.text || "");
  }, [note]);

  useEffect(() => {
    onChangeNoteHandler();
  }, [title, text]);

  return (
    <div>
      <div style={{ textAlign: "left" }}>
        <button onClick={() => createNewNote()}>New</button>
      </div>
      <div>
        <input
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%" }}
        />
        <textarea
          id="text"
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: "100%", height: "85vh" }}
        />
      </div>
    </div>
  );
};

export default Editor;
