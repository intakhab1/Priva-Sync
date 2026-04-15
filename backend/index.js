const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./db");
const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");


const app = express();
const PORT= process.env.PORT || 5001;

//middleware
app.use(express.json());
app.use(
	cors({
		// origin: "*",
		origin:"http://localhost:3000", // frontend
		credentials: true,
	})
);

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
