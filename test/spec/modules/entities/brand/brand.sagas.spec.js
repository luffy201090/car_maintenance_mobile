import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import BrandSagas from '../../../../../app/modules/entities/brand/brand.sagas';
import BrandActions from '../../../../../app/modules/entities/brand/brand.reducer';

const { getBrand, getAllBrands, updateBrand, deleteBrand } = BrandSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getBrand(1);
  const step = stepper(getBrand(FixtureAPI, { brandId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(BrandActions.brandSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getBrand(FixtureAPI, { brandId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(BrandActions.brandFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllBrands();
  const step = stepper(getAllBrands(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(BrandActions.brandAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllBrands(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(BrandActions.brandAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateBrand({ id: 1 });
  const step = stepper(updateBrand(FixtureAPI, { brand: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(BrandActions.brandUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateBrand(FixtureAPI, { brand: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(BrandActions.brandUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteBrand({ id: 1 });
  const step = stepper(deleteBrand(FixtureAPI, { brandId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(BrandActions.brandDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteBrand(FixtureAPI, { brandId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(BrandActions.brandDeleteFailure()));
});
