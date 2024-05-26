import { TrashType } from '@/data/TrashType';

export type HomeTodayComponentTrashInfo = {
  type: TrashType;
  name: string;
  link?: {
    text: string;
    url: string;
  };
};

export type HomeTodayComponent = {
  title: string;
  trashTypes: HomeTodayComponentTrashInfo[];
};
