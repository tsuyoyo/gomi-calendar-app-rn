import { AreaSelectionList } from '@/features/area/AreaSelectionList';
import { SafeAreaView, View } from 'react-native';

const AreaSelectionScreen: React.FC = () => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <AreaSelectionList />
      <SafeAreaView />
    </View>
  );
};

export default AreaSelectionScreen;
