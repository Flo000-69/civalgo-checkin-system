export type UserRole = 'worker' | 'supervisor';

export interface User {
  name: string;
  role: UserRole;
}