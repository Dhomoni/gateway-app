import { IChamber } from 'app/shared/model/search/chamber.model';

export const enum WeekDay {
  SUNDAY = 'SUNDAY',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY'
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
