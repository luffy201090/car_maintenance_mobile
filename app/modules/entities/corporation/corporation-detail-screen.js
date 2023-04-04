import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import CorporationActions from './corporation.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import CorporationDeleteModal from './corporation-delete-modal';
import styles from './corporation-styles';

function CorporationDetailScreen(props) {
  const { route, getCorporation, navigation, corporation, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = corporation?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Corporation');
      } else {
        setDeleteModalVisible(false);
        getCorporation(routeEntityId);
      }
    }, [routeEntityId, getCorporation, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Corporation.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="corporationDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{corporation.id}</Text>
      {/* Name Field */}
      <Text style={styles.label}>Name:</Text>
      <Text testID="name">{corporation.name}</Text>
      {/* Description Field */}
      <Text style={styles.label}>Description:</Text>
      <Text testID="description">{corporation.description}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('CorporationEdit', { entityId })}
          accessibilityLabel={'Corporation Edit Button'}
          testID="corporationEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Corporation Delete Button'}
          testID="corporationDeleteButton"
        />
        {deleteModalVisible && (
          <CorporationDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={corporation}
            testID="corporationDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    corporation: state.corporations.corporation,
    error: state.corporations.errorOne,
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

export default connect(mapStateToProps, mapDispatchToProps)(CorporationDetailScreen);
