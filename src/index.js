import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './config/dbConnect.js';
import posts from './routes/api/posts.js';
import users from './routes/auth/register.js';
import login from './routes/auth/login.js';
import { options } from './config/options.js';
import { corsOptions } from './config/corsOption.js';

const app = express();
const PORT = 7070 || process.env.PORT;
const specifications = swaggerJSDoc(options);

// const users = [];

//connect database
connectDB();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specifications));
app.use('/api/v1', posts);
app.use('/api/v1', users);
app.use('/api/v1', login);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB! 🚀🚀🚀🚀');
  app.listen(PORT, () =>
    console.log(`Server running on port ${PORT} ⚡⚡⚡⚡`)
  );
});
export default app;
