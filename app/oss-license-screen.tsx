import { FlashList } from '@shopify/flash-list';
import { openBrowserAsync } from 'expo-web-browser';
import { StyleSheet, View } from 'react-native';
import { Button, Divider, Text } from 'react-native-paper';
import licenseFile from '../licenses.json';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    flexDirection: 'column',
  },
});

type LicenseData = {
  licenses: string;
  repository: string;
  publisher: string;
  email: string;
  path: string;
  licenseFile: string;
};

const OssLicenseScreen: React.FC = () => {
  const licenseKeys = Object.keys(licenseFile);
  return (
    <FlashList
      keyExtractor={(item) => item}
      renderItem={({ item }) => {
        // @ts-ignore
        const license = licenseFile[item] as LicenseData;
        return (
          <View style={styles.container}>
            <Text variant="titleMedium">{item}</Text>
            <Text variant="titleSmall">{license.licenses}</Text>
            <Text variant="titleSmall">{license.publisher}</Text>
            <Button
              mode="text"
              onPress={() => openBrowserAsync(license.repository)}
            >
              {license.repository}
            </Button>
          </View>
        );
      }}
      estimatedItemSize={100}
      data={licenseKeys}
      ItemSeparatorComponent={() => <Divider />}
    />
  );
};

export default OssLicenseScreen;
