import {  NewPatientType } from "../types/PatientsType";

export const toNewPatients = (object:any): NewPatientType => {
  const newPatient: NewPatientType = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    occupation: parseOccupation(object.occupation),
    ...object
  };
  
  return newPatient;
};

/* Funciones de Validaciones de datos */
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;  
};

const isDate = (date: string): boolean =>{
  return Boolean(Date.parse(date));
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }  
  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }  
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }  
  return ssn;
};

/* const parseGender = (gender: Gender):Gender => {
  if(!gender || !isString(gender)){
    throw new Error('Incorrect or missing gender: '+ gender);
  }
  return gender;
}; */

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }  
  return occupation;
};