var express = require("express");
var router = express.Router();
var mqttHandler = require("../utils/connectToMqtt");

var mqttClient = new mqttHandler();
mqttClient.connect();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/start", function(req, res, next) {
  console.log("start");
  mqttClient.sendMessage("start");
  res.status(200).send("Message sent to mqtt " + new Date());
});

module.exports = router;
