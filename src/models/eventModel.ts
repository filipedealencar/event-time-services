import mongoose, { Document, Schema } from "mongoose";

interface IEvent extends Document {
  description: string;
  startTime: Date;
  endTime: Date;
  userId: number;
}

const eventSchema = new mongoose.Schema({
  description: { type: Schema.Types.String, required: true },
  startTime: { type: Schema.Types.Date, required: true },
  endTime: { type: Schema.Types.Date, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Event = mongoose.model<IEvent>("events", eventSchema);

export default Event;
