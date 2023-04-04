import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import MaintainanceDetailsActions from './maintainance-details.reducer';

function* getMaintainanceDetails(api, action) {
  const { maintainanceDetailsId } = action;
  // make the call to the api
  const apiCall = call(api.getMaintainanceDetails, maintainanceDetailsId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(MaintainanceDetailsActions.maintainanceDetailsSuccess(response.data));
  } else {
    yield put(MaintainanceDetailsActions.maintainanceDetailsFailure(response.data));
  }
}

function* getAllMaintainanceDetails(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllMaintainanceDetails, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(MaintainanceDetailsActions.maintainanceDetailsAllSuccess(response.data, response.headers));
  } else {
    yield put(MaintainanceDetailsActions.maintainanceDetailsAllFailure(response.data));
  }
}

function* updateMaintainanceDetails(api, action) {
  const { maintainanceDetails } = action;
  // make the call to the api
  const idIsNotNull = !(maintainanceDetails.id === null || maintainanceDetails.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateMaintainanceDetails : api.createMaintainanceDetails, maintainanceDetails);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(MaintainanceDetailsActions.maintainanceDetailsUpdateSuccess(response.data));
  } else {
    yield put(MaintainanceDetailsActions.maintainanceDetailsUpdateFailure(response.data));
  }
}

function* deleteMaintainanceDetails(api, action) {
  const { maintainanceDetailsId } = action;
  // make the call to the api
  const apiCall = call(api.deleteMaintainanceDetails, maintainanceDetailsId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(MaintainanceDetailsActions.maintainanceDetailsDeleteSuccess());
  } else {
    yield put(MaintainanceDetailsActions.maintainanceDetailsDeleteFailure(response.data));
  }
}

export default {
  getAllMaintainanceDetails,
  getMaintainanceDetails,
  deleteMaintainanceDetails,
  updateMaintainanceDetails,
};
