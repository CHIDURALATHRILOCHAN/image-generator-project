import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import 'dotenv/config';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

const PORT = process.env.PORT || 4000
const app = express();

app.use(express.json());
// FIX: Use a more permissive CORS configuration to resolve mobile network errors
// WARNING: This is not recommended for a production environment with real user data.
app.use(cors());

await connectDB();

app.use('/api/user',userRouter);
app.use('/api/image',imageRouter);
app.get('/',(req,res)=>{
    res.send('APP is working')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
