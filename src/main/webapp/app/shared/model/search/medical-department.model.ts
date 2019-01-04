import { IDisease } from 'app/shared/model/search/disease.model';

export interface IMedicalDepartment {
  id?: number;
  name?: string;
  diseases?: IDisease[];
}

export const defaultValue: Readonly<IMedicalDepartment> = {};
