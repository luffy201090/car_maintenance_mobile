import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import CorporationActions from './corporation.reducer';

import styles from './corporation-styles';

function CorporationDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteCorporation(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Corporation');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Corporation {entity.id}?</Text>
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
    corporation: state.corporations.corporation,
    fetching: state.corporations.fetchingOne,
    deleting: state.corporations.deleting,
    errorDeleting: state.corporations.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCorporation: (id) => dispatch(CorporationActions.corporationRequest(id)),
    getAllCorporations: (options) => dispatch(CorporationActions.corporationAllRequest(options)),
    deleteCorporation: (id) => dispatch(CorporationActions.corporationDeleteRequest(id)),
    resetCorporations: () => dispatch(CorporationActions.corporationReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CorporationDeleteModal);
