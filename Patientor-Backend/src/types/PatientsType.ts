export interface Entry {

}

export interface Patients  {
  id: string;
  name: string;
  ssn?: string;
  occupation: string;
  gender: string;
  dateOfBirth: string;
  entries: Entry[]
} 

export type NonSensitivePatients = Omit<Patients, 'ssn' | 'entries'>;

export type NewPatientType = Omit<Patients, 'id'>;