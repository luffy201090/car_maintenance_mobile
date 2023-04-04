import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import CorporationActions from './corporation.reducer';

function* getCorporation(api, action) {
  const { corporationId } = action;
  // make the call to the api
  const apiCall = call(api.getCorporation, corporationId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CorporationActions.corporationSuccess(response.data));
  } else {
    yield put(CorporationActions.corporationFailure(response.data));
  }
}

function* getAllCorporations(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllCorporations, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CorporationActions.corporationAllSuccess(response.data, response.headers));
  } else {
    yield put(CorporationActions.corporationAllFailure(response.data));
  }
}

function* updateCorporation(api, action) {
  const { corporation } = action;
  // make the call to the api
  const idIsNotNull = !(corporation.id === null || corporation.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateCorporation : api.createCorporation, corporation);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CorporationActions.corporationUpdateSuccess(response.data));
  } else {
    yield put(CorporationActions.corporationUpdateFailure(response.data));
  }
}

function* deleteCorporation(api, action) {
  const { corporationId } = action;
  // make the call to the api
  const apiCall = call(api.deleteCorporation, corporationId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CorporationActions.corporationDeleteSuccess());
  } else {
    yield put(CorporationActions.corporationDeleteFailure(response.data));
  }
}

export default {
  getAllCorporations,
  getCorporation,
  deleteCorporation,
  updateCorporation,
};
