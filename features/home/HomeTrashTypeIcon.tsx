import { TrashType } from '@/data/TrashType';
import { appColors } from '@/styles/appColors';
import { View, ViewProps } from 'react-native';
import { Icon } from 'react-native-paper';

const getIconByTrashType = (type: TrashType) => {
  switch (type) {
    case TrashType.BURNABLE:
      return 'fire';
    case TrashType.INCOMBUSTIBLE:
      return 'fire-off';
    case TrashType.HARMFUL:
      return 'alert-octagram';
    case TrashType.RECYCLABLE:
      return 'recycle';
  }
};

export const HomeTrashTypeIcon: React.FC<
  ViewProps & { type: TrashType }
> = ({ type, style }) => (
  <View style={style}>
    <Icon
      source={getIconByTrashType(type)}
      color={appColors.primary}
      size={24}
    />
  </View>
);
