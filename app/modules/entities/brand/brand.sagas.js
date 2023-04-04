import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import BrandActions from './brand.reducer';

function* getBrand(api, action) {
  const { brandId } = action;
  // make the call to the api
  const apiCall = call(api.getBrand, brandId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(BrandActions.brandSuccess(response.data));
  } else {
    yield put(BrandActions.brandFailure(response.data));
  }
}

function* getAllBrands(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllBrands, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(BrandActions.brandAllSuccess(response.data, response.headers));
  } else {
    yield put(BrandActions.brandAllFailure(response.data));
  }
}

function* updateBrand(api, action) {
  const { brand } = action;
  // make the call to the api
  const idIsNotNull = !(brand.id === null || brand.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateBrand : api.createBrand, brand);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(BrandActions.brandUpdateSuccess(response.data));
  } else {
    yield put(BrandActions.brandUpdateFailure(response.data));
  }
}

function* deleteBrand(api, action) {
  const { brandId } = action;
  // make the call to the api
  const apiCall = call(api.deleteBrand, brandId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(BrandActions.brandDeleteSuccess());
  } else {
    yield put(BrandActions.brandDeleteFailure(response.data));
  }
}

export default {
  getAllBrands,
  getBrand,
  deleteBrand,
  updateBrand,
};
