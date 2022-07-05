import * as dotenv from 'dotenv' 
dotenv.config();
import express from 'express';
import mongoose from 'mongoose'
import { json } from 'body-parser';
import cors from 'cors';
import  {cityWeatherDataRouter, cityWeatherDataAuth}  from './routes';

const app = express()
app.use(cors({origin:true,credentials: true}));
app.use(json())
app.use(cityWeatherDataAuth)
app.use(cityWeatherDataRouter)

const dataBaseName = 'cityWeatherData'
mongoose.connect(`mongodb://localhost:27017/${dataBaseName}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}, () => {
  console.log('connected to database')
})

app.listen(3001, () => {
  console.log('server is listening on port 3001')
})