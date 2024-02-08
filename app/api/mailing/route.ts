// pages/api/mailing/route.js
// import sendMailHandler from "./sendEmail";


// export default async function mailingHandler(req, res) {
//   if (req.method === 'POST') {
//     await sendMailHandler(req, res);
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
//}


// import { NextApiRequest, NextApiResponse } from 'next';
// import sendMailHandler from "./sendEmail.tsx";

// export default async function mailingHandler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     await sendMailHandler(req, res);
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }

// import { NextApiRequest, NextApiResponse } from 'next';
// import sendMailHandler from "./sendEmail.tsx";

// export default async function mailingHandler(req: NextApiRequest, res: NextApiResponse) {
//   // Enable CORS
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//   if (req.method === 'OPTIONS') {
//     // Preflight request. Reply successfully:
//     res.status(200).end();
//     return;
//   }

//   if (req.method === 'POST') {
//     await sendMailHandler(req, res);
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }


import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

import fs from 'fs'
import path from 'path'

import { ReactDOM } from 'react';

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kenwek1994@gmail.com',  // Your Gmail email address
    pass: 'urmbluppknnqdeow'    // Your Gmail password or an app-specific password
  }
});


export async function POST(req: Request, res: NextApiResponse) {

 // Read the template from the external file
 const templatePath = path.join(__dirname, '../../../../../templates/mail_template.html');
 const templateHTML = fs.readFileSync(templatePath, 'utf8');

 const year = new Date().getFullYear(); // Or fetch dynamically if needed

// Render the EmailTemplate component to HTML string



  if (req.method === 'POST') {
    console.log("sending email");
    
    

    console.log("request body------", req)

    const body = await req.json();

    const { sender, recipient, subject, mail_body, user_name } = body;

    // Render the template using string interpolation or a templating library
  const renderedHTML = templateHTML
  .replace(/\{recipientName\}/g, user_name)
  .replace(/\{year\}/g, year.toString());

    try {
       // Ensure that the request body is properly parsed
      

      

      const info = await transporter.sendMail({
        from: sender,
        to: recipient,
        subject,
        html: renderedHTML//mail_body, // use HTML for formatted content
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


