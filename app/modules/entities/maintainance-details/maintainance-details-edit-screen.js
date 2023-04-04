import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import MaintainanceDetailsActions from './maintainance-details.reducer';
import MaintainanceActions from '../maintainance/maintainance.reducer';
import UserActions from '../../../shared/reducers/user.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './maintainance-details-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  action: Yup.string().required(),
  maintainance: Yup.mixed().required(),
  user: Yup.mixed().required(),
});

const Action = [
  {
    label: 'I',
    value: 'I',
  },
  {
    label: 'R',
    value: 'R',
  },
  {
    label: 'A',
    value: 'A',
  },
  {
    label: 'M',
    value: 'M',
  },
  {
    label: 'V',
    value: 'V',
  },
];

function MaintainanceDetailsEditScreen(props) {
  const {
    getMaintainanceDetails,
    updateMaintainanceDetails,
    route,
    maintainanceDetails,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllMaintainances,
    maintainanceList,
    getAllUsers,
    userList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getMaintainanceDetails(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getMaintainanceDetails, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(maintainanceDetails));
    }
  }, [maintainanceDetails, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllMaintainances();
    getAllUsers();
  }, [getAllMaintainances, getAllUsers]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack()
          ? navigation.replace('MaintainanceDetailsDetail', { entityId: maintainanceDetails?.id })
          : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateMaintainanceDetails(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const nameRef = createRef();
  const actionRef = createRef();
  const priceRef = createRef();
  const maintainanceRef = createRef();
  const userRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="maintainanceDetailsEditScrollView"
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
            />
            <FormField
              name="action"
              ref={actionRef}
              label="Action"
              placeholder="Enter Action"
              testID="actionInput"
              inputType="select-one"
              listItems={Action}
              onSubmitEditing={() => priceRef.current?.focus()}
            />
            <FormField name="price" ref={priceRef} label="Price" placeholder="Enter Price" testID="priceInput" inputType="number" />
            <FormField
              name="maintainance"
              inputType="select-one"
              ref={maintainanceRef}
              listItems={maintainanceList}
              listItemLabelField="level"
              label="Maintainance"
              placeholder="Select Maintainance"
              testID="maintainanceSelectInput"
            />
            <FormField
              name="user"
              inputType="select-one"
              ref={userRef}
              listItems={userList}
              listItemLabelField="login"
              label="User"
              placeholder="Select User"
              testID="userSelectInput"
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
    action: value.action ?? null,
    price: value.price ?? null,
    maintainance: value.maintainance && value.maintainance.id ? value.maintainance.id : null,
    user: value.user && value.user.id ? value.user.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    name: value.name ?? null,
    action: value.action ?? null,
    price: value.price ?? null,
  };
  entity.maintainance = value.maintainance ? { id: value.maintainance } : null;
  entity.user = value.user ? { id: value.user } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    maintainanceList: state.maintainances.maintainanceList ?? [],
    userList: state.users.userList ?? [],
    maintainanceDetails: state.maintainanceDetails.maintainanceDetails,
    fetching: state.maintainanceDetails.fetchingOne,
    updating: state.maintainanceDetails.updating,
    updateSuccess: state.maintainanceDetails.updateSuccess,
    errorUpdating: state.maintainanceDetails.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllMaintainances: (options) => dispatch(MaintainanceActions.maintainanceAllRequest(options)),
    getAllUsers: (options) => dispatch(UserActions.userAllRequest(options)),
    getMaintainanceDetails: (id) => dispatch(MaintainanceDetailsActions.maintainanceDetailsRequest(id)),
    getAllMaintainanceDetails: (options) => dispatch(MaintainanceDetailsActions.maintainanceDetailsAllRequest(options)),
    updateMaintainanceDetails: (maintainanceDetails) =>
      dispatch(MaintainanceDetailsActions.maintainanceDetailsUpdateRequest(maintainanceDetails)),
    reset: () => dispatch(MaintainanceDetailsActions.maintainanceDetailsReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MaintainanceDetailsEditScreen);
