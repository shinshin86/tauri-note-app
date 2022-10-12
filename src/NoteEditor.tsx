import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

const initialConfig: React.ComponentProps<
  typeof LexicalComposer
>["initialConfig"] = {
  namespace: "tauri-note-app",
  onError: (error) => console.error(error),
};

const NoteEditor: React.FC = () => {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<div>自由に書いてください</div>}
      />
    </LexicalComposer>
  );
};

export default NoteEditor;
