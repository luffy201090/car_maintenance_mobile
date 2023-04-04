import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/car/car.reducer';

test('attempt retrieving a single car', () => {
  const state = reducer(INITIAL_STATE, Actions.carRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.car).toEqual({ id: undefined });
});

test('attempt retrieving a list of car', () => {
  const state = reducer(INITIAL_STATE, Actions.carAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.carList).toEqual([]);
});

test('attempt updating a car', () => {
  const state = reducer(INITIAL_STATE, Actions.carUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a car', () => {
  const state = reducer(INITIAL_STATE, Actions.carDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a car', () => {
  const state = reducer(INITIAL_STATE, Actions.carSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.car).toEqual({ id: 1 });
});

test('success retrieving a list of car', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.carAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.carList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a car', () => {
  const state = reducer(INITIAL_STATE, Actions.carUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.car).toEqual({ id: 1 });
});
test('success deleting a car', () => {
  const state = reducer(INITIAL_STATE, Actions.carDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.car).toEqual({ id: undefined });
});

test('failure retrieving a car', () => {
  const state = reducer(INITIAL_STATE, Actions.carFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.car).toEqual({ id: undefined });
});

test('failure retrieving a list of car', () => {
  const state = reducer(INITIAL_STATE, Actions.carAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.carList).toEqual([]);
});

test('failure updating a car', () => {
  const state = reducer(INITIAL_STATE, Actions.carUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.car).toEqual(INITIAL_STATE.car);
});
test('failure deleting a car', () => {
  const state = reducer(INITIAL_STATE, Actions.carDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.car).toEqual(INITIAL_STATE.car);
});

test('resetting state for car', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.carReset());
  expect(state).toEqual(INITIAL_STATE);
});
