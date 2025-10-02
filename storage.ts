import { 
  type Volume, 
  type InsertVolume,
  type Reflection,
  type InsertReflection,
  type SessionRequest,
  type InsertSessionRequest,
  type EmailSubscriber,
  type InsertEmailSubscriber
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Volumes
  getVolumes(): Promise<Volume[]>;
  getCurrentVolume(): Promise<Volume | undefined>;
  createVolume(volume: InsertVolume): Promise<Volume>;
  
  // Reflections
  getReflections(): Promise<Reflection[]>;
  createReflection(reflection: InsertReflection): Promise<Reflection>;
  
  // Session Requests
  getSessionRequests(): Promise<SessionRequest[]>;
  createSessionRequest(request: InsertSessionRequest): Promise<SessionRequest>;
  
  // Email Subscribers
  getEmailSubscribers(): Promise<EmailSubscriber[]>;
  createEmailSubscriber(subscriber: InsertEmailSubscriber): Promise<EmailSubscriber>;
}

export class MemStorage implements IStorage {
  private volumes: Map<string, Volume>;
  private reflections: Map<string, Reflection>;
  private sessionRequests: Map<string, SessionRequest>;
  private emailSubscribers: Map<string, EmailSubscriber>;

  constructor() {
    this.volumes = new Map();
    this.reflections = new Map();
    this.sessionRequests = new Map();
    this.emailSubscribers = new Map();
    
    // Seed with sample data
    this.seedData();
  }

  private seedData() {
    // Create sample volumes
    const volume1: Volume = {
      id: randomUUID(),
      title: "Vol. III — The Mirror Month",
      volume_number: 3,
      poem_content: `In the mirror of morning light,
I see not what I think I am,
but what I've always been—
a question learning to love
its own uncertainty...

The reflection shifts and dances,
showing me fragments of truth
I've been too afraid to claim.
Today, I choose to see
with softer eyes.`,
      reflection_prompt: "What face do you see when no one is watching? What truth emerges when the performance ends?",
      soundscape_url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Sample URL
      soundscape_title: "Forest Dawn — 20 minutes of gentle bird songs and rustling leaves",
      release_date: new Date(),
      is_current: true,
    };

    const volume2: Volume = {
      id: randomUUID(),
      title: "Vol. II — The Seed Beneath",
      volume_number: 2,
      poem_content: `Beneath the frost of winter's grip,
a seed waits in darkness,
holding the memory of light
it has never seen.

Faith is not certainty—
it is the seed's willingness
to crack open
in the underground.`,
      reflection_prompt: "What seeds of potential lie dormant within you? What conditions would help them sprout?",
      soundscape_url: null,
      soundscape_title: null,
      release_date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
      is_current: false,
    };

    const volume3: Volume = {
      id: randomUUID(),
      title: "Vol. I — The Threshold",
      volume_number: 1,
      poem_content: `Every door is also a choice.
Every choice, a small death
of the person you were
a moment before.

Stand at the threshold
and feel the wind
from both sides—
what calls you forward?`,
      reflection_prompt: "Every beginning is a crossing. What do you leave behind? What do you carry forward?",
      soundscape_url: null,
      soundscape_title: null,
      release_date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), // 3 weeks ago
      is_current: false,
    };

    this.volumes.set(volume1.id, volume1);
    this.volumes.set(volume2.id, volume2);
    this.volumes.set(volume3.id, volume3);
  }

  async getVolumes(): Promise<Volume[]> {
    return Array.from(this.volumes.values()).sort((a, b) => 
      new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
    );
  }

  async getCurrentVolume(): Promise<Volume | undefined> {
    return Array.from(this.volumes.values()).find(v => v.is_current);
  }

  async createVolume(insertVolume: InsertVolume): Promise<Volume> {
    const id = randomUUID();
    const volume: Volume = { 
      ...insertVolume, 
      id,
      release_date: insertVolume.release_date || new Date(),
      soundscape_url: insertVolume.soundscape_url || null,
      soundscape_title: insertVolume.soundscape_title || null,
      is_current: insertVolume.is_current || false,
    };
    this.volumes.set(id, volume);
    return volume;
  }

  async getReflections(): Promise<Reflection[]> {
    return Array.from(this.reflections.values()).sort((a, b) => 
      new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime()
    );
  }

  async createReflection(insertReflection: InsertReflection): Promise<Reflection> {
    const id = randomUUID();
    const reflection: Reflection = { 
      ...insertReflection, 
      id,
      created_at: new Date(),
      volume_id: insertReflection.volume_id || null,
      anonymous_sharing: insertReflection.anonymous_sharing || false,
    };
    this.reflections.set(id, reflection);
    return reflection;
  }

  async getSessionRequests(): Promise<SessionRequest[]> {
    return Array.from(this.sessionRequests.values()).sort((a, b) => 
      new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime()
    );
  }

  async createSessionRequest(insertRequest: InsertSessionRequest): Promise<SessionRequest> {
    const id = randomUUID();
    const request: SessionRequest = { 
      ...insertRequest, 
      id,
      created_at: new Date(),
      status: "pending",
    };
    this.sessionRequests.set(id, request);
    return request;
  }

  async getEmailSubscribers(): Promise<EmailSubscriber[]> {
    return Array.from(this.emailSubscribers.values()).sort((a, b) => 
      new Date(b.subscribed_at!).getTime() - new Date(a.subscribed_at!).getTime()
    );
  }

  async createEmailSubscriber(insertSubscriber: InsertEmailSubscriber): Promise<EmailSubscriber> {
    const id = randomUUID();
    const subscriber: EmailSubscriber = { 
      ...insertSubscriber, 
      id,
      subscribed_at: new Date(),
      is_active: true,
    };
    this.emailSubscribers.set(id, subscriber);
    return subscriber;
  }
}

export const storage = new MemStorage();
