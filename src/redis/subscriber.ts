import { Redis } from "ioredis";
import { CHANNELS } from "../constant.js";
import fs from "node:fs/promises";
import transporter from "../mails.js";

export class Subscriber {
  private static instance: Redis | null = null;
  private static readonly REDIS_URL =
    process.env.REDIS_URL || "redis://localhost:6379";

  private constructor() {}

  public static async getInstance() {
    Subscriber.instance ??= new Redis(Subscriber.REDIS_URL);

    Subscriber.instance.on(
      "message",
      async (channel: string, message: string) => {
        // Handle messages based on the channel

        if (channel === CHANNELS.NOTIFICATIONS) {
          const parsedMessage = JSON.parse(message);
          const { content } = parsedMessage;
          const { email, message: emailMessage } = content;

          const design = (await fs.readFile("./templates/welcome.html"))
            .toString()
            .replace("{{message}}", emailMessage);

          const mailOptions = {
            from: `Coding Works <${process.env.AUTH_USER}>`,
            to: email,
            subject: "Welcome on-board!",
            text: "This is the plain text body of the email.",
            html: design,
          };

          await transporter.sendMail(mailOptions);
          console.log("Mail sent successfully to:", email);
        }

        if (channel === CHANNELS.OTPS) {
          console.log("Received a message on channel:", channel);

          const parsedMessage = JSON.parse(message);
          const { content } = parsedMessage;
          const { email, time, otp, name } = content;

          const design = (await fs.readFile("./templates/otp.html"))
            .toString()
            .replace("{{time}}", time)
            .replace("{{otp}}", otp)
            .replace("{{name}}", name);

          const mailOptions = {
            from: `Coding Works <${process.env.AUTH_USER}>`,
            to: email,
            subject: "Verify your identity",
            text: "This is the plain text body of the email.",
            html: design,
          };

          await transporter.sendMail(mailOptions);
          console.log("OTP Mail sent successfully to:", email);
        }
      },
    );

    Subscriber.instance.on("connect", () => {
      console.log("Subscriber connected to Redis");
    });

    Subscriber.instance.on("error", (error: Error) => {
      console.error("Subscriber encountered an error:", error);
      process.exit(1);
    });

    await Subscriber.instance.subscribe(CHANNELS.NOTIFICATIONS);
    await Subscriber.instance.subscribe(CHANNELS.OTPS);

    return Subscriber.instance;
  }
}
