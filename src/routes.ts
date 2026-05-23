import { Router } from "express";
import { sendEmail, sendOTPEmail } from "./controller.js";

const appRoutes = Router();

appRoutes.post("/send/email", sendEmail);
appRoutes.post("/send/otp", sendOTPEmail);

export default appRoutes;
