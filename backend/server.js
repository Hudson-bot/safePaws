const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const petController = require("./controllers/petController");
const emailController = require("./controllers/emailController");
const Pet = require("./models/petModel"); // Import Pet model
const paymentRoutes = require("./routes/paymentRoutes"); // Import Razorpay payment routes

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes); // Razorpay Payment Routes

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  });

// Fetch Pets from DB
app.get("/pets", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Email Route
app.post("/send-email", async (req, res) => {
  const { name, email, mobileNumber, address, petName, description } = req.body;

  if (
    !name ||
    !email ||
    !mobileNumber ||
    !address ||
    !petName ||
    !description
  ) {
    return res
      .status(400)
      .json({ error: "Missing one or more required parameters" });
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
    res
      .status(500)
      .json({ error: "Error sending email", details: error.message });
  }
});

// Razorpay Instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Payment Order
app.post('/api/payment/create-order', async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;
    const order = await Razorpay.orders.create({
      amount,
      currency, 
      receipt,
      payment_capture: 1
    });
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});


// Verify Payment
app.post("/api/payment/verify-payment", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      res.json({ success: true, message: "Payment verified successfully!" });
    } else {
      res.status(400).json({ error: "Invalid signature!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error verifying payment", details: error.message });
  }
});

// Start Server
app
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .on("error", (error) => {
    console.error("Error starting server:", error.message);
    process.exit(1);
  });

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});