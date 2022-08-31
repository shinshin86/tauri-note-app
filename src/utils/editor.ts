import { NoteContent } from "../types/Note";

const isChanged = (content: NoteContent, prevContent: NoteContent): boolean => {
  if (content.title !== prevContent.title) return true;

  if (content.text !== prevContent.text) return true;

  return false;
};

export { isChanged };
