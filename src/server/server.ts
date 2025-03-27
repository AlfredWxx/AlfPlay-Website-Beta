import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactHandler from './api/contact';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API 路由
app.post('/api/contact', contactHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 