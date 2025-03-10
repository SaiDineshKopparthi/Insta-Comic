require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const aiRoutes = require("./routes/aiRoutes");
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("INSTA COMIC HAS A PERFECT BACKEND 😉");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
