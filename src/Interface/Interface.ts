export interface TreeInterface {
  key(key: any): void;
  name: string;
  quanlity: string;
  imageUrl: string;
}
export interface UnitInterface {
  key(key: any): void;
  id: string;
  name: string;
}

export interface InputInterface {
  label: string;
  value: string;
  error: string;
}

export interface DataExpenseInterface {
  key(key: any): void;
  costType: string;
  date: string;
  quantity: any;
  totalPrice: any;
  unit: string;
}

export interface DataIncomeInterface {
  key(key: any): void;
  tree: string;
  date: string;
  quantityInKilograms: any;
  totalPrice: any;
  unit: string;
}

export interface InputValues {
  value: string;
}

export interface UserInfor {
  email: string;
  farmName: string;
  fullName: string;
  phoneNumber: string;
  imageUrl?: string;
  isPayment: boolean;
}
