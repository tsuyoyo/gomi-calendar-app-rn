import { AreaSelectionList } from '@/features/area/AreaSelectionList';
import { View } from 'react-native';

const AreaSelectionScreen: React.FC = () => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <AreaSelectionList />
    </View>
  );
};

export default AreaSelectionScreen;
