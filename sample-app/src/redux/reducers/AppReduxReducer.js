import { UPDATE_FILTER } from '../actions/types';

const INITIAL_STATE = {
  filter: {}
};

export default (state = INITIAL_STATE, action) => {
  console.log('AppReduxReducer', state, action);
  switch (action.type) {
    case UPDATE_FILTER: {
      return {
        ...state,
        filter: JSON.parse(JSON.stringify(action.payload))
      };
    }
    default: {
      return state;
    }
  }
};
