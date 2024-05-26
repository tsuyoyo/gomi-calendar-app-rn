import { LinkComponent } from '../common/LinkComponent';
import { HomeAreaDateComponent } from './HomeAreaDateComponent';
import { HomeComponentType } from './HomeComponentType';
import { HomeNextComponent } from './HomeNextComponent';
import { HomeTodayComponent } from './HomeTodayComponent';

export type HomeResponse = {
  layout: { type: HomeComponentType; index: number }[];

  areaDateComponent: HomeAreaDateComponent[];
  todayComponents: HomeTodayComponent[];
  nextComponents: HomeNextComponent[];
  links: LinkComponent[];
};
