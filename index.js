require("dotenv").config();

const express = require("express")
const app = express()
const port = process.env.PORT || 8000;

//  Enable CORS on Server
let cors = require("cors");
app.use(cors());
app.options('https://api-registration-hagaosp5f-doritran.vercel.app/*', cors())

// Read body post
app.use(
  express.urlencoded({
      extended: true,
  }),
);
app.use(express.json());

//router
const route = require("./api/routes/index");
route(app);

//database
const db = require("./api/config/db");
db();

app.listen(port, () => {
  console.log("App listening at port", port);
});