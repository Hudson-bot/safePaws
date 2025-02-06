const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
require("dotenv").config();
const productRoutes = require("./routes/productRoutes");
const productController = require('./controllers/productController')
const petController = require('./controllers/petController')
const emailController = require('./controllers/emailController')

const app = express();
const PORT = process.env.PORT || 3001; // Use environment variable for port if available

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/api/products", productRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, // Enable these options for better connection management
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit the process if unable to connect to MongoDB
  });

// Email Route
app.post("/send-email", async (req, res) => {
  const { name, email, mobileNumber, address, petName, description } = req.body;

  // Validate required fields
  if (!name || !email || !mobileNumber || !address || !petName || !description) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  // Configure Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail", // Can change to another provider
    auth: {
      user: process.env.SMTP_USER, // Your email (from .env)
      pass: process.env.SMTP_PASS, // Your app password (from .env)
    },
  });

  // Email content
  const mailOptions = {
    from: process.env.SMTP_USER, // Sender's email
    to: email, // Recipient's email
    subject: `Pet Service Request for ${petName}`, // Subject of the email
    text: `Hello ${name},\n\nWe have received your request for ${petName}.\nDetails:\nAddress: ${address}\nPhone: ${mobileNumber}\nDescription: ${description}\n\nThank you!`,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${email}`);
    res.json({ success: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error.message);
    res.status(500).json({ error: "Error sending email", details: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on("error", (error) => {
  console.error("Error starting server:", error.message);
  process.exit(1); // Exit process if there's an error during server start
});
