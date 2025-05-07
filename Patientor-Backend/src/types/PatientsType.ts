import { Entry } from "./EntryTypes";

export enum Gender {
  "Male" = "male",
  "Female" = "female",
  "Other" = "other"
}

export interface Patients  {
  id: string;
  name: string;
  ssn?: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
} 

export type NonSensitivePatients = Omit<Patients, 'ssn' | 'entries'>;

export type NewPatientType = Omit<Patients, 'id'>;