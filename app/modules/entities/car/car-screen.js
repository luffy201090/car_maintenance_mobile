import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import CarActions from './car.reducer';
import styles from './car-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function CarScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { car, carList, getAllCars, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Car entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchCars();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [car, fetchCars]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('CarDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>Name: {item.name}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Cars Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchCars = React.useCallback(() => {
    getAllCars({ page: page - 1, sort, size });
  }, [getAllCars, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchCars();
  };
  return (
    <View style={styles.container} testID="carScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={carList}
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
    carList: state.cars.carList,
    car: state.cars.car,
    fetching: state.cars.fetchingAll,
    error: state.cars.errorAll,
    links: state.cars.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCars: (options) => dispatch(CarActions.carAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarScreen);
