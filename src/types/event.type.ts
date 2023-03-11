import mongoose from "mongoose";

export interface event {
  id: string,
  eventName: string,
  description: string,
  startDate: Date;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}