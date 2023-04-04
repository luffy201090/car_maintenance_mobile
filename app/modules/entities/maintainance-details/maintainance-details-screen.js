import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import MaintainanceDetailsActions from './maintainance-details.reducer';
import styles from './maintainance-details-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function MaintainanceDetailsScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { maintainanceDetails, maintainanceDetailsList, getAllMaintainanceDetails, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('MaintainanceDetails entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchMaintainanceDetails();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [maintainanceDetails, fetchMaintainanceDetails]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('MaintainanceDetailsDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No MaintainanceDetails Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchMaintainanceDetails = React.useCallback(() => {
    getAllMaintainanceDetails({ page: page - 1, sort, size });
  }, [getAllMaintainanceDetails, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchMaintainanceDetails();
  };
  return (
    <View style={styles.container} testID="maintainanceDetailsScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={maintainanceDetailsList}
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
    maintainanceDetailsList: state.maintainanceDetails.maintainanceDetailsList,
    maintainanceDetails: state.maintainanceDetails.maintainanceDetails,
    fetching: state.maintainanceDetails.fetchingAll,
    error: state.maintainanceDetails.errorAll,
    links: state.maintainanceDetails.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllMaintainanceDetails: (options) => dispatch(MaintainanceDetailsActions.maintainanceDetailsAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MaintainanceDetailsScreen);
