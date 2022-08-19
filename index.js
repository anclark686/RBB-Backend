const { application } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes/routes");
const dotenv = require('dotenv').config();
const cors = require("cors")
 
const app = express();
app.use(express.json());

const corsOptions = {
  origin: 'https://reyaly-black-book.netlify.app/',
  optionsSuccessStatus: 200,
  credentials: true
}
app.use(cors(corsOptions));

const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const cluster = process.env.CLUSTER;
const dbname = "tutorial_db";


mongoose.connect(
    `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
 
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(Router);

let PORT = 3001;

app.listen(process.env.PORT || PORT,  () => {
    console.log(`Running  on port ${PORT}`)
}) 
