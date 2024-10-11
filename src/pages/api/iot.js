import awsIot from "aws-iot-device-sdk";

export default function handler(req, res) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders(); // Enviar los headers al cliente inmediatamente

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
    client.subscribe("#");
  });

  client.on("message", (topic, payload) => {
    console.log("Mensaje recibido:", topic, payload.toString());

    res.write(
      `data: ${JSON.stringify({ topic, message: payload.toString() })}\n\n`
    );
    res.flush(); // Asegurarse de que el mensaje se envíe de inmediato
  });

  client.on("error", (err) => {
    console.error("Error de conexión:", err);
    // Enviar el error al cliente a través de SSE
    res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
    res.flush(); // Asegurarse de que el mensaje de error se envíe
  });

  // Mantener la conexión abierta y cerrar cuando el cliente se desconecta
  req.on("close", () => {
    console.log("Conexión cerrada");
    client.end(); // Cerrar la conexión con AWS IoT
    res.end(); // Finalizar el stream SSE
  });
}
