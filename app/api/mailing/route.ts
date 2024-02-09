// mailingHandler.ts
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'Info@devancatours.com',
    pass: ' _mlR?H}v7qSh',
  },
});

export const mailingHandler = async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log("sending email");
    const { sender, recipient, subject, body } = req.body;

    try {
      const info = await transporter.sendMail({
        from: sender,
        to: recipient,
        subject,
        text: body, // use HTML for formatted content
      });

      console.log("mail sent");
      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error sending email!' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed!' });
  }
};



