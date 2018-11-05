import Order from "../model/order";
import {Note} from "../model/note";

export interface LayoutOptions {
  title: string;
  styleName: string;
}

export interface IndexOptions extends LayoutOptions {
  filter: boolean | null;
  screenreader?: boolean;
  order: Order;
  DEBUG: string;
}

export interface EditOptions extends LayoutOptions {
  screenreader?: boolean;
  note: Note;
  error?: Error;
  DEBUG1: string;
  DEBUG2: string;
}