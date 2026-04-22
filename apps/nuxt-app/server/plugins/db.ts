import { connectDB } from "../db/connect";

export default defineNitroPlugin(async () => {
  await connectDB();
  const { bootstrapRabbit } = await import("../services/rabbitmq");
  await bootstrapRabbit();
});
