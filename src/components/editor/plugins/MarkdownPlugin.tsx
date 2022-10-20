import { TRANSFORMERS } from "@lexical/markdown";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";

export const MarkdownPlugin: React.FC = () => {
  return <MarkdownShortcutPlugin transformers={TRANSFORMERS} />;
};
