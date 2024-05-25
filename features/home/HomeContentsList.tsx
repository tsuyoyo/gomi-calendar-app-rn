import { ThemedText } from '@/components/ThemedText';
import { HomeComponentType } from '@/data/screen/home/HomeComponentType';
import { HomeResponse } from '@/data/screen/home/HomeResponse';
import { FlashList } from '@shopify/flash-list';
import { ViewProps } from 'react-native';

export type HomeContentsListProps = ViewProps & {
  response: HomeResponse;
  isLoading: boolean;
};

const buildHomeComponent = (
  response: HomeResponse,
  type: HomeComponentType,
  index: number,
) => {
  switch (type) {
    case HomeComponentType.SCHEDULE_TODAY:
      return <ThemedText>Today</ThemedText>;
    case HomeComponentType.SCHEDULE_NEXT:
      return <ThemedText>Next</ThemedText>;
    case HomeComponentType.LINK:
      return <ThemedText>Link</ThemedText>;
  }
};

export const HomeContentsList: React.FC<HomeContentsListProps> = ({
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
        buildHomeComponent(response, item.type, item.index)
      }
      refreshing={isLoading}
    />
  );
};
