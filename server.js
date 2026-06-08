const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

app.use(cors({
  origin: "https://resume-analyzer-frontend-y3mw.vercel.app/"
}));

app.use(express.json());

app.use("/api/resume", resumeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});