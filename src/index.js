const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/route");
const mongoose = require("mongoose");
const multer=require("multer")
const app = express();

app.use(bodyParser.json());
app.use(multer().any())
app.use(bodyParser.urlencoded({ extended: true }));


mongoose
  .connect(
    "mongodb+srv://Daniel997:0C3UNDypy94fmHDP@cluster0.zyocpul.mongodb.net/group62Database",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

//params validation
app.use(function (req, res) {
  var err = new Error('Not Found');
  return res.status(400).send({status : false, msg : "path not found"})
  });


app.listen(process.env.PORT || 3001, function () {
  console.log("Express app running on port " + (process.env.PORT || 3001));
});
