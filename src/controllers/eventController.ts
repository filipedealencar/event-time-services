import { Response, Request } from "express";
import Event from "../models/eventModel";

export class EventControllers {
  getAllEvents = async (req: Request, res: Response): Promise<void> => {
    try {
      const events = await Event.find({ userId: req.body.userId });
      console.log(req);
      res.json(events);
    } catch (error: any) {
      console.log(req);
      res.status(500).json({ message: error.message });
    }
  };

  createEvent = async (req: Request, res: Response): Promise<void> => {
    const event = new Event({
      description: req.body.description,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      userId: req.body.userId,
    });

    try {
      const newEvent = await event.save();
      res.status(201).json(newEvent);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  updateEvent = async (req: Request, res: Response): Promise<void> => {
    const eventId = req.params.id;

    try {
      const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        {
          description: req.body.description,
          startTime: req.body.startTime,
          endTime: req.body.endTime,
        },
        { new: true }
      );

      if (!updatedEvent) {
        res.status(404).json({ message: "Event not found" });
        return;
      }

      res.json(updatedEvent);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  deleteEvent = async (req: Request, res: Response): Promise<void> => {
    const eventId = req.params.id;

    try {
      const deletedEvent = await Event.findByIdAndDelete(eventId);

      if (!deletedEvent) {
        res.status(404).json({ message: "Event not found" });
        return;
      }

      res.json({ message: "Event deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}
