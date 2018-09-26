export interface Note {
  _id?: string;
  title: string;
  description: string;
  date: Date;
  finished: boolean;
  priority: number;
}