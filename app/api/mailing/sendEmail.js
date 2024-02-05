const nodemailer = require('nodemailer');

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kenwek1994@gmail.com',  // Your Gmail email address
      pass: 'urmbluppknnqdeow'    // Your Gmail password or an app-specific password
    }
  });

export default async function sendMailHandler(req, res) {
    if (req.method === 'POST') {
      console.log("sendin mi")
      const { sender, recipient, subject, body } = req.body;
  
      try {
        const info = await transporter.sendMail({
          from: sender,
          to: recipient,
          subject,
          text: body, // use HTML for formatted content
        });
  
        console.log("mail sent")
        res.status(200).json({ message: 'Email sent successfully!' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error sending email!' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed!' });
    }
  }
  