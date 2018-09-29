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

    // todo make all comparators

    default: return null;
  }
}