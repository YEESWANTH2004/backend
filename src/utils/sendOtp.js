const Mailgen = require("mailgen");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const sendOtp = async (email, otp) => {
  let config = {
    service: "gmail",
    auth: {
      user: process.env.SERVER_EMAIL, // Your Gmail address
      pass: process.env.APP_PASSWORD, // App password (not your Gmail password)
    },
  };

  const transporter = nodemailer.createTransport(config);

  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Rural Connect",
      link: "https://yourwebsite.com",
      copyright: "Copyright © 2025 Rural Connect. All rights reserved.",
    },
  });

  let response = {
    body: {
      name: "User",
      intro: [
        "Here is your One-Time Password (OTP) for logging into Rural Connect:",
        `**${otp}**`,
      ],
      outro: "This OTP is valid for 5 minutes. Do not share it with anyone.",
    },
  };

  let mail = mailGenerator.generate(response);

  let message = {
    from: process.env.SERVER_EMAIL,
    to: email,
    subject: "Your Rural Connect OTP Code",
    html: mail,
  };

  try {
    await transporter.sendMail(message);
    console.log("✅ OTP email sent to:", email);
    return { success: true, message: "OTP sent to your email" };
  } catch (err) {
    console.error("❌ Error sending OTP email:", err.message);
    return { success: false, message: "Failed to send OTP" };
  }
};

module.exports = sendOtp;
