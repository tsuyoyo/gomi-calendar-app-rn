import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';
import { useGetAreasQuery } from '@/redux/apiSlice/areaApi';

const AreaSelectionScreen: React.FC = () => {
  const { data, error, isLoading } = useGetAreasQuery();

  useEffect(() => {
    console.log(`isLoading - ${isLoading}`);
  }, [isLoading]);

  useEffect(() => {
    console.log(`data - ${JSON.stringify(data)}`);
  }, [data]);

  useEffect(() => {
    console.log(`error - ${JSON.stringify(error)}`);
  }, [error]);

  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  const isPresented = router.canGoBack();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
      {!isPresented && <Link href="../">Dismiss</Link>}
      {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
      <StatusBar style="light" />
    </View>
  );
};

export default AreaSelectionScreen;
