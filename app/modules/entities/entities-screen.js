import React from 'react';
import { ScrollView, Text } from 'react-native';
// Styles
import RoundedButton from '../../shared/components/rounded-button/rounded-button';

import styles from './entities-screen.styles';

export default function EntitiesScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="entityScreenScrollList">
      <Text style={styles.centerText}>JHipster Entities will appear below</Text>
      <RoundedButton text="Corporation" onPress={() => navigation.navigate('Corporation')} testID="corporationEntityScreenButton" />
      <RoundedButton text="Brand" onPress={() => navigation.navigate('Brand')} testID="brandEntityScreenButton" />
      <RoundedButton text="Car" onPress={() => navigation.navigate('Car')} testID="carEntityScreenButton" />
      <RoundedButton text="Maintainance" onPress={() => navigation.navigate('Maintainance')} testID="maintainanceEntityScreenButton" />
      <RoundedButton
        text="MaintainanceDetails"
        onPress={() => navigation.navigate('MaintainanceDetails')}
        testID="maintainanceDetailsEntityScreenButton"
      />
      {/* jhipster-react-native-entity-screen-needle */}
    </ScrollView>
  );
}
