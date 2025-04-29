import { Patients,NonSensitivePatients } from "../types/PatientsType";
import dataPatients from "../data/patientsData";

const getPatients = () : Patients[] => {
  return dataPatients;
};

const getNonSensitivePatients = () : NonSensitivePatients[] => {
 return dataPatients.map( ({id, name, dateOfBirth, gender, occupation}) => ({ id, name, dateOfBirth, gender, occupation}) );

};

const addPatient = ( name: string, dateOfBirth: string, gender: string, ssn: string, occupation:string): Patients => {
  const newPatient = {
    id: crypto.randomUUID(),
    name,
    dateOfBirth,
    gender,
    ssn,
    occupation
  };

  dataPatients.push(newPatient);
  return newPatient;
};

export default { getPatients, getNonSensitivePatients, addPatient };