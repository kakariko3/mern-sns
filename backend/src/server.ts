import 'dotenv/config';
import express from 'express';
import { connect } from 'mongoose';

// const userRoute = require('./routes/users');
import userRoute from './routes/users';
import authRoute from './routes/auth';
import postRoute from './routes/posts';

const app = express();
const PORT = 3000;

// データベース接続
connect(process.env.MONGO_URL!)
  .then(() => {
    console.log('DBと接続中...');
  })
  .catch((error) => {
    console.error(error);
  });

app.get('/', (req, res) => {
  res.send('hello express');
});

// ミドルウェア
app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

app.listen(PORT, () => console.log('サーバーが起動しました'));
