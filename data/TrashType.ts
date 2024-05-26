export enum TrashType {
  BURNABLE = 'burnable',
  INCOMBUSTIBLE = 'incombustible',
  RECYCLABLE = 'recyclable',
  HARMFUL = 'harmful',
}

export const fromTrashTypeString = (
  name: string,
): TrashType | null =>
  Object.values(TrashType)
    .map((s) => s.toString())
    .includes(name)
    ? (name as TrashType)
    : null;

export type TrashTypeDisplayInfo = {
  id: string;
  displayName: string;
};

export const buildResponseTrashTypeData = (
  type: TrashType,
): TrashTypeDisplayInfo => {
  const getDisplayName = (type: TrashType) => {
    switch (type) {
      case TrashType.BURNABLE:
        return '燃えるごみ';
      case TrashType.HARMFUL:
        return '危険物';
      case TrashType.INCOMBUSTIBLE:
        return '燃えないごみ';
      case TrashType.RECYCLABLE:
        return '再利用可能ごみ';
    }
  };
  return {
    id: type,
    displayName: getDisplayName(type),
  };
};
