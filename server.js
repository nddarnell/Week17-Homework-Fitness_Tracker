const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require("./routes/routes.js"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/myFitPal", {
  useNewUrlParser: true,
  useFindAndModify: false
});


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});