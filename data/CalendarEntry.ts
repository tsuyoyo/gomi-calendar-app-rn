import { Week } from './Week';

export type TrashSchedule = {
  // 0 origin. Empty -> every week.
  weeks: number[] | undefined;

  // It should have one ore more values.
  days: Week[];
};

export type Area = {
  id: string;
  name: string;
};

export type CalendarEntry = {
  area: Area;
  burnable: TrashSchedule;
  incombustible: TrashSchedule;
  recyclable: TrashSchedule;
  harmful: TrashSchedule;
  calendar: string;
};
