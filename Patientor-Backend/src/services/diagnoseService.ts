import { Diagnoses } from "../types/diagnosesType";
import diagnoseData from "../../data/diagnosesData";

const getDiagnoses = (): Diagnoses[] => {
  return diagnoseData;
};

export default { getDiagnoses};