import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import CarActions from './car.reducer';

function* getCar(api, action) {
  const { carId } = action;
  // make the call to the api
  const apiCall = call(api.getCar, carId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CarActions.carSuccess(response.data));
  } else {
    yield put(CarActions.carFailure(response.data));
  }
}

function* getAllCars(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllCars, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CarActions.carAllSuccess(response.data, response.headers));
  } else {
    yield put(CarActions.carAllFailure(response.data));
  }
}

function* updateCar(api, action) {
  const { car } = action;
  // make the call to the api
  const idIsNotNull = !(car.id === null || car.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateCar : api.createCar, car);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CarActions.carUpdateSuccess(response.data));
  } else {
    yield put(CarActions.carUpdateFailure(response.data));
  }
}

function* deleteCar(api, action) {
  const { carId } = action;
  // make the call to the api
  const apiCall = call(api.deleteCar, carId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CarActions.carDeleteSuccess());
  } else {
    yield put(CarActions.carDeleteFailure(response.data));
  }
}

export default {
  getAllCars,
  getCar,
  deleteCar,
  updateCar,
};
