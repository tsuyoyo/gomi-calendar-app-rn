import { HomeComponentType } from '@/data/screen/home/HomeComponentType';
import { HomeResponse } from '@/data/screen/home/HomeResponse';
import { FlashList } from '@shopify/flash-list';
import { View, ViewProps } from 'react-native';
import { HomeAreaDateComponent } from './HomeAreaDateComponent';
import { HomeLinkComponent } from './HomeLinkComponent';
import { HomeNextScheduleComponent } from './HomeNextScheduleComponent';
import { HomeTodayScheduleComponent } from './HomeTodayScheduleComponent';

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
    case HomeComponentType.AREA_DATE:
      return (
        <HomeAreaDateComponent
          data={response.areaDateComponent[index]}
        />
      );
    case HomeComponentType.SCHEDULE_TODAY:
      return (
        <HomeTodayScheduleComponent
          todayComponent={response.todayComponents[index]}
        />
      );
    case HomeComponentType.SCHEDULE_NEXT:
      return (
        <HomeNextScheduleComponent
          nextComponent={response.nextComponents[index]}
        />
      );
    case HomeComponentType.LINK:
      return <HomeLinkComponent link={response.links[index]} />;
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
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      ListHeaderComponent={() => <View style={{ height: 12 }} />}
      ListFooterComponent={() => <View style={{ height: 32 }} />}
    />
  );
};
