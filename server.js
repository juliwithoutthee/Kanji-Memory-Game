const express = require("express");
const knex = require("knex");
const app = express();
const cors = require('cors');
// const morgan = require('morgan');
require("dotenv").config({
  path: "./.env.local",
});
const environment = process.env.DATABASE_URL ? "production" : "development";
const config = require("./knexfile");
const db = knex(config[environment]);

const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "./src")));

app.use(express.json());

app.use(cors());
// app.use(morgan("dev"));

app.get("/kanji", async (req, res) => {
  try {
    let allKanji = await db.select("*").from("kanji");
    res.send(allKanji).status(200);
  } catch (err) {
    console.log(err);
  }
});

app.post("/kanji", async (req, res) => {
  try {
    let newKanji = await db.insert(req.body).into("kanji");
    res.send(newKanji).status(200);
  } catch (err) {
    console.log(err);
  }
});
/*  */
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
