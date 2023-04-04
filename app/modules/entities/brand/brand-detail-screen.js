import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import BrandActions from './brand.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import BrandDeleteModal from './brand-delete-modal';
import styles from './brand-styles';

function BrandDetailScreen(props) {
  const { route, getBrand, navigation, brand, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = brand?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Brand');
      } else {
        setDeleteModalVisible(false);
        getBrand(routeEntityId);
      }
    }, [routeEntityId, getBrand, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Brand.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="brandDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{brand.id}</Text>
      {/* Name Field */}
      <Text style={styles.label}>Name:</Text>
      <Text testID="name">{brand.name}</Text>
      <Text style={styles.label}>Corporation:</Text>
      <Text testID="corporation">{String(brand.corporation ? brand.corporation.name : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('BrandEdit', { entityId })}
          accessibilityLabel={'Brand Edit Button'}
          testID="brandEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Brand Delete Button'}
          testID="brandDeleteButton"
        />
        {deleteModalVisible && (
          <BrandDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={brand}
            testID="brandDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    brand: state.brands.brand,
    error: state.brands.errorOne,
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

export default connect(mapStateToProps, mapDispatchToProps)(BrandDetailScreen);
