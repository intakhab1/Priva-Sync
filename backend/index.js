const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");
const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");

dotenv.config();

const app = express();
const PORT= process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//connect to database
connectDB();

//test route
app.get("/", (req, res) => {
  res.json({ message: "Backend server is running!" });
});

//routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
