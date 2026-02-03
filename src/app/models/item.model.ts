export interface Item {
  id: string;
  type: 'lost' | 'found';
  title: string;
  description: string;
  category: Category;
  location: string;
  date: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  createdAt: string;
}

export enum Category {
  Electronics = 'Electronics',
  Clothing = 'Clothing',
  Documents = 'Documents',
  Keys = 'Keys',
  Wallet = 'Wallet',
  Bags = 'Bags',
  Jewelry = 'Jewelry',
  Pets = 'Pets',
  Other = 'Other'
}
