import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  DEMO_FETCH_BAR_CHART_DATA_BEGIN,
  DEMO_FETCH_BAR_CHART_DATA_SUCCESS,
  DEMO_FETCH_BAR_CHART_DATA_FAILURE,
  DEMO_FETCH_BAR_CHART_DATA_DISMISS_ERROR,
} from '../../../../src/features/demo/redux/constants';

import {
  fetchBarChartData,
  dismissFetchBarChartDataError,
  reducer,
} from '../../../../src/features/demo/redux/fetchBarChartData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('demo/redux/fetchBarChartData', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchBarChartData succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchBarChartData())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', DEMO_FETCH_BAR_CHART_DATA_BEGIN);
        expect(actions[1]).toHaveProperty('type', DEMO_FETCH_BAR_CHART_DATA_SUCCESS);
      });
  });

  it('dispatches failure action when fetchBarChartData fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchBarChartData({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', DEMO_FETCH_BAR_CHART_DATA_BEGIN);
        expect(actions[1]).toHaveProperty('type', DEMO_FETCH_BAR_CHART_DATA_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchBarChartDataError', () => {
    const expectedAction = {
      type: DEMO_FETCH_BAR_CHART_DATA_DISMISS_ERROR,
    };
    expect(dismissFetchBarChartDataError()).toEqual(expectedAction);
  });

  it('handles action type DEMO_FETCH_BAR_CHART_DATA_BEGIN correctly', () => {
    const prevState = { fetchBarChartDataPending: false };
    const state = reducer(
      prevState,
      { type: DEMO_FETCH_BAR_CHART_DATA_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchBarChartDataPending).toBe(true);
  });

  it('handles action type DEMO_FETCH_BAR_CHART_DATA_SUCCESS correctly', () => {
    const prevState = { fetchBarChartDataPending: true };
    const state = reducer(
      prevState,
      { type: DEMO_FETCH_BAR_CHART_DATA_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchBarChartDataPending).toBe(false);
  });

  it('handles action type DEMO_FETCH_BAR_CHART_DATA_FAILURE correctly', () => {
    const prevState = { fetchBarChartDataPending: true };
    const state = reducer(
      prevState,
      { type: DEMO_FETCH_BAR_CHART_DATA_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchBarChartDataPending).toBe(false);
    expect(state.fetchBarChartDataError).toEqual(expect.anything());
  });

  it('handles action type DEMO_FETCH_BAR_CHART_DATA_DISMISS_ERROR correctly', () => {
    const prevState = { fetchBarChartDataError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: DEMO_FETCH_BAR_CHART_DATA_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchBarChartDataError).toBe(null);
  });
});

