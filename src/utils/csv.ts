import type { Note } from "../types/Note";

// TODO: type
const stringify = (json: any): string => {
  const header = Object.keys(json[0]).join(",") + "\n";

  const body = json.map((data: any) => {
    return Object.keys(data).map((key: string) => {
      return `"${data[key]}"`;
    }).join(",");
  }).join("\n");

  return header + body;
};

// TODO
const noteCsvParse = (str: String): Array<Note> => {
  const header = str.split("\n")[0].split(",");
  const colLength = header.length;

  const arr: Array<Note> = [];

  let obj: any = {};
  let isParse = false;
  let prevChar = "";
  let parsedStr = "";

  for (let col = 0, c = 0; c < str.length; c++) {
    const currentChar = str[c], nextChar = str[c + 1];

    if (currentChar === "," && prevChar === '"') {
      continue;
    }

    if (currentChar == '"' && nextChar == '"') {
      // @ts-ignore
      obj[header[col]] = "";

      if (col === colLength) {
        arr.push(obj);
        col = 0;
      } else {
        col++;
      }
    }

    if (currentChar === '"' && isParse) {
      isParse = false;
      prevChar = currentChar;

      // @ts-ignore
      obj[header[col]] = parsedStr;
      parsedStr = "";

      if (col === colLength - 1) {
        arr.push(obj);
        obj = {};
        col = 0;
        continue;
      } else {
        col++;
        continue;
      }
    }

    if (currentChar == '"' && !isParse) {
      isParse = true;
      continue;
    }

    if (isParse) {
      parsedStr = parsedStr + str[c];
      continue;
    }
  }

  return arr;
};

export { noteCsvParse, stringify };
