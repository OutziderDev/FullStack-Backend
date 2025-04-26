import { Diagnoses } from "../types/DiagnosesType";
import diagnoseData from "../data/diagnosesData";

const getDiagnoses = (): Diagnoses[] => {
  return diagnoseData;
};

export default { getDiagnoses};