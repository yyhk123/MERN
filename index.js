const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// set up express
const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("The sever has started on port: ${port}"));

// set up mongoose
//const uri = process.env.MONGODB_CONNECTION_STRING;
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("mern-auth-front/build"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "mern-auth-front", "build", "index.html")
    );
  });
}

app.use("/users", require("./routes/userRouter"));
