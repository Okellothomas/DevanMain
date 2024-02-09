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

<<<<<<< HEAD
export const mailingHandler = async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log("sending email");
    const { sender, recipient, subject, body } = req.body;
=======

export async function POST(req: Request, res: NextApiResponse) {

 // Read the template from the external file
 //const templatePath = path.join(__dirname, '../../../../../templates/mail_template.html');
 //const templateHTML = fs.readFileSync(templatePath, 'utf8');

 
 // Render the EmailTemplate component to HTML string
 
 
 
 if (req.method === 'POST') {
   
   
      const year = new Date().getFullYear(); // Or fetch dynamically if needed

      // Construct the path to the template file dynamically
      
      const body = await req.json();
      
      const { sender, recipient, subject, mail_body, user_name, templateName } = body;
      const templatePath = path.join(__dirname, `../../../../../templates/${templateName}.html`);
      const templateHTML = fs.readFileSync(templatePath, 'utf8');

    // Render the template using string interpolation or a templating library
  const renderedHTML = templateHTML
  .replace(/\{recipientName\}/g, user_name)
  .replace(/\{year\}/g, year.toString());
>>>>>>> cb74eb3544bcec392e0adb74acd7e8f34a1eb0fb

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



