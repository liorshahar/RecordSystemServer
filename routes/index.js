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

var results = [];

// client connection
var client = mqtt.connect("mqtt://m24.cloudmqtt.com", options);

// enable the subscription router
var routerMqttrouter = mqttrouter.wrap(client);

// subscribe to messages for client-connected
routerMqttrouter.subscribe("client-connected", function(topic, message) {
  console.log(
    "received from " + topic + ": " + "client connected-> " + message.toString()
  );
});
// subscribe to messages for start-timestamp
routerMqttrouter.subscribe("start-timestamp", function(topic, message) {
  console.log(
    "received from " + topic + ": " + "start-timestamp-> " + message.toString()
  );
  results.push({ start: message.toString() });
});

// subscribe to messages for touch-time
routerMqttrouter.subscribe("touch-time1", function(topic, message) {
  console.log("received from " + topic + ": " + message.toString());
  results.push({ "touch from sensor1": message.toString() });
});

// subscribe to messages for touch-time
routerMqttrouter.subscribe("touch-time2", function(topic, message) {
  console.log("received from " + topic + ": " + message.toString());
  results.push({ "touch from sensor2": message.toString() });
});

/* GET home page. */
router.get("/", function(req, res, next) {
  console.log("coach start swim");
  client.publish("start-swim", "start");
  res.render("index", { title: "Express" });
});

router.get("/getResults", function(req, res, next) {
  console.log("getResults");
  res.send(results);
  results = [];
});
module.exports = router;
