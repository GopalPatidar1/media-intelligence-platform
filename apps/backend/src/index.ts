import { connectDB } from '@/db/connect';

let server;
(async function () {
  await connectDB();
  import('@/app');
})();

export default server;
