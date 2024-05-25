import { LinkComponent } from '../common/LinkComponent';
import { HomeComponentType } from './HomeComponentType';
import { HomeNextComponent } from './HomeNextComponent';
import { HomeTodayComponent } from './HomeTodayComponent';

export type HomeResponse = {
  layout: { type: HomeComponentType; index: number }[];

  todayComponents: HomeTodayComponent[];
  nextComponents: HomeNextComponent[];
  links: LinkComponent[];
};
