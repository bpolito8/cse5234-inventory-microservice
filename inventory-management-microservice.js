var express = require("express");
var app = express();
const port = process.env.PORT || 3000;

const { Client } = require("pg");

var bodyParser = require("body-parser");
// create application/json parser
var jsonParser = bodyParser.json();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

client.connect();

app.get("/InventoryMicroservice/Inventory", async function (req, res) {
  client.query(
    "SELECT table_schema,table_name FROM information_schema.tables;",
    (err, res) => {
      if (err) throw err;
      for (let row of res.rows) {
        console.log(JSON.stringify(row));
      }
      client.end();
    }
  );
  res.jsonp(products);
});

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log(`Example app listening at ${host}:${port}`);
});
