import "ress";
import "./Editor.css";
import { nodes } from "./nodes";
import { theme } from "./Theme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { MarkdownPlugin } from "./plugins/MarkdownPlugin";

const initialConfig: React.ComponentProps<
  typeof LexicalComposer
>["initialConfig"] = {
  namespace: "tauri-note-app",
  onError: (error) => console.error(error),
  nodes,
  theme,
};

const NoteEditor: React.FC = () => {
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
    </LexicalComposer>
  );
};

export default NoteEditor;
