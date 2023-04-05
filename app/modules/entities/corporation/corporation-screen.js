import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import CorporationActions from './corporation.reducer';
import styles from './corporation-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function CorporationScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { corporation, corporationList, getAllCorporations, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Corporation entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchCorporations();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [corporation, fetchCorporations]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('CorporationDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
        <Text style={styles.whiteLabel}>Name: {item.name}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Corporations Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchCorporations = React.useCallback(() => {
    getAllCorporations({ page: page - 1, sort, size });
  }, [getAllCorporations, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchCorporations();
  };
  return (
    <View style={styles.container} testID="corporationScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={corporationList}
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
    corporationList: state.corporations.corporationList,
    corporation: state.corporations.corporation,
    fetching: state.corporations.fetchingAll,
    error: state.corporations.errorAll,
    links: state.corporations.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCorporations: (options) => dispatch(CorporationActions.corporationAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CorporationScreen);
