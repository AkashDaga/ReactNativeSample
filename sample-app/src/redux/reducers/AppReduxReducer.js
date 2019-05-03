import { UPDATE_SAVED_PHOTO } from '../actions/types';

const INITIAL_STATE = {
  initialCount: 0
};

export default (state = INITIAL_STATE, action) => {
  console.log('AppReduxReducer', state, action);
  switch (action.type) {
    case UPDATE_SAVED_PHOTO: {
      return {
        ...state,
        initialCount: state.initialCount+1
      };
    }
    default: {
      return state;
    }
  }
};
