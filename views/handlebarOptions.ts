
export interface LayoutOptions {
  title: string;
  styleName: string;
}

export interface IndexOptions extends LayoutOptions {
  filter: boolean | null;
  screenreader?: boolean;
  DEBUG: string;
}