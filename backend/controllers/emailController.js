const nodemailer = require("nodemailer");

exports.sendEmail = async (req, res) => {
  const { name, email, mobileNumber, address, petName, description } = req.body;
  if (!name || !email || !mobileNumber || !address || !petName || !description) {
    return res.status(400).json({ error: "Missing email parameters" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: `Pet Service Request for ${petName}`,
    text: `Hello ${name},\n\nWe have received your request for ${petName}.\nDetails:\nAddress: ${address}\nPhone: ${mobileNumber}\nDescription: ${description}\n\nThank you!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error sending email", details: error.message });
  }
};