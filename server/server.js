const express = require("express");
const morgan = require("morgan");
var path = require('path');
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const request = require('superagent');
require("dotenv").config();
var callback = require('./routes/callback');

const app = express();
const db_uri =
  "mongodb+srv://HK_superworld:BugfexRacfJjG7y@superworldvna.gxlyf.mongodb.net/test?retryWrites=true&w=majority";
// connect to db
mongoose
  .connect(db_uri, {
    //process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

// import routes
const authRoutes = require("./routes/auth");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
// app.use(cors()); // allows all origins
if ((process.env.NODE_ENV = "development")) {
  app.use(cors({ origin: `http://localhost:3000` }));
}

// middleware
app.use("/api", authRoutes);
app.use('/callback', callback);

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});





