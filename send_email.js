// api/send-email.js

import { Client } from "@sendgrid/mail";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, subject, message } = req.body;

    // Initialize SendGrid client
    const client = new Client();
    client.setApiKey(process.env.SENDGRID_API_KEY);

    // Define the email content
    const msg = {
      to: "vaishalijain.vj.10@gmail.com", // Replace with your email address
      from: email, // This should be a verified sender in SendGrid
      subject: `Contact Form Submission: ${subject}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    try {
      await client.send(msg);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to send email" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
