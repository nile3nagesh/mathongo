const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const uri = process.env.ATLAS_URI;
// console.log(uri);
const options = {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(uri, options)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err));

const signup = require("./routes/signup");
const signin = require("./routes/signin");
app.use("/signup", signup);
app.use("/signin",signin);

app.listen(5000, (err) => {
  console.log("listening");
  if (err) console.log(err);
});
