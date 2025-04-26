import dataPatients from "../data/patientsData";
import { Patients,NonSensitivePatients } from "../types/PatientsType";

const getPatients = () : Patients[] => {
  return dataPatients;
};

const getNonSensitivePatients = () : NonSensitivePatients[] => {
 return dataPatients.map( ({id, name, dateOfBirth, gender, occupation}) => ({ id, name, dateOfBirth, gender, occupation}) );

};

export default { getPatients, getNonSensitivePatients };