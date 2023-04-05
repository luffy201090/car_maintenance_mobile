import React, {createRef} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {connect} from 'react-redux';
import * as Yup from 'yup';

import MaintainanceActions from './maintainance.reducer';
import CarActions from '../car/car.reducer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import {useDidUpdateEffect} from '../../../shared/util/use-did-update-effect';
import styles from './maintainance-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  level: Yup.string().required(),
  date: Yup.date().required(),
  car: Yup.mixed().required(),
});

function MaintainanceEditScreen(props) {
  const {
    getMaintainance,
    updateMaintainance,
    route,
    maintainance,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllCars,
    carList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getMaintainance(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getMaintainance, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(maintainance));
    }
  }, [maintainance, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllCars();
  }, [getAllCars]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack()
          ? navigation.replace('MaintainanceDetail', { entityId: maintainance?.id })
          : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateMaintainance(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const levelRef = createRef();
  const priceRef = createRef();
  const placeRef = createRef();
  const dateRef = createRef();
  const carRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="maintainanceEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} validationSchema={validationSchema} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="level"
              ref={levelRef}
              label="Level"
              placeholder="Enter Level"
              testID="levelInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => priceRef.current?.focus()}
            />
            <FormField
              name="price"
              ref={priceRef}
              label="Price"
              placeholder="Enter Price"
              testID="priceInput"
              inputType="number"
              onSubmitEditing={() => placeRef.current?.focus()}
            />
            <FormField
              name="place"
              ref={placeRef}
              label="Place"
              placeholder="Enter Place"
              testID="placeInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => dateRef.current?.focus()}
            />
            <FormField name="date" ref={dateRef} label="Date" placeholder="Enter Date" testID="dateInput" inputType="date" />
            <FormField
              name="car"
              inputType="select-one"
              ref={carRef}
              listItems={carList}
              listItemLabelField="name"
              label="Car"
              placeholder="Select Car"
              testID="carSelectInput"
            />

            <FormButton title={'Save'} testID={'submitButton'} />
          </Form>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}

// convenience methods for customizing the mapping of the entity to/from the form value
const entityToFormValue = (value) => {
  if (!value) {
    return {};
  }
  return {
    id: value.id ?? null,
    level: value.level ?? null,
    price: value.price ?? null,
    place: value.place ?? null,
    date: value.date ?? null,
    car: value.car && value.car.id ? value.car.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    level: value.level ?? null,
    price: value.price ?? null,
    place: value.place ?? null,
    date: value.date ?? null,
  };
  entity.car = value.car ? { id: value.car } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    carList: state.cars.carList ?? [],
    maintainance: state.maintainances.maintainance,
    fetching: state.maintainances.fetchingOne,
    updating: state.maintainances.updating,
    updateSuccess: state.maintainances.updateSuccess,
    errorUpdating: state.maintainances.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCars: (options) => dispatch(CarActions.carAllRequest(options)),
    getMaintainance: (id) => dispatch(MaintainanceActions.maintainanceRequest(id)),
    getAllMaintainances: (options) => dispatch(MaintainanceActions.maintainanceAllRequest(options)),
    updateMaintainance: (maintainance) => dispatch(MaintainanceActions.maintainanceUpdateRequest(maintainance)),
    reset: () => dispatch(MaintainanceActions.maintainanceReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MaintainanceEditScreen);
