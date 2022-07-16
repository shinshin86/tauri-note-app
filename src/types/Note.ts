export type Note = {
  id: number;
  title: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
};

export type NewNote = {
  title: string;
  text: string;
};
