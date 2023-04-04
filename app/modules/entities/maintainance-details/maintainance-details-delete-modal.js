import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import MaintainanceDetailsActions from './maintainance-details.reducer';

import styles from './maintainance-details-styles';

function MaintainanceDetailsDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteMaintainanceDetails(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('MaintainanceDetails');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete MaintainanceDetails {entity.id}?</Text>
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
    maintainanceDetails: state.maintainanceDetails.maintainanceDetails,
    fetching: state.maintainanceDetails.fetchingOne,
    deleting: state.maintainanceDetails.deleting,
    errorDeleting: state.maintainanceDetails.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMaintainanceDetails: (id) => dispatch(MaintainanceDetailsActions.maintainanceDetailsRequest(id)),
    getAllMaintainanceDetails: (options) => dispatch(MaintainanceDetailsActions.maintainanceDetailsAllRequest(options)),
    deleteMaintainanceDetails: (id) => dispatch(MaintainanceDetailsActions.maintainanceDetailsDeleteRequest(id)),
    resetMaintainanceDetails: () => dispatch(MaintainanceDetailsActions.maintainanceDetailsReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MaintainanceDetailsDeleteModal);
