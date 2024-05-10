const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(cors()); // Позволяет всем источникам делать запросы

mongoose.connect("mongodb://localhost/routes-db");
app.use(bodyParser.json({ limit: '20mb' })); // Устанавливаем максимальный размер тела запроса
app.use("/api", require("./api"));

app.listen(4000, () => {
  console.log("server is listening");
});
