export interface Transaction {
  id: string; // Firestore usa IDs como strings
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}