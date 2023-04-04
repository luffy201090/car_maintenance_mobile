import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import MaintainanceActions from './maintainance.reducer';

import styles from './maintainance-styles';

function MaintainanceDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteMaintainance(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Maintainance');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Maintainance {entity.id}?</Text>
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
    maintainance: state.maintainances.maintainance,
    fetching: state.maintainances.fetchingOne,
    deleting: state.maintainances.deleting,
    errorDeleting: state.maintainances.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMaintainance: (id) => dispatch(MaintainanceActions.maintainanceRequest(id)),
    getAllMaintainances: (options) => dispatch(MaintainanceActions.maintainanceAllRequest(options)),
    deleteMaintainance: (id) => dispatch(MaintainanceActions.maintainanceDeleteRequest(id)),
    resetMaintainances: () => dispatch(MaintainanceActions.maintainanceReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MaintainanceDeleteModal);
