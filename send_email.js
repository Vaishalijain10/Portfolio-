import Mailjet from "node-mailjet";
import "dotenv/config";

// Initialize the Mailjet client with your API keys
const mailjet = Mailjet.connect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_API_SECRET
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, _replyto, subject, message } = req.body;

    try {
      const response = await mailjet.post("send").request({
        Messages: [
          {
            From: {
              Email: _replyto,
              Name: name,
            },
            To: [
              {
                Email: "vaishalijain.vj.10@gmail.com",
                Name: "Vaishali Jain",
              },
            ],
            Subject: subject,
            TextPart: message,
            HTMLPart: `<h3>${subject}</h3><p>${message}</p>`,
          },
        ],
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, error: "Failed to send email" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
