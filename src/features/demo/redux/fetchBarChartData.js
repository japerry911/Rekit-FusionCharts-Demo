import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DEMO_FETCH_BAR_CHART_DATA_BEGIN,
  DEMO_FETCH_BAR_CHART_DATA_SUCCESS,
  DEMO_FETCH_BAR_CHART_DATA_FAILURE,
  DEMO_FETCH_BAR_CHART_DATA_DISMISS_ERROR,
} from './constants';

export function fetchBarChartData(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DEMO_FETCH_BAR_CHART_DATA_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.get('https://restcountries.eu/rest/v2/regionalbloc/eu');
      doRequest.then(
        (res) => {
          dispatch({
            type: DEMO_FETCH_BAR_CHART_DATA_SUCCESS,
            data: res.data.map(countryObject => { 
              return { label: countryObject.name, value: countryObject.population };
            }),
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DEMO_FETCH_BAR_CHART_DATA_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchBarChartDataError() {
  return {
    type: DEMO_FETCH_BAR_CHART_DATA_DISMISS_ERROR,
  };
}

export function useFetchBarChartData() {
  const dispatch = useDispatch();

  const { fetchBarChartDataPending, fetchBarChartDataError } = useSelector(
    state => ({
      fetchBarChartDataPending: state.demo.fetchBarChartDataPending,
      fetchBarChartDataError: state.demo.fetchBarChartDataError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchBarChartData(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchBarChartDataError());
  }, [dispatch]);

  return {
    fetchBarChartData: boundAction,
    fetchBarChartDataPending,
    fetchBarChartDataError,
    dismissFetchBarChartDataError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DEMO_FETCH_BAR_CHART_DATA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchBarChartDataPending: true,
        fetchBarChartDataError: null,
      };

    case DEMO_FETCH_BAR_CHART_DATA_SUCCESS:
      // The request is success
      return {
        ...state,
        fetchBarChartDataPending: false,
        fetchBarChartDataError: null,
        barChartData: action.data
      };

    case DEMO_FETCH_BAR_CHART_DATA_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchBarChartDataPending: false,
        fetchBarChartDataError: action.data.error,
      };

    case DEMO_FETCH_BAR_CHART_DATA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchBarChartDataError: null,
      };

    default:
      return state;
  }
}
