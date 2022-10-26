require("dotenv").config();

const express = require("express")
const app = express()
const port = process.env.PORT || 8000;

//  Enable CORS on Server
let cors = require("cors");
app.use(cors());
app.options('*', cors())

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const handler = (req, res) => {
  const d = new Date()
  res.end(d.toString())
}

allowCors(handler)

/* CROS middleware */
app.use(function(req, res, next) {
  // Mọi domain
  res.header("Access-Control-Allow-Origin", "*");
 
  // Domain nhất định
  // res.header("Access-Control-Allow-Origin", "domain");
 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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