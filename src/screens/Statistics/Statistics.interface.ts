export interface TreeInterface {
  [x: string]: string;
  name: string;
  quanlity: string;
  imageUrl: string;
}

export interface UnitInterface {
  [x: string]: string;
  name: string;
}

export interface InputInterface {
  label: string;
  value: string;
  error: string;
}
