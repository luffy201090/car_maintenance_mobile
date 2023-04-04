import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  corporationRequest: ['corporationId'],
  corporationAllRequest: ['options'],
  corporationUpdateRequest: ['corporation'],
  corporationDeleteRequest: ['corporationId'],

  corporationSuccess: ['corporation'],
  corporationAllSuccess: ['corporationList', 'headers'],
  corporationUpdateSuccess: ['corporation'],
  corporationDeleteSuccess: [],

  corporationFailure: ['error'],
  corporationAllFailure: ['error'],
  corporationUpdateFailure: ['error'],
  corporationDeleteFailure: ['error'],

  corporationReset: [],
});

export const CorporationTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  corporation: { id: undefined },
  corporationList: [],
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
    corporation: INITIAL_STATE.corporation,
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
  const { corporation } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    corporation,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { corporationList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    corporationList: loadMoreDataWhenScrolled(state.corporationList, corporationList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { corporation } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    corporation,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    corporation: INITIAL_STATE.corporation,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    corporation: INITIAL_STATE.corporation,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    corporationList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    corporation: state.corporation,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    corporation: state.corporation,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CORPORATION_REQUEST]: request,
  [Types.CORPORATION_ALL_REQUEST]: allRequest,
  [Types.CORPORATION_UPDATE_REQUEST]: updateRequest,
  [Types.CORPORATION_DELETE_REQUEST]: deleteRequest,

  [Types.CORPORATION_SUCCESS]: success,
  [Types.CORPORATION_ALL_SUCCESS]: allSuccess,
  [Types.CORPORATION_UPDATE_SUCCESS]: updateSuccess,
  [Types.CORPORATION_DELETE_SUCCESS]: deleteSuccess,

  [Types.CORPORATION_FAILURE]: failure,
  [Types.CORPORATION_ALL_FAILURE]: allFailure,
  [Types.CORPORATION_UPDATE_FAILURE]: updateFailure,
  [Types.CORPORATION_DELETE_FAILURE]: deleteFailure,
  [Types.CORPORATION_RESET]: reset,
});
