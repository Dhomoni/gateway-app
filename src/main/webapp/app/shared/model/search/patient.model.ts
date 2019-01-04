import { Moment } from 'moment';

export const enum Sex {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export const enum BloodGroup {
  A_POSITIVE = 'A_POSITIVE',
  A_NEGATIVE = 'A_NEGATIVE',
  B_POSITIVE = 'B_POSITIVE',
  B_NEGATIVE = 'B_NEGATIVE',
  O_POSITIVE = 'O_POSITIVE',
  O_NEGATIVE = 'O_NEGATIVE',
  AB_POSITIVE = 'AB_POSITIVE',
  AB_NEGATIVE = 'AB_NEGATIVE'
}

export interface IPatient {
  id?: number;
  registrationId?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  sex?: Sex;
  birthTimestamp?: Moment;
  bloodGroup?: BloodGroup;
  weightInKG?: number;
  heightInInch?: number;
  address?: string;
  imageContentType?: string;
  image?: any;
  activated?: boolean;
}

export const defaultValue: Readonly<IPatient> = {
  activated: false
};
