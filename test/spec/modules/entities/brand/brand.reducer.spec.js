import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/brand/brand.reducer';

test('attempt retrieving a single brand', () => {
  const state = reducer(INITIAL_STATE, Actions.brandRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.brand).toEqual({ id: undefined });
});

test('attempt retrieving a list of brand', () => {
  const state = reducer(INITIAL_STATE, Actions.brandAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.brandList).toEqual([]);
});

test('attempt updating a brand', () => {
  const state = reducer(INITIAL_STATE, Actions.brandUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a brand', () => {
  const state = reducer(INITIAL_STATE, Actions.brandDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a brand', () => {
  const state = reducer(INITIAL_STATE, Actions.brandSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.brand).toEqual({ id: 1 });
});

test('success retrieving a list of brand', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.brandAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.brandList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a brand', () => {
  const state = reducer(INITIAL_STATE, Actions.brandUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.brand).toEqual({ id: 1 });
});
test('success deleting a brand', () => {
  const state = reducer(INITIAL_STATE, Actions.brandDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.brand).toEqual({ id: undefined });
});

test('failure retrieving a brand', () => {
  const state = reducer(INITIAL_STATE, Actions.brandFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.brand).toEqual({ id: undefined });
});

test('failure retrieving a list of brand', () => {
  const state = reducer(INITIAL_STATE, Actions.brandAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.brandList).toEqual([]);
});

test('failure updating a brand', () => {
  const state = reducer(INITIAL_STATE, Actions.brandUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.brand).toEqual(INITIAL_STATE.brand);
});
test('failure deleting a brand', () => {
  const state = reducer(INITIAL_STATE, Actions.brandDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.brand).toEqual(INITIAL_STATE.brand);
});

test('resetting state for brand', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.brandReset());
  expect(state).toEqual(INITIAL_STATE);
});
