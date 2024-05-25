import { TrashType } from '../../TrashType';

export type HomeNextComponent = {
  title: string;
  trashTypes: {
    type: TrashType;
    name: string;
    nextDate: string;
    link?: {
      text: string;
      url: string;
    };
  }[];
};
