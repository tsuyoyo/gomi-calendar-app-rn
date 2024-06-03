import { InfoComponentType } from '@/data/screen/info/InfoComponentType';
import { InfoResponse } from '@/data/screen/info/InfoResponse';
import { FlashList } from '@shopify/flash-list';
import { ViewProps } from 'react-native';
import { Divider } from 'react-native-paper';
import { InfoAreaConfigComponent } from './InfoAreaConfigComponent';
import { InfoLinkComponent } from './InfoLinkComponent';
import { InfoOssListItemComponent } from './InfoOssListItemComponent';

export type InfoContentsListProps = ViewProps & {
  response: InfoResponse;
  isLoading: boolean;
};

const buildInfoComponent = (
  response: InfoResponse,
  type: InfoComponentType,
  index: number,
) => {
  switch (type) {
    case InfoComponentType.LINK:
      return <InfoLinkComponent data={response.links[index]} />;
    case InfoComponentType.AREA_CONFIG:
      return <InfoAreaConfigComponent />;
    case InfoComponentType.OSS_LICENSE:
      return <InfoOssListItemComponent />;
  }
};

export const InfoContentsList: React.FC<InfoContentsListProps> = ({
  response,
  isLoading,
  style,
}) => {
  return (
    <FlashList
      style={style}
      data={response.layout}
      keyExtractor={(item, index) => `${item.type}/${index}`}
      estimatedItemSize={100}
      renderItem={({ item }) =>
        buildInfoComponent(response, item.type, item.index)
      }
      refreshing={isLoading}
      ItemSeparatorComponent={() => <Divider />}
    />
  );
};
