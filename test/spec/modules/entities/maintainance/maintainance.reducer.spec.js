import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/maintainance/maintainance.reducer';

test('attempt retrieving a single maintainance', () => {
  const state = reducer(INITIAL_STATE, Actions.maintainanceRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.maintainance).toEqual({ id: undefined });
});

test('attempt retrieving a list of maintainance', () => {
  const state = reducer(INITIAL_STATE, Actions.maintainanceAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.maintainanceList).toEqual([]);
});

test('attempt updating a maintainance', () => {
  const state = reducer(INITIAL_STATE, Actions.maintainanceUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a maintainance', () => {
  const state = reducer(INITIAL_STATE, Actions.maintainanceDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a maintainance', () => {
  const state = reducer(INITIAL_STATE, Actions.maintainanceSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.maintainance).toEqual({ id: 1 });
});

test('success retrieving a list of maintainance', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.maintainanceAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.maintainanceList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a maintainance', () => {
  const state = reducer(INITIAL_STATE, Actions.maintainanceUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.maintainance).toEqual({ id: 1 });
});
test('success deleting a maintainance', () => {
  const state = reducer(INITIAL_STATE, Actions.maintainanceDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.maintainance).toEqual({ id: undefined });
});

test('failure retrieving a maintainance', () => {
  const state = reducer(INITIAL_STATE, Actions.maintainanceFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.maintainance).toEqual({ id: undefined });
});

test('failure retrieving a list of maintainance', () => {
  const state = reducer(INITIAL_STATE, Actions.maintainanceAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.maintainanceList).toEqual([]);
});

test('failure updating a maintainance', () => {
  const state = reducer(INITIAL_STATE, Actions.maintainanceUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.maintainance).toEqual(INITIAL_STATE.maintainance);
});
test('failure deleting a maintainance', () => {
  const state = reducer(INITIAL_STATE, Actions.maintainanceDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.maintainance).toEqual(INITIAL_STATE.maintainance);
});

test('resetting state for maintainance', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.maintainanceReset());
  expect(state).toEqual(INITIAL_STATE);
});
