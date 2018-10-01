import {Note} from "./note";

export enum Order {
  finishedAsc,
  finishedDesc,

  titleAsc,
  titleDesc,

  createdAsc,
  createdDesc,

  importanceAsc,
  importanceDesc
}
export default Order;

export function getComparator(order: Order) : (a: Note, b: Note) => number | null {
  switch (order) {
    case Order.importanceDesc: return (a: Note, b: Note) => {
      return a.importance - b.importance;
    };
    case Order.importanceAsc: return (a: Note, b: Note) => {
      return b.importance - a.importance;
    };

    case Order.createdAsc: return (a: Note, b: Note) => {
      return a.created.valueOf() - b.created.valueOf();
    };
    case Order.createdDesc: return (a: Note, b: Note) => {
      return b.created.valueOf() - a.created.valueOf();
    };

    case Order.finishedDesc: return (a: Note, b: Note) => {
      let comp: number = (a.finished ? 1 : 0) - (b.finished ? 1 : 0);
      return comp !== 0 ? comp : a.date.valueOf() - b.date.valueOf();
    };
    case Order.finishedAsc: return (a: Note, b: Note) => {
      let comp: number = (b.finished ? 1 : 0) - (a.finished ? 1 : 0);
      return comp !== 0 ? comp : b.date.valueOf() - a.date.valueOf();
    };

    case Order.titleDesc: return (a: Note, b: Note) => {
      //return a.title.localeCompare(b.title);
      return a.title === b.title ? 0 : a.title > b.title ? 1 : -1;
    };
    case Order.titleAsc: return (a: Note, b: Note) => {
      return a.title === b.title ? 0 : a.title > b.title ? -1 : 1;
    };

    default: return null;
  }
}