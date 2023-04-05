import React, {createRef} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {connect} from 'react-redux';
import * as Yup from 'yup';

import CarActions from './car.reducer';
import BrandActions from '../brand/brand.reducer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import {useDidUpdateEffect} from '../../../shared/util/use-did-update-effect';
import styles from './car-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  plate: Yup.string().required(),
  brand: Yup.mixed().required(),
});

function CarEditScreen(props) {
  const {
    getCar,
    updateCar,
    route,
    car,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllBrands,
    brandList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getCar(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getCar, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(car));
    }
  }, [car, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllBrands();
  }, [getAllBrands]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('CarDetail', { entityId: car?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateCar(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const nameRef = createRef();
  const modelRef = createRef();
  const plateRef = createRef();
  const brandRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="carEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} validationSchema={validationSchema} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="name"
              ref={nameRef}
              label="Name"
              placeholder="Enter Name"
              testID="nameInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => modelRef.current?.focus()}
            />
            <FormField
              name="model"
              ref={modelRef}
              label="Model"
              placeholder="Enter Model"
              testID="modelInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => plateRef.current?.focus()}
            />
            <FormField
              name="plate"
              ref={plateRef}
              label="Plate"
              placeholder="Enter Plate"
              testID="plateInput"
              inputType="text"
              autoCapitalize="none"
            />
            <FormField
              name="brand"
              inputType="select-one"
              ref={brandRef}
              listItems={brandList}
              listItemLabelField="name"
              label="Brand"
              placeholder="Select Brand"
              testID="brandSelectInput"
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
    name: value.name ?? null,
    model: value.model ?? null,
    plate: value.plate ?? null,
    brand: value.brand && value.brand.id ? value.brand.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    name: value.name ?? null,
    model: value.model ?? null,
    plate: value.plate ?? null,
  };
  entity.brand = value.brand ? { id: value.brand } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    brandList: state.brands.brandList ?? [],
    car: state.cars.car,
    fetching: state.cars.fetchingOne,
    updating: state.cars.updating,
    updateSuccess: state.cars.updateSuccess,
    errorUpdating: state.cars.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBrands: (options) => dispatch(BrandActions.brandAllRequest(options)),
    getCar: (id) => dispatch(CarActions.carRequest(id)),
    getAllCars: (options) => dispatch(CarActions.carAllRequest(options)),
    updateCar: (car) => dispatch(CarActions.carUpdateRequest(car)),
    reset: () => dispatch(CarActions.carReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarEditScreen);
