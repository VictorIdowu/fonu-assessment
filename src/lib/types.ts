export type task = {
  id: string;
  title: string;
  description: string;
  status: "active" | "completed";
  date: Date | undefined;
  dateCreated: Date;
};
