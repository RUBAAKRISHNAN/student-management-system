const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const studentRoutes = require("./routes/studentRoutes");
const authRouter = require("./routes/authRoutes");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://student-management-system-liart-zeta.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/api/students", studentRoutes);
app.use("/api/auth", authRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello World");
  console.log("Hello World");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});