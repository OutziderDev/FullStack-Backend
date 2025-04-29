import express from 'express';
import patientService from '../services/patientService';
import { toNewPatients } from '../utils/toNewPatients';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req,res) => {
  try {
    const dataNewPatient = toNewPatients(req.body);

    const newPatient = patientService.addPatient(dataNewPatient);

    res.json( newPatient );
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
       errorMessage += `Error: ${error.message}`;
    }
    res.status(400).send(errorMessage);
  }
  
});

export default router;