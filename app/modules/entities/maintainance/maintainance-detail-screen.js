import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { convertLocalDateToString } from '../../../shared/util/date-transforms';

import MaintainanceActions from './maintainance.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import MaintainanceDeleteModal from './maintainance-delete-modal';
import styles from './maintainance-styles';

function MaintainanceDetailScreen(props) {
  const { route, getMaintainance, navigation, maintainance, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = maintainance?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Maintainance');
      } else {
        setDeleteModalVisible(false);
        getMaintainance(routeEntityId);
      }
    }, [routeEntityId, getMaintainance, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Maintainance.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="maintainanceDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{maintainance.id}</Text>
      {/* Level Field */}
      <Text style={styles.label}>Level:</Text>
      <Text testID="level">{maintainance.level}</Text>
      {/* Price Field */}
      <Text style={styles.label}>Price:</Text>
      <Text testID="price">{maintainance.price}</Text>
      {/* Place Field */}
      <Text style={styles.label}>Place:</Text>
      <Text testID="place">{maintainance.place}</Text>
      {/* Date Field */}
      <Text style={styles.label}>Date:</Text>
      <Text testID="date">{convertLocalDateToString(maintainance.date)}</Text>
      <Text style={styles.label}>Car:</Text>
      <Text testID="car">{String(maintainance.car ? maintainance.car.name : '')}</Text>
      <Text style={styles.label}>User:</Text>
      <Text testID="user">{String(maintainance.user ? maintainance.user.login : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('MaintainanceEdit', { entityId })}
          accessibilityLabel={'Maintainance Edit Button'}
          testID="maintainanceEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Maintainance Delete Button'}
          testID="maintainanceDeleteButton"
        />
        {deleteModalVisible && (
          <MaintainanceDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={maintainance}
            testID="maintainanceDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    maintainance: state.maintainances.maintainance,
    error: state.maintainances.errorOne,
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

export default connect(mapStateToProps, mapDispatchToProps)(MaintainanceDetailScreen);
