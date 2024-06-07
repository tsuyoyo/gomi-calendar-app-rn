import { Reminder } from '../../Reminder';
import { LinkComponent } from '../common/LinkComponent';
import { HomeAreaDateComponent } from './HomeAreaDateComponent';
import { HomeComponentType } from './HomeComponentType';
import { HomeNextComponent } from './HomeNextComponent';
import { HomeTodayComponent } from './HomeTodayComponent';
import { HomeWeeklyScheduleComponent } from './HomeWeeklyScheduleComponent';

export type HomeResponse = {
  layout: { type: HomeComponentType; index: number }[];

  areaDateComponent: HomeAreaDateComponent[];
  todayComponents: HomeTodayComponent[];
  nextComponents: HomeNextComponent[];
  weeklyScheduleComponents: HomeWeeklyScheduleComponent[];
  links: LinkComponent[];

  reminders: Reminder[];
};
