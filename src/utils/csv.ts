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

export { stringify };
