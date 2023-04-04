import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import CarActions from './car.reducer';

import styles from './car-styles';

function CarDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteCar(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Car');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Car {entity.id}?</Text>
          </View>
          <View style={[styles.flexRow]}>
            <TouchableHighlight
              style={[styles.openButton, styles.cancelButton]}
              onPress={() => {
                setVisible(false);
              }}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.openButton, styles.submitButton]} onPress={deleteEntity} testID="deleteButton">
              <Text style={styles.textStyle}>Delete</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    car: state.cars.car,
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

export default connect(mapStateToProps, mapDispatchToProps)(CarDeleteModal);
