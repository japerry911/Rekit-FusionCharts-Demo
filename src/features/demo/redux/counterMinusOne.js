import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  DEMO_COUNTER_MINUS_ONE,
} from './constants';

export function counterMinusOne() {
  return {
    type: DEMO_COUNTER_MINUS_ONE,
  };
}

export function useCounterMinusOne() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(counterMinusOne(...params)), [dispatch]);
  return { counterMinusOne: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case DEMO_COUNTER_MINUS_ONE:
      return {
        ...state,
        count: state.count - 1
      };

    default:
      return state;
  }
}
