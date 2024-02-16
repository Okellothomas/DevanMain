// mailingHandler.ts
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import path from "path"
import fs from "fs"


// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  //service: 'webmail',
  host:'smtp.devancatours.com',
   port: 587,
  secure: false, // Change to true if your SMTP server requires TLS
  auth: {
    user: 'info@devancatours.com',
    pass: '_mlR?H}v7qSh',
  },
});


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
      console.log(templateName)
      const templatePath = path.join(__dirname, `../../../../../templates/${templateName}.html`);
      const templateHTML = fs.readFileSync(templatePath, 'utf8');

    // Render the template using string interpolation or a templating library
  const renderedHTML = templateHTML
  .replace(/\{recipientName\}/g, user_name)
  .replace(/\{year\}/g, year.toString());

    try {
      const info = await transporter.sendMail({
        from: sender,
        to: recipient,
        subject,
        html: renderedHTML , // use HTML for formatted content
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




