// pages/api/mailing/route.js
import sendMailHandler from './sendEmail';

export default async function mailingHandler(req, res) {
  if (req.method === 'POST') {
    await sendMailHandler(req, res);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
