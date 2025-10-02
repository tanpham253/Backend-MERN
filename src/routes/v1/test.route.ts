import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Setup transporter from env
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
} as nodemailer.TransportOptions);

// Route to test server
router.get("/test", async (req, res) => {
  res.json({ message: "Test create token!" });
});

// Route to send email
router.post("/send-mail", async (req, res) => {
  try {
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: process.env.MAIL_USER, // default to self if no "to"
      subject: "Test email " + Date.now(),
      html: "<b>Hello world!</b>",
    };

    const info = await transporter.sendMail(mailOptions);

    res.json({
      message: "Test send mail success!",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("Send mail failed:", error);
    res.status(500).json({ message: "Test send mail failed!", error });
  }
});

export default router;
