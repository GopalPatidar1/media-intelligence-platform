import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './route/login';
import fileRoutes from './route/file';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
