import React from 'react';

import { Button, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './counterSlice';
import { RootState } from '@/redux/store';

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
