import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  DEMO_COUNTER_PLUS_ONE,
} from './constants';

export function counterPlusOne() {
  return {
    type: DEMO_COUNTER_PLUS_ONE,
  };
}

export function useCounterPlusOne() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(counterPlusOne(...params)), [dispatch]);
  return { counterPlusOne: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case DEMO_COUNTER_PLUS_ONE:
      return {
        ...state,
        count: state.count + 1
      };

    default:
      return state;
  }
}
