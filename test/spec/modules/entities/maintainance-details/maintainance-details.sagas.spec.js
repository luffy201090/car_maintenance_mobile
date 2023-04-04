import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import MaintainanceDetailsSagas from '../../../../../app/modules/entities/maintainance-details/maintainance-details.sagas';
import MaintainanceDetailsActions from '../../../../../app/modules/entities/maintainance-details/maintainance-details.reducer';

const { getMaintainanceDetails, getAllMaintainanceDetails, updateMaintainanceDetails, deleteMaintainanceDetails } =
  MaintainanceDetailsSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getMaintainanceDetails(1);
  const step = stepper(getMaintainanceDetails(FixtureAPI, { maintainanceDetailsId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(MaintainanceDetailsActions.maintainanceDetailsSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getMaintainanceDetails(FixtureAPI, { maintainanceDetailsId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(MaintainanceDetailsActions.maintainanceDetailsFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllMaintainanceDetails();
  const step = stepper(getAllMaintainanceDetails(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(MaintainanceDetailsActions.maintainanceDetailsAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllMaintainanceDetails(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(MaintainanceDetailsActions.maintainanceDetailsAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateMaintainanceDetails({ id: 1 });
  const step = stepper(updateMaintainanceDetails(FixtureAPI, { maintainanceDetails: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(MaintainanceDetailsActions.maintainanceDetailsUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateMaintainanceDetails(FixtureAPI, { maintainanceDetails: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(MaintainanceDetailsActions.maintainanceDetailsUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteMaintainanceDetails({ id: 1 });
  const step = stepper(deleteMaintainanceDetails(FixtureAPI, { maintainanceDetailsId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(MaintainanceDetailsActions.maintainanceDetailsDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteMaintainanceDetails(FixtureAPI, { maintainanceDetailsId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(MaintainanceDetailsActions.maintainanceDetailsDeleteFailure()));
});
