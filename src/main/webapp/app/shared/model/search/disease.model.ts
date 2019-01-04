import { IMedicalDepartment } from 'app/shared/model/search/medical-department.model';

export interface IDisease {
  id?: number;
  medicalName?: string;
  generalName?: string;
  symptoms?: string;
  dept?: IMedicalDepartment;
}

export const defaultValue: Readonly<IDisease> = {};
