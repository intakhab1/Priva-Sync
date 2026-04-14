const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

//middleware
app.use(cors());
app.use(express.json()); //to parse json body

//test route
app.get("/", (req, res) => {
  res.json({ message: "Backend server is running!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
