import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  maintainanceRequest: ['maintainanceId'],
  maintainanceAllRequest: ['options'],
  maintainanceUpdateRequest: ['maintainance'],
  maintainanceDeleteRequest: ['maintainanceId'],

  maintainanceSuccess: ['maintainance'],
  maintainanceAllSuccess: ['maintainanceList', 'headers'],
  maintainanceUpdateSuccess: ['maintainance'],
  maintainanceDeleteSuccess: [],

  maintainanceFailure: ['error'],
  maintainanceAllFailure: ['error'],
  maintainanceUpdateFailure: ['error'],
  maintainanceDeleteFailure: ['error'],

  maintainanceReset: [],
});

export const MaintainanceTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  maintainance: { id: undefined },
  maintainanceList: [],
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorDeleting: null,
  links: { next: 0 },
  totalItems: 0,
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    errorOne: false,
    maintainance: INITIAL_STATE.maintainance,
  });

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    errorAll: false,
  });

// request to update from an api
export const updateRequest = (state) =>
  state.merge({
    updateSuccess: false,
    updating: true,
  });
// request to delete from an api
export const deleteRequest = (state) =>
  state.merge({
    deleting: true,
  });

// successful api lookup for single entity
export const success = (state, action) => {
  const { maintainance } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    maintainance,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { maintainanceList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    maintainanceList: loadMoreDataWhenScrolled(state.maintainanceList, maintainanceList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { maintainance } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    maintainance,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    maintainance: INITIAL_STATE.maintainance,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    maintainance: INITIAL_STATE.maintainance,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    maintainanceList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    maintainance: state.maintainance,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    maintainance: state.maintainance,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MAINTAINANCE_REQUEST]: request,
  [Types.MAINTAINANCE_ALL_REQUEST]: allRequest,
  [Types.MAINTAINANCE_UPDATE_REQUEST]: updateRequest,
  [Types.MAINTAINANCE_DELETE_REQUEST]: deleteRequest,

  [Types.MAINTAINANCE_SUCCESS]: success,
  [Types.MAINTAINANCE_ALL_SUCCESS]: allSuccess,
  [Types.MAINTAINANCE_UPDATE_SUCCESS]: updateSuccess,
  [Types.MAINTAINANCE_DELETE_SUCCESS]: deleteSuccess,

  [Types.MAINTAINANCE_FAILURE]: failure,
  [Types.MAINTAINANCE_ALL_FAILURE]: allFailure,
  [Types.MAINTAINANCE_UPDATE_FAILURE]: updateFailure,
  [Types.MAINTAINANCE_DELETE_FAILURE]: deleteFailure,
  [Types.MAINTAINANCE_RESET]: reset,
});
