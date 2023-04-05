import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import MaintainanceActions from './maintainance.reducer';
import styles from './maintainance-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function MaintainanceScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { maintainance, maintainanceList, getAllMaintainances, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Maintainance entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchMaintainances();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [maintainance, fetchMaintainances]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('MaintainanceDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>Mức bảo dưỡng: {item.level}</Text>
          <Text style={styles.whiteLabel}>Giá tiền: {item.price}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Maintainances Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchMaintainances = React.useCallback(() => {
    getAllMaintainances({ page: page - 1, sort, size });
  }, [getAllMaintainances, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchMaintainances();
  };
  return (
    <View style={styles.container} testID="maintainanceScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={maintainanceList}
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
    maintainanceList: state.maintainances.maintainanceList,
    maintainance: state.maintainances.maintainance,
    fetching: state.maintainances.fetchingAll,
    error: state.maintainances.errorAll,
    links: state.maintainances.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllMaintainances: (options) => dispatch(MaintainanceActions.maintainanceAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MaintainanceScreen);
