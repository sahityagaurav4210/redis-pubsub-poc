import type { Request, Response } from "express";
import { CHANNELS } from "./constant.js";
import { Publisher as Pub } from "./redis/index.js";

export async function sendEmail(
  request: Request,
  response: Response,
): Promise<void> {
  const { email, message } = request.body;
  const publisher = Pub.getInstance();

  //Payload structure can be modified as per the requirements of the subscriber
  const payload = {
    content: {
      email,
      message,
    },
    timestamp: new Date().toISOString(),
  };

  await publisher.publish(CHANNELS.NOTIFICATIONS, JSON.stringify(payload));

  response
    .status(200)
    .json({ success: true, message: "Email sent successfully" });
}

export async function sendOTPEmail(
  request: Request,
  response: Response,
): Promise<void> {
  const { email, name, otp, time } = request.body;
  const publisher = Pub.getInstance();

  //Payload structure can be modified as per the requirements of the subscriber
  const payload = {
    content: {
      email,
      name,
      otp,
      time,
    },
    timestamp: new Date().toISOString(),
  };

  await publisher.publish(CHANNELS.OTPS, JSON.stringify(payload));

  response
    .status(200)
    .json({ success: true, message: "OTP sent successfully" });
}
