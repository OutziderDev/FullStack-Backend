import diagnosesRouter from './routes/diagnosesRoutes';
import patientsRouter from './routes/patientsRoute';
import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen( PORT, () => {
  console.log('Server run on port', PORT);
});
