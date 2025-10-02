import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertReflectionSchema, insertSessionRequestSchema, insertEmailSubscriberSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all volumes
  app.get("/api/volumes", async (req, res) => {
    try {
      const volumes = await storage.getVolumes();
      res.json(volumes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch volumes" });
    }
  });

  // Get current volume
  app.get("/api/volumes/current", async (req, res) => {
    try {
      const currentVolume = await storage.getCurrentVolume();
      if (!currentVolume) {
        res.status(404).json({ message: "No current volume found" });
        return;
      }
      res.json(currentVolume);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch current volume" });
    }
  });

  // Submit reflection
  app.post("/api/reflections", async (req, res) => {
    try {
      const validatedData = insertReflectionSchema.parse(req.body);
      const reflection = await storage.createReflection(validatedData);
      res.status(201).json(reflection);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to create reflection" });
      }
    }
  });

  // Submit session request
  app.post("/api/session-requests", async (req, res) => {
    try {
      const validatedData = insertSessionRequestSchema.parse(req.body);
      const sessionRequest = await storage.createSessionRequest(validatedData);
      res.status(201).json(sessionRequest);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to create session request" });
      }
    }
  });

  // Email subscription
  app.post("/api/subscribe", async (req, res) => {
    try {
      const validatedData = insertEmailSubscriberSchema.parse(req.body);
      
      // Check if email already exists
      const subscribers = await storage.getEmailSubscribers();
      const existingSubscriber = subscribers.find(s => s.email === validatedData.email && s.is_active);
      
      if (existingSubscriber) {
        res.status(409).json({ message: "Email already subscribed" });
        return;
      }

      const subscriber = await storage.createEmailSubscriber(validatedData);
      res.status(201).json(subscriber);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Failed to subscribe email" });
      }
    }
  });

  // Get reflections (admin endpoint)
  app.get("/api/reflections", async (req, res) => {
    try {
      const reflections = await storage.getReflections();
      res.json(reflections);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reflections" });
    }
  });

  // Get session requests (admin endpoint)
  app.get("/api/session-requests", async (req, res) => {
    try {
      const requests = await storage.getSessionRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch session requests" });
    }
  });

  // Get email subscribers (admin endpoint)
  app.get("/api/subscribers", async (req, res) => {
    try {
      const subscribers = await storage.getEmailSubscribers();
      res.json(subscribers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subscribers" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
