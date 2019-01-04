import { IChamber } from 'app/shared/model/search/chamber.model';

export const enum WeekDay {
  SUN = 'SUN',
  MON = 'MON',
  TUES = 'TUES',
  WED = 'WED',
  THURS = 'THURS',
  FRI = 'FRI',
  SAT = 'SAT'
}

export interface IWeeklyVisitingHour {
  id?: number;
  weekDay?: WeekDay;
  startHour?: number;
  startMinute?: number;
  endHour?: number;
  endMinute?: number;
  chamber?: IChamber;
}

export const defaultValue: Readonly<IWeeklyVisitingHour> = {};
