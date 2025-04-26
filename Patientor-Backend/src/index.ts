import express from 'express';
import diagnosesRouter from './routes/diagnosesRoutes';
import cors from 'cors';
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.use('/api/diagnoses', diagnosesRouter);

app.listen( PORT, () => {
  console.log('Server run on port', PORT);
});
