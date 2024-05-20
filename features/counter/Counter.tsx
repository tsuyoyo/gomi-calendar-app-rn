import React, { useEffect } from 'react';

import { Button, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './counterSlice';
import { useGetAreasQuery } from '@/redux/apiSlice/areaApi';
import { RootState } from '@/redux/store';

export function Counter() {
  const count = useSelector(
    (state: RootState) => state.counter.value,
  );
  const dispatch = useDispatch();

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

  return (
    <>
      <Text>{count}</Text>
      <Button
        title="increment"
        onPress={() => dispatch(increment())}
      />
      <Button
        title="decrement"
        onPress={() => dispatch(decrement())}
      />
    </>
  );
}
