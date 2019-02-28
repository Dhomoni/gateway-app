import { IDoctor } from 'app/shared/model/search/doctor.model';
import { IWeeklyVisitingHour } from 'app/shared/model/search/weekly-visiting-hour.model';

export interface IChamber {
  id?: number;
  address?: string;
  phone?: string;
  fee?: number;
  distanceInKM?: number;
  isSuspended?: boolean;
  notice?: string;
  appointmentLimit?: number;
  adviceDurationInMinute?: number;
  doctor?: IDoctor;
  weeklyVisitingHours?: IWeeklyVisitingHour[];
}

export const defaultValue: Readonly<IChamber> = {
  isSuspended: false
};
