import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DEMO_FETCH_REDDIT_LIST_BEGIN,
  DEMO_FETCH_REDDIT_LIST_SUCCESS,
  DEMO_FETCH_REDDIT_LIST_FAILURE,
  DEMO_FETCH_REDDIT_LIST_DISMISS_ERROR,
} from './constants';

export function fetchRedditList(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DEMO_FETCH_REDDIT_LIST_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.get('http://www.reddit.com/r/reactjs.json');
      doRequest.then(
        (res) => {
          dispatch({
            type: DEMO_FETCH_REDDIT_LIST_SUCCESS,
            data: res.data.data.children.map(child => child.data),
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DEMO_FETCH_REDDIT_LIST_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchRedditListError() {
  return {
    type: DEMO_FETCH_REDDIT_LIST_DISMISS_ERROR,
  };
}

export function useFetchRedditList() {
  const dispatch = useDispatch();

  const { fetchRedditListPending, fetchRedditListError } = useSelector(
    state => ({
      fetchRedditListPending: state.demo.fetchRedditListPending,
      fetchRedditListError: state.demo.fetchRedditListError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchRedditList(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchRedditListError());
  }, [dispatch]);

  return {
    fetchRedditList: boundAction,
    fetchRedditListPending,
    fetchRedditListError,
    dismissFetchRedditListError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DEMO_FETCH_REDDIT_LIST_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchRedditListPending: true,
        fetchRedditListError: null,
      };

    case DEMO_FETCH_REDDIT_LIST_SUCCESS:
      // The request is success
      return {
        ...state,
        fetchRedditListPending: false,
        fetchRedditListError: null,
        redditList: action.data
      };

    case DEMO_FETCH_REDDIT_LIST_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchRedditListPending: false,
        fetchRedditListError: action.data.error,
      };

    case DEMO_FETCH_REDDIT_LIST_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchRedditListError: null,
      };

    default:
      return state;
  }
}
