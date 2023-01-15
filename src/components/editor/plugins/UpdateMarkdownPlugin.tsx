import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $convertFromMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import { Note } from "../../../App";

export const UpdateMarkdownPlugin: React.FC<{ note: Note | null }> = (
  { note },
) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.update(() => {
      if (!note?.text) return;

      $convertFromMarkdownString(note.text, TRANSFORMERS);
    });
  }, [note?.id]);

  return null;
};
