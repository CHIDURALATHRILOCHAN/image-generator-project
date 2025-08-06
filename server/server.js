import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import 'dotenv/config';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

const PORT = process.env.PORT || 4000
const app = express();

app.use(express.json());
// FIX: Configure CORS to allow requests from your Vercel frontend URL
app.use(cors({
  origin: 'https://image-frontend-kohl.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
await connectDB();

app.use('/api/user',userRouter);
app.use('/api/image',imageRouter);
app.get('/',(req,res)=>{
    res.send('APP is working')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
