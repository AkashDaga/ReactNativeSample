import { UPDATE_FILTER } from './types';

export const updateFilter = filter => {
  console.log('updateFilter', filter);
  return {
    type: UPDATE_FILTER,
    payload: filter
  };
};
