import { IChamber } from 'app/shared/model/search/chamber.model';
import { IProfessionalDegree } from 'app/shared/model/search/professional-degree.model';
import { IMedicalDepartment } from 'app/shared/model/search/medical-department.model';

export const enum DoctorType {
  PHYSICIAN = 'PHYSICIAN',
  SURGEON = 'SURGEON'
}

export interface IDoctor {
  id?: number;
  registrationId?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  licenceNumber?: string;
  nationalId?: string;
  passportNo?: string;
  type?: DoctorType;
  designation?: string;
  institute?: string;
  speciality?: string;
  description?: any;
  address?: string;
  imageContentType?: string;
  image?: any;
  activated?: boolean;
  chambers?: IChamber[];
  professionalDegrees?: IProfessionalDegree[];
  medicalDepartment?: IMedicalDepartment;
}

export const defaultValue: Readonly<IDoctor> = {
  activated: false
};
