
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  credits: number;
  createdAt: Date;
  updatedAt: Date;
}
