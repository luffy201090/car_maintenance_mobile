import * as React from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { DrawerButton } from './drawer/drawer-button';
import { navigate, goBackOrIfParamsOrDefault } from './nav-ref';

// import screens
import EntitiesScreen from '../modules/entities/entities-screen';
import CorporationScreen from '../modules/entities/corporation/corporation-screen';
import CorporationDetailScreen from '../modules/entities/corporation/corporation-detail-screen';
import CorporationEditScreen from '../modules/entities/corporation/corporation-edit-screen';
import BrandScreen from '../modules/entities/brand/brand-screen';
import BrandDetailScreen from '../modules/entities/brand/brand-detail-screen';
import BrandEditScreen from '../modules/entities/brand/brand-edit-screen';
import CarScreen from '../modules/entities/car/car-screen';
import CarDetailScreen from '../modules/entities/car/car-detail-screen';
import CarEditScreen from '../modules/entities/car/car-edit-screen';
import MaintainanceScreen from '../modules/entities/maintainance/maintainance-screen';
import MaintainanceDetailScreen from '../modules/entities/maintainance/maintainance-detail-screen';
import MaintainanceEditScreen from '../modules/entities/maintainance/maintainance-edit-screen';
import MaintainanceDetailsScreen from '../modules/entities/maintainance-details/maintainance-details-screen';
import MaintainanceDetailsDetailScreen from '../modules/entities/maintainance-details/maintainance-details-detail-screen';
import MaintainanceDetailsEditScreen from '../modules/entities/maintainance-details/maintainance-details-edit-screen';
// jhipster-react-native-navigation-import-needle

export const entityScreens = [
  {
    name: 'Entities',
    route: '',
    component: EntitiesScreen,
    options: {
      headerLeft: DrawerButton,
    },
  },
  {
    name: 'Corporation',
    route: 'corporation',
    component: CorporationScreen,
    options: {
      title: 'Corporations',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('CorporationEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'CorporationDetail',
    route: 'corporation/detail',
    component: CorporationDetailScreen,
    options: { title: 'View Corporation', headerLeft: () => <HeaderBackButton onPress={() => navigate('Corporation')} /> },
  },
  {
    name: 'CorporationEdit',
    route: 'corporation/edit',
    component: CorporationEditScreen,
    options: {
      title: 'Edit Corporation',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('CorporationDetail', 'Corporation')} />,
    },
  },
  {
    name: 'Brand',
    route: 'brand',
    component: BrandScreen,
    options: {
      title: 'Brands',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('BrandEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'BrandDetail',
    route: 'brand/detail',
    component: BrandDetailScreen,
    options: { title: 'View Brand', headerLeft: () => <HeaderBackButton onPress={() => navigate('Brand')} /> },
  },
  {
    name: 'BrandEdit',
    route: 'brand/edit',
    component: BrandEditScreen,
    options: {
      title: 'Edit Brand',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('BrandDetail', 'Brand')} />,
    },
  },
  {
    name: 'Car',
    route: 'car',
    component: CarScreen,
    options: {
      title: 'Cars',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('CarEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'CarDetail',
    route: 'car/detail',
    component: CarDetailScreen,
    options: { title: 'View Car', headerLeft: () => <HeaderBackButton onPress={() => navigate('Car')} /> },
  },
  {
    name: 'CarEdit',
    route: 'car/edit',
    component: CarEditScreen,
    options: { title: 'Edit Car', headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('CarDetail', 'Car')} /> },
  },
  {
    name: 'Maintainance',
    route: 'maintainance',
    component: MaintainanceScreen,
    options: {
      title: 'Maintainances',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('MaintainanceEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'MaintainanceDetail',
    route: 'maintainance/detail',
    component: MaintainanceDetailScreen,
    options: { title: 'View Maintainance', headerLeft: () => <HeaderBackButton onPress={() => navigate('Maintainance')} /> },
  },
  {
    name: 'MaintainanceEdit',
    route: 'maintainance/edit',
    component: MaintainanceEditScreen,
    options: {
      title: 'Edit Maintainance',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('MaintainanceDetail', 'Maintainance')} />,
    },
  },
  {
    name: 'MaintainanceDetails',
    route: 'maintainance-details',
    component: MaintainanceDetailsScreen,
    options: {
      title: 'MaintainanceDetails',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('MaintainanceDetailsEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'MaintainanceDetailsDetail',
    route: 'maintainance-details/detail',
    component: MaintainanceDetailsDetailScreen,
    options: { title: 'View MaintainanceDetails', headerLeft: () => <HeaderBackButton onPress={() => navigate('MaintainanceDetails')} /> },
  },
  {
    name: 'MaintainanceDetailsEdit',
    route: 'maintainance-details/edit',
    component: MaintainanceDetailsEditScreen,
    options: {
      title: 'Edit MaintainanceDetails',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('MaintainanceDetailsDetail', 'MaintainanceDetails')} />,
    },
  },
  // jhipster-react-native-navigation-declaration-needle
];

export const getEntityRoutes = () => {
  const routes = {};
  entityScreens.forEach((screen) => {
    routes[screen.name] = screen.route;
  });
  return routes;
};

const EntityStack = createStackNavigator();

export default function EntityStackScreen() {
  return (
    <EntityStack.Navigator>
      {entityScreens.map((screen, index) => {
        return <EntityStack.Screen name={screen.name} component={screen.component} key={index} options={screen.options} />;
      })}
    </EntityStack.Navigator>
  );
}
