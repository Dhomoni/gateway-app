import { IDoctor } from 'app/shared/model/search/doctor.model';

export interface IProfessionalDegree {
  id?: number;
  name?: string;
  institute?: string;
  country?: string;
  enrollmentYear?: number;
  passingYear?: number;
  doctor?: IDoctor;
}

export const defaultValue: Readonly<IProfessionalDegree> = {};
