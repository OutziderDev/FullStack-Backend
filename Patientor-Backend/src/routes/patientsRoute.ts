import express from 'express';
import patientService from '../services/patientService';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req,res) => {
  const { name, dateOfBirth, gender, ssn, occupation } = req.body;

  const newPatient = patientService.addPatient(name, dateOfBirth, gender, ssn, occupation);

  res.json(newPatient );
});

export default router;