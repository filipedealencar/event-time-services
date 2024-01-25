import mongoose, { Document, Schema } from "mongoose";

interface IEvent extends Document {
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  userId: mongoose.Types.ObjectId;
}

const eventSchema = new mongoose.Schema({
  title: { type: Schema.Types.String, required: true },
  description: { type: Schema.Types.String },
  startTime: { type: Schema.Types.Date, required: true },
  endTime: { type: Schema.Types.Date, required: true },
  userId: { type: Schema.Types.ObjectId, required: true },
});

const Event = mongoose.model<IEvent>("events", eventSchema);

export default Event;
