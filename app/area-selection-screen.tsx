import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import { AreaSelectionList } from '@/features/area/AreaSelectionList';
import { RootState } from '@/redux/store';

const AreaSelectionScreen: React.FC = () => {
  const areaConfig = useSelector<
    RootState,
    string | null | undefined
  >((s) => s.area.areaId);

  const [selectedArea, setSelectedArea] = useState<
    string | null | undefined
  >(areaConfig);

  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = router.canGoBack();

  console.log(`selectedArea - ${selectedArea}`);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
      {/* {!isPresented && <Link href="../">Dismiss</Link>} */}
      {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
      {/* <StatusBar style="light" /> */}
      <AreaSelectionList />
    </View>
  );
};

export default AreaSelectionScreen;
