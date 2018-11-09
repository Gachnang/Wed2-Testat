export interface Note {
  _id?: string;
  title: string;
  description: string;
  date: Date;
  created: Date;
  finished: boolean;
  importance: number;
}

export function bodyToNote(obj: any): Note {
  // @ts-ignore
  let ret: Note = {};

  ret._id = obj._id;
  ret.title = obj.title;
  ret.description = obj.description;
  ret.date = new Date(Date.parse(obj.date));
  ret.finished = !!obj.finished;
  ret.importance = Number.parseInt(obj.importance, 10);
  ret.created = new Date();

  return ret;
}

export function validate(note: Note): string[] {
  let ret = [];
  if (typeof note.title === 'undefined' || note.title.length === 0) {
    ret.push("title");
  }
  if (typeof note.description === 'undefined' || note.description.length === 0) {
    ret.push("description");
  }
  if (typeof note.date !== 'object' || isNaN(note.date.getTime())) {
    ret.push("date");
  }
  if (typeof note.importance === 'undefined' || isNaN(note.importance) || note.importance < 1 || note.importance > 5) {
    ret.push("importance");
  }
  if (typeof note.created !== 'object' || isNaN(note.created.getTime())) {
    ret.push("created");
  }
  return ret;
}