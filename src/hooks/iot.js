// hooks/useIoT.js
import { useState, useEffect } from "react";
import awsIot from "aws-iot-device-sdk";

const useIoT = () => {
  const [device, setDevice] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const connectToIoT = () => {
      console.log("process.env.AWS_IOT_ENDPOINT", process.env.AWS_IOT_ENDPOINT);
      const client = awsIot.device({
        region: process.env.AWS_REGION,
        clientId: `nextjs_client_${Math.floor(Math.random() * 100000 + 1)}`,
        protocol: "wss",
        host: process.env.AWS_IOT_ENDPOINT,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretKey: process.env.AWS_SECRET_ACCESS_KEY,
      });

      client.on("connect", () => {
        console.log("Conectado a AWS IoT Core");
        client.subscribe("led/rgb/control");
        setConnected(true);
      });

      client.on("message", (topic, payload) => {
        console.log("Mensaje recibido:", topic, payload.toString());
      });

      setDevice(client);
    };

    connectToIoT();

    // Cleanup cuando el componente se desmonta
    return () => {
      if (device) {
        device.end();
        setConnected(false);
      }
    };
  }, []);

  const publishRGBValues = (red, green, blue) => {
    if (device) {
      const payload = JSON.stringify({ red, green, blue });
      device.publish(`home/led/${process.env.DEVICE_ID}`, payload);
      console.log("Valores RGB enviados:", payload);
    }
  };

  return {
    connected,
    publishRGBValues,
  };
};

export default useIoT;
