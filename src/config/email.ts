import * as nodemailer from "nodemailer";
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: Number(process.env.MAILTRAP_PORT),
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.PASS_USER,
  },
});

const sendEmail = async (to: string, subject: string, content: string) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.MAILTRAP_EMAIL,
      to: to,
      subject: subject,
      html: content,
    });

    console.log("Email enviado:", info.messageId);
  } catch (error) {
    console.error("Error al enviar el email:", error);
  }
};

export default sendEmail;
