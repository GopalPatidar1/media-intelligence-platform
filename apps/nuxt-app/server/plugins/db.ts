import { connectDB } from "../db/connect";

export default defineNitroPlugin(async () => {
  await connectDB();
});
