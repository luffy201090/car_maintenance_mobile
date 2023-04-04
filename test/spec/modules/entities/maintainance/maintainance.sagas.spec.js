import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import MaintainanceSagas from '../../../../../app/modules/entities/maintainance/maintainance.sagas';
import MaintainanceActions from '../../../../../app/modules/entities/maintainance/maintainance.reducer';

const { getMaintainance, getAllMaintainances, updateMaintainance, deleteMaintainance } = MaintainanceSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getMaintainance(1);
  const step = stepper(getMaintainance(FixtureAPI, { maintainanceId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(MaintainanceActions.maintainanceSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getMaintainance(FixtureAPI, { maintainanceId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(MaintainanceActions.maintainanceFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllMaintainances();
  const step = stepper(getAllMaintainances(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(MaintainanceActions.maintainanceAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllMaintainances(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(MaintainanceActions.maintainanceAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateMaintainance({ id: 1 });
  const step = stepper(updateMaintainance(FixtureAPI, { maintainance: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(MaintainanceActions.maintainanceUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateMaintainance(FixtureAPI, { maintainance: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(MaintainanceActions.maintainanceUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteMaintainance({ id: 1 });
  const step = stepper(deleteMaintainance(FixtureAPI, { maintainanceId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(MaintainanceActions.maintainanceDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteMaintainance(FixtureAPI, { maintainanceId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(MaintainanceActions.maintainanceDeleteFailure()));
});
