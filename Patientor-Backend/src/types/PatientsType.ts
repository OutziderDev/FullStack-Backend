export type Patients = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: string;
  occupation: string
} 

export type NonSensitivePatients = Omit<Patients, 'ssn'>;

export type NewPatientType = Omit<Patients, 'id'>;