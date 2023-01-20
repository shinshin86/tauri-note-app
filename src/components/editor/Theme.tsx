import { EditorThemeClasses } from "lexical";
import "./Theme.css";

export const theme: EditorThemeClasses = {
  heading: {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
  },
  quote: "quote",
  list: {
    ul: "ul",
    ol: "ol",
    listitem: "listItem",
    nested: {
      listitem: "nestedListItem",
    },
    listitemChecked: "listItemChecked",
    listitemUnchecked: "listItemUnchecked",
  },
  text: {
    strikethrough: "textStrikeThrough",
  },
};
