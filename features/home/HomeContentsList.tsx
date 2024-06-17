import { HomeComponentType } from '@/data/screen/home/HomeComponentType';
import { HomeResponse } from '@/data/screen/home/HomeResponse';
import { FlashList } from '@shopify/flash-list';
import { View, ViewProps } from 'react-native';
import { HomeAreaDateComponent } from './HomeAreaDateComponent';
import { HomeLinkComponent } from './HomeLinkComponent';
import { HomeNextScheduleComponent } from './HomeNextScheduleComponent';
import { HomeReminderConfigComponent } from './HomeReminderConfigComponent';
import { HomeTodayScheduleComponent } from './HomeTodayScheduleComponent';
import { HomeWeeklyScheduleComponent } from './HomeWeeklyScheduleComponent';

export type HomeContentsListProps = ViewProps & {
  response: HomeResponse;
  isLoading: boolean;
  onRefresh: () => void;
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
    case HomeComponentType.WEEKLY_SCHEDULE:
      return (
        <HomeWeeklyScheduleComponent
          schedule={response.weeklyScheduleComponents[index]}
        />
      );
    case HomeComponentType.LINK:
      return <HomeLinkComponent link={response.links[index]} />;
    case HomeComponentType.REMINDER_CONFIG:
      return <HomeReminderConfigComponent />;
  }
};

export const HomeContentsList: React.FC<HomeContentsListProps> = ({
  response,
  isLoading,
  onRefresh,
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
      onRefresh={onRefresh}
      refreshing={isLoading}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      ListHeaderComponent={() => <View style={{ height: 12 }} />}
      ListFooterComponent={() => <View style={{ height: 32 }} />}
    />
  );
};
