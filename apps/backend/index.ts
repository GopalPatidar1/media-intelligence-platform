import config from 'config';
import { connectDB } from './src/db/connect';

let server;
(async function () {
  await connectDB();
  import('./src/app.js');
})();

export default server;
