import { TrashType } from './TrashType';

export type Reminder = {
  type: TrashType;
  title: string;
  message: string;
  year: number;
  month: number;
  date: number;
};
