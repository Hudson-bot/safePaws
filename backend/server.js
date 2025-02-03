const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
  const { name, email, mobileNumber, address, petName, description } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.user, // Your Gmail address
      pass: process.env.pass,    // Your Gmail password or app-specific password
    },
  });

  const mailOptions = {
    from: 'safePaws19@gmail.com',
    to: 'safePaws19@gmail.com',
    subject: 'New Contact Form Submission',
    text: `
      Name: ${name}
      Email: ${email}
      Mobile Number: ${mobileNumber}
      Address: ${address}
      Pet Name: ${petName}
      Description: ${description}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});