import { Patients,NonSensitivePatients, NewPatientType } from "../types/PatientsType";
import dataPatients from "../data/patientsData";

const getPatients = () : Patients[] => {
  return dataPatients;
};

const findById = (id: string) : Patients | undefined => {
  return dataPatients.find( patient => patient.id === id );
};

const getNonSensitivePatients = () : NonSensitivePatients[] => {
 return dataPatients.map( ({id, name, dateOfBirth, gender, occupation}) => ({ id, name, dateOfBirth, gender, occupation}) );
};

const addPatient = ( patient: NewPatientType): Patients => {
  const newPatient = {
    id: crypto.randomUUID(),
    ...patient,
  };

  dataPatients.push(newPatient);
  return newPatient;
};

export default { getPatients, getNonSensitivePatients, addPatient, findById };