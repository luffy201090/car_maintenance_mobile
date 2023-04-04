import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  carRequest: ['carId'],
  carAllRequest: ['options'],
  carUpdateRequest: ['car'],
  carDeleteRequest: ['carId'],

  carSuccess: ['car'],
  carAllSuccess: ['carList', 'headers'],
  carUpdateSuccess: ['car'],
  carDeleteSuccess: [],

  carFailure: ['error'],
  carAllFailure: ['error'],
  carUpdateFailure: ['error'],
  carDeleteFailure: ['error'],

  carReset: [],
});

export const CarTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  car: { id: undefined },
  carList: [],
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
    car: INITIAL_STATE.car,
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
  const { car } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    car,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { carList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    carList: loadMoreDataWhenScrolled(state.carList, carList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { car } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    car,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    car: INITIAL_STATE.car,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    car: INITIAL_STATE.car,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    carList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    car: state.car,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    car: state.car,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CAR_REQUEST]: request,
  [Types.CAR_ALL_REQUEST]: allRequest,
  [Types.CAR_UPDATE_REQUEST]: updateRequest,
  [Types.CAR_DELETE_REQUEST]: deleteRequest,

  [Types.CAR_SUCCESS]: success,
  [Types.CAR_ALL_SUCCESS]: allSuccess,
  [Types.CAR_UPDATE_SUCCESS]: updateSuccess,
  [Types.CAR_DELETE_SUCCESS]: deleteSuccess,

  [Types.CAR_FAILURE]: failure,
  [Types.CAR_ALL_FAILURE]: allFailure,
  [Types.CAR_UPDATE_FAILURE]: updateFailure,
  [Types.CAR_DELETE_FAILURE]: deleteFailure,
  [Types.CAR_RESET]: reset,
});
