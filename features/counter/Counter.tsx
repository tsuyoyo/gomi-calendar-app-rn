import React from 'react';

import { RootState } from '@/redux/store';
import { Button, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from './counterSlice';

export function Counter() {
  const count = useSelector(
    (state: RootState) => state.counter.value,
  );
  const dispatch = useDispatch();

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
