import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import CarSagas from '../../../../../app/modules/entities/car/car.sagas';
import CarActions from '../../../../../app/modules/entities/car/car.reducer';

const { getCar, getAllCars, updateCar, deleteCar } = CarSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getCar(1);
  const step = stepper(getCar(FixtureAPI, { carId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CarActions.carSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getCar(FixtureAPI, { carId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CarActions.carFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllCars();
  const step = stepper(getAllCars(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CarActions.carAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllCars(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CarActions.carAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateCar({ id: 1 });
  const step = stepper(updateCar(FixtureAPI, { car: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CarActions.carUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateCar(FixtureAPI, { car: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CarActions.carUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteCar({ id: 1 });
  const step = stepper(deleteCar(FixtureAPI, { carId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CarActions.carDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteCar(FixtureAPI, { carId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CarActions.carDeleteFailure()));
});
