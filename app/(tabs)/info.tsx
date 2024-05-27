import { InfoContentsList } from '@/features/info/InfoContentsList';
import { useLazyGetInfoScreenQuery } from '@/redux/apiSlice/infoScreenApi';
import { RootState } from '@/redux/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function InfoScreen() {
  const [trigger, result] = useLazyGetInfoScreenQuery();
  const areaConfig = useSelector<
    RootState,
    string | undefined | null
  >((s) => s.area.areaId);

  useEffect(() => {
    if (areaConfig !== undefined && areaConfig !== null) {
      trigger(areaConfig);
    }
  }, [areaConfig, trigger]);

  const { data, error, isError, isLoading, isFetching } = result;

  if (data === undefined) {
    return null;
  }
  return (
    <InfoContentsList
      response={data}
      isLoading={isLoading || isFetching}
    />
  );
}
