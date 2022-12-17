require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const messageRoutes = require("./routes/messages");
const userRoutes = require("./routes/user");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/messages", messageRoutes);
app.use("/user", userRoutes);

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
