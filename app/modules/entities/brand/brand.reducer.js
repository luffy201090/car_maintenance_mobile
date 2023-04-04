import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  brandRequest: ['brandId'],
  brandAllRequest: ['options'],
  brandUpdateRequest: ['brand'],
  brandDeleteRequest: ['brandId'],

  brandSuccess: ['brand'],
  brandAllSuccess: ['brandList', 'headers'],
  brandUpdateSuccess: ['brand'],
  brandDeleteSuccess: [],

  brandFailure: ['error'],
  brandAllFailure: ['error'],
  brandUpdateFailure: ['error'],
  brandDeleteFailure: ['error'],

  brandReset: [],
});

export const BrandTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  brand: { id: undefined },
  brandList: [],
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
    brand: INITIAL_STATE.brand,
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
  const { brand } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    brand,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { brandList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    brandList: loadMoreDataWhenScrolled(state.brandList, brandList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { brand } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    brand,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    brand: INITIAL_STATE.brand,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    brand: INITIAL_STATE.brand,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    brandList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    brand: state.brand,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    brand: state.brand,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.BRAND_REQUEST]: request,
  [Types.BRAND_ALL_REQUEST]: allRequest,
  [Types.BRAND_UPDATE_REQUEST]: updateRequest,
  [Types.BRAND_DELETE_REQUEST]: deleteRequest,

  [Types.BRAND_SUCCESS]: success,
  [Types.BRAND_ALL_SUCCESS]: allSuccess,
  [Types.BRAND_UPDATE_SUCCESS]: updateSuccess,
  [Types.BRAND_DELETE_SUCCESS]: deleteSuccess,

  [Types.BRAND_FAILURE]: failure,
  [Types.BRAND_ALL_FAILURE]: allFailure,
  [Types.BRAND_UPDATE_FAILURE]: updateFailure,
  [Types.BRAND_DELETE_FAILURE]: deleteFailure,
  [Types.BRAND_RESET]: reset,
});
