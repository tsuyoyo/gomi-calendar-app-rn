import { TrashType } from '../../TrashType';

export type HomeTodayComponent = {
  title: string;
  trashTypes: {
    type: TrashType;
    name: string;
    link?: {
      text: string;
      url: string;
    };
  }[];
};
