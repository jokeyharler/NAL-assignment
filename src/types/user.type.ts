import mongoose from "mongoose";

export interface user {
  id: string,
  username: string,
  password: string,
  createdAt: Date;
  updatedAt: Date;
}