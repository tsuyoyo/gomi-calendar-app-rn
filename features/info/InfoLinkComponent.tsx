import { LinkComponent } from '@/data/screen/common/LinkComponent';
import { openBrowserAsync } from 'expo-web-browser';
import { List } from 'react-native-paper';

export const InfoLinkComponent: React.FC<{ data: LinkComponent }> = ({
  data,
}) => {
  return (
    <List.Item
      title={data.title}
      description={data.description}
      onPress={() => openBrowserAsync(data.url)}
    />
  );
};
