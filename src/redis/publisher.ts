import { Redis } from "ioredis";

export class Publisher {
  private static instance: Redis | null = null;
  private static readonly REDIS_URL =
    process.env.REDIS_URL || "redis://localhost:6379";

  private constructor() {}

  public static getInstance() {
    Publisher.instance ??= new Redis(Publisher.REDIS_URL);

    Publisher.instance.on("connect", () => {
      console.log("Publisher connected to Redis");
    });

    Publisher.instance.on("error", (error: Error) => {
      console.error("Publisher encountered an error:", error);
      process.exit(1);
    });

    return Publisher.instance;
  }
}
