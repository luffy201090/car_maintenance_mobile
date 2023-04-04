import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  maintainanceDetailsRequest: ['maintainanceDetailsId'],
  maintainanceDetailsAllRequest: ['options'],
  maintainanceDetailsUpdateRequest: ['maintainanceDetails'],
  maintainanceDetailsDeleteRequest: ['maintainanceDetailsId'],

  maintainanceDetailsSuccess: ['maintainanceDetails'],
  maintainanceDetailsAllSuccess: ['maintainanceDetailsList', 'headers'],
  maintainanceDetailsUpdateSuccess: ['maintainanceDetails'],
  maintainanceDetailsDeleteSuccess: [],

  maintainanceDetailsFailure: ['error'],
  maintainanceDetailsAllFailure: ['error'],
  maintainanceDetailsUpdateFailure: ['error'],
  maintainanceDetailsDeleteFailure: ['error'],

  maintainanceDetailsReset: [],
});

export const MaintainanceDetailsTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  maintainanceDetails: { id: undefined },
  maintainanceDetailsList: [],
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
    maintainanceDetails: INITIAL_STATE.maintainanceDetails,
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
  const { maintainanceDetails } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    maintainanceDetails,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { maintainanceDetailsList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    maintainanceDetailsList: loadMoreDataWhenScrolled(state.maintainanceDetailsList, maintainanceDetailsList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { maintainanceDetails } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    maintainanceDetails,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    maintainanceDetails: INITIAL_STATE.maintainanceDetails,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    maintainanceDetails: INITIAL_STATE.maintainanceDetails,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    maintainanceDetailsList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    maintainanceDetails: state.maintainanceDetails,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    maintainanceDetails: state.maintainanceDetails,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MAINTAINANCE_DETAILS_REQUEST]: request,
  [Types.MAINTAINANCE_DETAILS_ALL_REQUEST]: allRequest,
  [Types.MAINTAINANCE_DETAILS_UPDATE_REQUEST]: updateRequest,
  [Types.MAINTAINANCE_DETAILS_DELETE_REQUEST]: deleteRequest,

  [Types.MAINTAINANCE_DETAILS_SUCCESS]: success,
  [Types.MAINTAINANCE_DETAILS_ALL_SUCCESS]: allSuccess,
  [Types.MAINTAINANCE_DETAILS_UPDATE_SUCCESS]: updateSuccess,
  [Types.MAINTAINANCE_DETAILS_DELETE_SUCCESS]: deleteSuccess,

  [Types.MAINTAINANCE_DETAILS_FAILURE]: failure,
  [Types.MAINTAINANCE_DETAILS_ALL_FAILURE]: allFailure,
  [Types.MAINTAINANCE_DETAILS_UPDATE_FAILURE]: updateFailure,
  [Types.MAINTAINANCE_DETAILS_DELETE_FAILURE]: deleteFailure,
  [Types.MAINTAINANCE_DETAILS_RESET]: reset,
});
