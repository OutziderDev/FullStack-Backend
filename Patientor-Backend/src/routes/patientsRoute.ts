import express from 'express';
import patientService from '../services/patientService';
import { toNewPatients } from '../utils/toNewPatients';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  }else{
    res.status(404).json({Error: 'No data'});
  }
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