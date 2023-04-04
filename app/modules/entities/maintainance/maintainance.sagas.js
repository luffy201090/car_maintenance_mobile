import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import MaintainanceActions from './maintainance.reducer';
import { convertLocalDateFromServer } from '../../../shared/util/date-transforms';

function* getMaintainance(api, action) {
  const { maintainanceId } = action;
  // make the call to the api
  const apiCall = call(api.getMaintainance, maintainanceId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(MaintainanceActions.maintainanceSuccess(response.data));
  } else {
    yield put(MaintainanceActions.maintainanceFailure(response.data));
  }
}

function* getAllMaintainances(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllMaintainances, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(MaintainanceActions.maintainanceAllSuccess(response.data, response.headers));
  } else {
    yield put(MaintainanceActions.maintainanceAllFailure(response.data));
  }
}

function* updateMaintainance(api, action) {
  const { maintainance } = action;
  // make the call to the api
  const idIsNotNull = !(maintainance.id === null || maintainance.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateMaintainance : api.createMaintainance, maintainance);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(MaintainanceActions.maintainanceUpdateSuccess(response.data));
  } else {
    yield put(MaintainanceActions.maintainanceUpdateFailure(response.data));
  }
}

function* deleteMaintainance(api, action) {
  const { maintainanceId } = action;
  // make the call to the api
  const apiCall = call(api.deleteMaintainance, maintainanceId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(MaintainanceActions.maintainanceDeleteSuccess());
  } else {
    yield put(MaintainanceActions.maintainanceDeleteFailure(response.data));
  }
}
function mapDateFields(data) {
  data.date = convertLocalDateFromServer(data.date);
  return data;
}

export default {
  getAllMaintainances,
  getMaintainance,
  deleteMaintainance,
  updateMaintainance,
};
