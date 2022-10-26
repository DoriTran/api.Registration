require("dotenv").config();

const express = require("express")
const app = express()
const port = process.env.PORT || 8000;

// app.all('/', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next()
// });

//  Enable CORS on Server
let cors = require("cors");
app.use(cors());

// Read body post
app.use(
  express.urlencoded({
      extended: true,
  }),
);
app.use(express.json());

//router
const route = require("./routes/index");
route(app);

//database
const db = require("./config/db");
db();

app.listen(port, () => {
  console.log("App listening at port", port);
});