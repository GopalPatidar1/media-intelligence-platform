// import amqp from "amqplib";

// let channel: any;

// export const connectQueue = async () => {
//   const connection = await amqp.connect("amqp://localhost");
//   channel = await connection.createChannel();

//   //   await channel.assertQueue("asset_processing");
//   await channel.assertQueue("asset_processing", { durable: true });

//   return channel;
// };

// export const getChannel = () => channel;
