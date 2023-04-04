import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import CorporationSagas from '../../../../../app/modules/entities/corporation/corporation.sagas';
import CorporationActions from '../../../../../app/modules/entities/corporation/corporation.reducer';

const { getCorporation, getAllCorporations, updateCorporation, deleteCorporation } = CorporationSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getCorporation(1);
  const step = stepper(getCorporation(FixtureAPI, { corporationId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CorporationActions.corporationSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getCorporation(FixtureAPI, { corporationId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CorporationActions.corporationFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllCorporations();
  const step = stepper(getAllCorporations(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CorporationActions.corporationAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllCorporations(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CorporationActions.corporationAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateCorporation({ id: 1 });
  const step = stepper(updateCorporation(FixtureAPI, { corporation: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CorporationActions.corporationUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateCorporation(FixtureAPI, { corporation: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CorporationActions.corporationUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteCorporation({ id: 1 });
  const step = stepper(deleteCorporation(FixtureAPI, { corporationId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CorporationActions.corporationDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteCorporation(FixtureAPI, { corporationId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CorporationActions.corporationDeleteFailure()));
});
