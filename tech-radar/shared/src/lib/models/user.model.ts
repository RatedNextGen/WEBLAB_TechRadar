import { Document } from "mongoose";

export enum UserRole {
  CTO = "CTO",
  TECH_LEAD = "Tech-Lead",
  EMPLOYEE = "Employee"
}

export interface User extends Document {
  email: string;
  password: string;
  role: UserRole;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
