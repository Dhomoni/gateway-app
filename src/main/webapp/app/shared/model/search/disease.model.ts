import { ISymptom } from 'app/shared/model/search/symptom.model';
import { IMedicalDepartment } from 'app/shared/model/search/medical-department.model';

export interface IDisease {
  id?: number;
  medicalName?: string;
  generalName?: string;
  symptoms?: ISymptom[];
  medicalDepartment?: IMedicalDepartment;
}

export const defaultValue: Readonly<IDisease> = {};
