var express = require("express");
var router = express.Router();
var mqtt = require("mqtt");
var mqttrouter = require("mqtt-router");
var options = {
  port: 17022,
  host: "mqtt://m24.cloudmqtt.com",
  clientId:
    "mqttjs_" +
    Math.random()
      .toString(16)
      .substr(2, 8),
  username: "oiidqtdo",
  password: "0TDWlrS_abQd",
  keepalive: 60,
  reconnectPeriod: 1000,
  protocolId: "MQIsdp",
  protocolVersion: 3,
  clean: true,
  encoding: "utf8"
};

// client connection
var client = mqtt.connect("mqtt://m24.cloudmqtt.com", options);

// enable the subscription router
var routerMqttrouter = mqttrouter.wrap(client);

// subscribe to messages for 'hello/me'
routerMqttrouter.subscribe("myTopic", function(topic, message) {
  console.log("received", topic, message.toString());
});

/* GET home page. */
router.get("/", function(req, res, next) {
  client.publish("myTopic", "start");
  res.render("index", { title: "Express" });
});

module.exports = router;
