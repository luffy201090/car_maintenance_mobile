import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import CarActions from './car.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import CarDeleteModal from './car-delete-modal';
import styles from './car-styles';

function CarDetailScreen(props) {
  const { route, getCar, navigation, car, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = car?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Car');
      } else {
        setDeleteModalVisible(false);
        getCar(routeEntityId);
      }
    }, [routeEntityId, getCar, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Car.</Text>
      </View>
    );
  }
  if (!entityId || fetching || !correctEntityLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="carDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{car.id}</Text>
      {/* Name Field */}
      <Text style={styles.label}>Name:</Text>
      <Text testID="name">{car.name}</Text>
      {/* Model Field */}
      <Text style={styles.label}>Model:</Text>
      <Text testID="model">{car.model}</Text>
      {/* Plate Field */}
      <Text style={styles.label}>Plate:</Text>
      <Text testID="plate">{car.plate}</Text>
      <Text style={styles.label}>User:</Text>
      <Text testID="user">{String(car.user ? car.user.login : '')}</Text>
      <Text style={styles.label}>Brand:</Text>
      <Text testID="brand">{String(car.brand ? car.brand.name : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('CarEdit', { entityId })}
          accessibilityLabel={'Car Edit Button'}
          testID="carEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Car Delete Button'}
          testID="carDeleteButton"
        />
        {deleteModalVisible && (
          <CarDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={car}
            testID="carDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    car: state.cars.car,
    error: state.cars.errorOne,
    fetching: state.cars.fetchingOne,
    deleting: state.cars.deleting,
    errorDeleting: state.cars.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCar: (id) => dispatch(CarActions.carRequest(id)),
    getAllCars: (options) => dispatch(CarActions.carAllRequest(options)),
    deleteCar: (id) => dispatch(CarActions.carDeleteRequest(id)),
    resetCars: () => dispatch(CarActions.carReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarDetailScreen);
