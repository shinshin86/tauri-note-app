import Database from "tauri-plugin-sql-api";
import type { NewNote, Note } from "../types/Note";

let db: any = null;
const load = Database.load("sqlite:note.db").then((instance) => {
  db = instance;
  return db;
});

async function selectAll(): Promise<Array<Note>> {
  await load;
  const resultList = await db.select("SELECT * FROM notes");

  const allNotes: Array<Note> = [];
  for (const r of resultList) {
    allNotes.push({
      id: r.id,
      title: r.title,
      text: r.text,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    });
  }

  return allNotes;
}

async function create({ title, text }: NewNote): Promise<Note> {
  const createDate = new Date();
  const createdAt = createDate;
  const updatedAt = createDate;

  const { lastInsertId: id } = await db.execute(
    "INSERT INTO notes (title, text, created_at, updated_at) VALUES ($1, $2, $3, $4)",
    [title, text, createdAt, updatedAt],
  );
  return {
    id,
    title,
    text,
    createdAt,
    updatedAt,
  };
}

async function update(note: Note): Promise<Note> {
  const updatedAt = new Date();
  await db.execute(
    "UPDATE notes SET title = $1, text = $2, updated_at = $3 WHERE id = $4",
    [note.title, note.text, updatedAt, note.id],
  );

  return {
    id: note.id,
    title: note.title,
    text: note.text,
    createdAt: note.createdAt,
    updatedAt,
  };
}

async function remove(id: number): Promise<boolean> {
  return await db.execute("DELETE FROM notes WHERE id = $1", [id]);
}

export { create, remove, selectAll, update };
