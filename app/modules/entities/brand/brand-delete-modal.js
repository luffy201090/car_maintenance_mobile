import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import BrandActions from './brand.reducer';

import styles from './brand-styles';

function BrandDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteBrand(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Brand');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Brand {entity.id}?</Text>
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
    brand: state.brands.brand,
    fetching: state.brands.fetchingOne,
    deleting: state.brands.deleting,
    errorDeleting: state.brands.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBrand: (id) => dispatch(BrandActions.brandRequest(id)),
    getAllBrands: (options) => dispatch(BrandActions.brandAllRequest(options)),
    deleteBrand: (id) => dispatch(BrandActions.brandDeleteRequest(id)),
    resetBrands: () => dispatch(BrandActions.brandReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandDeleteModal);
