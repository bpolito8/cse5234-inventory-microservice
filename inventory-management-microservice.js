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

app.get("/InventoryMicroservice/Inventory", async function (request, result) {
  client.query(
    "SELECT * FROM plant;",
    (err, res) => {
      if (err) throw err;
      result.jsonp(res.rows);
    });
});

app.post("/InventoryMicroservice/Update", async function (request, response) {
  console.log("In update call")
  console.log(req.body)
  req.body.products.array.forEach(product => {
    client.query(
      "UPDATE plant SET quantity = quantity - $1 WHERE id = $2;",
      [
        product.quantity,
        product.id
      ],
      (err, res) => {
        if (err) throw err;
      });
  });
})


var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log(`Example app listening at ${host}:${port}`);
});
