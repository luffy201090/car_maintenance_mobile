import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import BrandActions from './brand.reducer';
import styles from './brand-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function BrandScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { brand, brandList, getAllBrands, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Brand entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchBrands();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [brand, fetchBrands]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('BrandDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
        <Text style={styles.whiteLabel}>Name: {item.name}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Brands Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchBrands = React.useCallback(() => {
    getAllBrands({ page: page - 1, sort, size });
  }, [getAllBrands, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchBrands();
  };
  return (
    <View style={styles.container} testID="brandScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={brandList}
        renderItem={renderRow}
        keyExtractor={keyExtractor}
        initialNumToRender={oneScreensWorth}
        onEndReached={handleLoadMore}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    brandList: state.brands.brandList,
    brand: state.brands.brand,
    fetching: state.brands.fetchingAll,
    error: state.brands.errorAll,
    links: state.brands.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBrands: (options) => dispatch(BrandActions.brandAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandScreen);
