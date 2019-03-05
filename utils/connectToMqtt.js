const mqtt = require("mqtt");
class MqttHandler {
  constructor() {
    this.options = {
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
    this.mqttClient = null;
  }

  connect() {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    this.mqttClient = mqtt.connect("mqtt://m24.cloudmqtt.com", this.options);

    // Mqtt error calback
    this.mqttClient.on("error", err => {
      console.log(err);
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on("connect", () => {
      console.log(`mqtt client connected`);
    });

    // mqtt subscriptions
    this.mqttClient.subscribe("SwimTouch", { qos: 0 });

    // When a message arrives, console.log it
    this.mqttClient.on("message", function(topic, message) {
      console.log(message.toString());
    });

    this.mqttClient.on("close", () => {
      console.log(`mqtt client disconnected`);
    });
  }

  // Sends a mqtt message to topic: mytopic
  sendMessage(message) {
    this.mqttClient.publish("SwimTouch", message);
    console.log("mqttClient " + message);
  }
}

module.exports = MqttHandler;
