import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/maintainance-details/maintainance-details.reducer';

test('attempt retrieving a single maintainanceDetails', () => {
  const state = reducer(INITIAL_STATE, Actions.maintainanceDetailsRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.maintainanceDetails).toEqual({ id: undefined });
});

test('attempt retrieving a list of maintainanceDetails', () => {
  const state = reducer(INITIAL_STATE, Actions.maintainanceDetailsAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.maintainanceDetailsList).toEqual([]);
});

test('attempt updating a maintainanceDetails', () => {
  const state = reducer(INITIAL_STATE, Actions.maintainanceDetailsUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a maintainanceDetails', () => {
  const state = reducer(INITIAL_STATE, Actions.maintainanceDetailsDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a maintainanceDetails', () => {
  const state = reducer(INITIAL_STATE, Actions.maintainanceDetailsSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.maintainanceDetails).toEqual({ id: 1 });
});

test('success retrieving a list of maintainanceDetails', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.maintainanceDetailsAllSuccess([{ id: 1 }, { id: 2 }], {
      link: '</?page=1>; rel="last",</?page=0>; rel="first"',
      'x-total-count': 5,
    }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.maintainanceDetailsList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a maintainanceDetails', () => {
  const state = reducer(INITIAL_STATE, Actions.maintainanceDetailsUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.maintainanceDetails).toEqual({ id: 1 });
});
test('success deleting a maintainanceDetails', () => {
  const state = reducer(INITIAL_STATE, Actions.maintainanceDetailsDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.maintainanceDetails).toEqual({ id: undefined });
});

test('failure retrieving a maintainanceDetails', () => {
  const state = reducer(INITIAL_STATE, Actions.maintainanceDetailsFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.maintainanceDetails).toEqual({ id: undefined });
});

test('failure retrieving a list of maintainanceDetails', () => {
  const state = reducer(INITIAL_STATE, Actions.maintainanceDetailsAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.maintainanceDetailsList).toEqual([]);
});

test('failure updating a maintainanceDetails', () => {
  const state = reducer(INITIAL_STATE, Actions.maintainanceDetailsUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.maintainanceDetails).toEqual(INITIAL_STATE.maintainanceDetails);
});
test('failure deleting a maintainanceDetails', () => {
  const state = reducer(INITIAL_STATE, Actions.maintainanceDetailsDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.maintainanceDetails).toEqual(INITIAL_STATE.maintainanceDetails);
});

test('resetting state for maintainanceDetails', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.maintainanceDetailsReset());
  expect(state).toEqual(INITIAL_STATE);
});
