import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/corporation/corporation.reducer';

test('attempt retrieving a single corporation', () => {
  const state = reducer(INITIAL_STATE, Actions.corporationRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.corporation).toEqual({ id: undefined });
});

test('attempt retrieving a list of corporation', () => {
  const state = reducer(INITIAL_STATE, Actions.corporationAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.corporationList).toEqual([]);
});

test('attempt updating a corporation', () => {
  const state = reducer(INITIAL_STATE, Actions.corporationUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a corporation', () => {
  const state = reducer(INITIAL_STATE, Actions.corporationDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a corporation', () => {
  const state = reducer(INITIAL_STATE, Actions.corporationSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.corporation).toEqual({ id: 1 });
});

test('success retrieving a list of corporation', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.corporationAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.corporationList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a corporation', () => {
  const state = reducer(INITIAL_STATE, Actions.corporationUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.corporation).toEqual({ id: 1 });
});
test('success deleting a corporation', () => {
  const state = reducer(INITIAL_STATE, Actions.corporationDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.corporation).toEqual({ id: undefined });
});

test('failure retrieving a corporation', () => {
  const state = reducer(INITIAL_STATE, Actions.corporationFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.corporation).toEqual({ id: undefined });
});

test('failure retrieving a list of corporation', () => {
  const state = reducer(INITIAL_STATE, Actions.corporationAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.corporationList).toEqual([]);
});

test('failure updating a corporation', () => {
  const state = reducer(INITIAL_STATE, Actions.corporationUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.corporation).toEqual(INITIAL_STATE.corporation);
});
test('failure deleting a corporation', () => {
  const state = reducer(INITIAL_STATE, Actions.corporationDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.corporation).toEqual(INITIAL_STATE.corporation);
});

test('resetting state for corporation', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.corporationReset());
  expect(state).toEqual(INITIAL_STATE);
});
