import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';


const PORT = Number(getEnvVar('PORT', '8080'));


export function setupServer() {
    const app = express();

    app.use(express.json());
    app.use(cors());

      app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
    );



    app.get('/', (req, res) => {
  res.json({
    message: 'Hello world!',
  });
});

    app.listen(PORT, ()=> {
  console.log(`Server is running on port ${PORT}`);
    });




};
