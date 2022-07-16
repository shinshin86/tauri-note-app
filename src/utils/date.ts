const getFormattedDate = (date: Date): string => {
  const d = new Date(date);
  return d.getFullYear() +
    "/" +
    String(d.getMonth() + 1).padStart(2, "0") +
    "/" +
    String(d.getDate()).padStart(2, "0");
};

export { getFormattedDate };
