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

export interface DataExpenseInterface {
  key: string;
  costType: string;
  date: string;
  quantity: any;
  totalPrice: any;
  unit: string;
}

export interface DataIncomeInterface {
  key: string;
  tree: string;
  date: string;
  quantityInKilograms: any;
  totalPrice: any;
  unit: string;
}
