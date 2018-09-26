import {Note} from "./note";

export enum Order {
  finishedAsc,
  finishedDesc,

  titleAsc,
  titleDesc,

  descriptionAsc,
  descriptionDesc,

  createdAsc,
  createdDesc,

  priorityAsc,
  priorityDesc
}
export default Order;

export function getComparator(order: Order) : (a: Note, b: Note) => number | null {
  switch (order) {
    case Order.priorityDesc: return (a: Note, b: Note) => {
      return a.priority - b.priority;
    };
    case Order.priorityAsc: return (a: Note, b: Note) => {
      return b.priority - a.priority;
    };

    // todo make all comparators

    default: return null;
  }
}