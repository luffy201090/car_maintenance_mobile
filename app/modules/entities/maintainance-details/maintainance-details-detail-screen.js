import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import MaintainanceDetailsActions from './maintainance-details.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import MaintainanceDetailsDeleteModal from './maintainance-details-delete-modal';
import styles from './maintainance-details-styles';

function MaintainanceDetailsDetailScreen(props) {
  const { route, getMaintainanceDetails, navigation, maintainanceDetails, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = maintainanceDetails?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('MaintainanceDetails');
      } else {
        setDeleteModalVisible(false);
        getMaintainanceDetails(routeEntityId);
      }
    }, [routeEntityId, getMaintainanceDetails, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the MaintainanceDetails.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="maintainanceDetailsDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{maintainanceDetails.id}</Text>
      {/* Name Field */}
      <Text style={styles.label}>Name:</Text>
      <Text testID="name">{maintainanceDetails.name}</Text>
      {/* Action Field */}
      <Text style={styles.label}>Action:</Text>
      <Text testID="action">{maintainanceDetails.action}</Text>
      {/* Price Field */}
      <Text style={styles.label}>Price:</Text>
      <Text testID="price">{maintainanceDetails.price}</Text>
      <Text style={styles.label}>Maintainance:</Text>
      <Text testID="maintainance">{String(maintainanceDetails.maintainance ? maintainanceDetails.maintainance.level : '')}</Text>
      <Text style={styles.label}>User:</Text>
      <Text testID="user">{String(maintainanceDetails.user ? maintainanceDetails.user.login : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('MaintainanceDetailsEdit', { entityId })}
          accessibilityLabel={'MaintainanceDetails Edit Button'}
          testID="maintainanceDetailsEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'MaintainanceDetails Delete Button'}
          testID="maintainanceDetailsDeleteButton"
        />
        {deleteModalVisible && (
          <MaintainanceDetailsDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={maintainanceDetails}
            testID="maintainanceDetailsDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    maintainanceDetails: state.maintainanceDetails.maintainanceDetails,
    error: state.maintainanceDetails.errorOne,
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

export default connect(mapStateToProps, mapDispatchToProps)(MaintainanceDetailsDetailScreen);
