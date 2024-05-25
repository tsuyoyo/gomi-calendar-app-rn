import { LinkComponent } from '../common/LinkComponent';
import { InfoComponentType } from './InfoComponentType';

export type InfoResponse = {
  layout: { type: InfoComponentType; index: number }[];

  links: LinkComponent[];
};
