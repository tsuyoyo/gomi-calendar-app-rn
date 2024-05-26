import { TrashType } from '@/data/TrashType';

export type HomeNextComponentTrashInfo = {
  type: TrashType;
  name: string;
  nextDate: string;
  link?: {
    text: string;
    url: string;
  };
};

export type HomeNextComponent = {
  title: string;
  trashTypes: HomeNextComponentTrashInfo[];
};
