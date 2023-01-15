import "ress";
import "./Editor.css";
import { nodes } from "./nodes";
import { theme } from "./Theme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { MarkdownPlugin } from "./plugins/MarkdownPlugin";
import { UpdateMarkdownPlugin } from "./plugins/UpdateMarkdownPlugin";
import { $convertToMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState } from "lexical";
import { Note } from "../../App";

const initialConfig: React.ComponentProps<
  typeof LexicalComposer
>["initialConfig"] = {
  namespace: "tauri-note-app",
  onError: (error) => console.error(error),
  nodes,
  theme,
};

type NoteEditorProps = {
  note: Note | null;
  setText: Function;
};

const NoteEditor: React.FC<NoteEditorProps> = ({ note, setText }) => {
  const onChaneg = (editorState: EditorState) => {
    editorState.read(() => {
      const markdownText = $convertToMarkdownString(TRANSFORMERS);
      setText(markdownText);
    });
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="noteEditorContainer">
        <RichTextPlugin
          contentEditable={<ContentEditable className="contentEditable" />}
          placeholder={<div className="placeholder">Feel free to write</div>}
        />
      </div>
      <MarkdownPlugin />
      <HistoryPlugin />
      <UpdateMarkdownPlugin note={note} />
      <OnChangePlugin onChange={onChaneg} />
    </LexicalComposer>
  );
};

export default NoteEditor;
