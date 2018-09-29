export interface Note {
  _id?: string;
  title: string;
  description: string;
  date: Date;
  finished: boolean;
  importance: number;
}

export function bodyToNote(obj: any): Note {
  // @ts-ignore
  let ret: Note = {};

  ret._id = obj._id;
  ret.title = obj.title;
  ret.description = obj.description;
  // todo wrong cast from string to date?
  // @ts-ignore
  ret.date = Date.parse(obj._id) as Date;
  ret.finished = !!obj.finished;
  ret.importance = Number.parseInt(obj.importance, 10);

  return ret;
}

export function noteToBody(body: any, note: Note): any {
  return Object.assign(body, note);
}