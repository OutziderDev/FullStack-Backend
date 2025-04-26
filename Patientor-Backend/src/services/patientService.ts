import dataPatients from "../data/patientsData";
import { Patients } from "../types/PatientsType";

const getPatients = () : Patients[] => {
  return dataPatients;
};

const getNonSensitivePatients = () : Patients[] => {
 return dataPatients.map( ({id, name, dateOfBirth, gender, occupation}) => ({ id, name, dateOfBirth, gender, occupation}) );

};

export default { getPatients, getNonSensitivePatients };