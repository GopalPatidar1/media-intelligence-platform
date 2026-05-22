import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from '@/route/login';
import fileRoutes from '@/route/file';
import authGlobal from '@/middleware/auth';

const app = express();
const PORT = process.env.PORT || 3002;

// app.use(cors());
app.use(
  cors({
    origin: 'http://localhost:4200',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

app.use('/api/auth', authRoutes);

app.use(authGlobal);
app.use('/api/file', fileRoutes);

app.use((err: any, req: express.Request, res: express.Response) => {
  res.status(400).json({
    message: 'Something went wrong',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
