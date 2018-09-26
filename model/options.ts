export interface Options {
  session?: string;

  style: Style;
  order: Order;
}

export enum Order {
  finishedAsc,
  dinishedDesc,

  createdAsc,
  createdDesc,

  priorityAsc,
  priorityDesc
}

export enum Style {
  White,
  Red,
  Green,
  Blue
}

export const DefaultOptions: Options = {
  style: Style.White,
  order: Order.createdDesc
};