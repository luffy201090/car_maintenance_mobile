import { takeLatest, all } from 'redux-saga/effects';
import API from '../services/api';
import FixtureAPI from '../services/fixture-api';
import AppConfig from '../../config/app-config';

/* ------------- Types ------------- */

import { StartupTypes } from '../reducers/startup.reducer';
import { AuthInfoTypes } from '../reducers/auth-info.reducer';
import { LoginTypes } from '../../modules/login/login.reducer';
import { AccountTypes } from '../../shared/reducers/account.reducer';
import { UserTypes } from '../../shared/reducers/user.reducer';
import { CorporationTypes } from '../../modules/entities/corporation/corporation.reducer';
import { BrandTypes } from '../../modules/entities/brand/brand.reducer';
import { CarTypes } from '../../modules/entities/car/car.reducer';
import { MaintainanceTypes } from '../../modules/entities/maintainance/maintainance.reducer';
import { MaintainanceDetailsTypes } from '../../modules/entities/maintainance-details/maintainance-details.reducer';
// jhipster-react-native-saga-redux-import-needle

/* ------------- Sagas ------------- */

import { startup } from './startup.saga';
import { getAuthInfo } from './auth-info.saga';
import { login, logout, loginLoad } from '../../modules/login/login.sagas';
import { getAccount, updateAccount } from '../../shared/sagas/account.sagas';
import UserSagas from '../../shared/sagas/user.sagas';
import CorporationSagas from '../../modules/entities/corporation/corporation.sagas';
import BrandSagas from '../../modules/entities/brand/brand.sagas';
import CarSagas from '../../modules/entities/car/car.sagas';
import MaintainanceSagas from '../../modules/entities/maintainance/maintainance.sagas';
import MaintainanceDetailsSagas from '../../modules/entities/maintainance-details/maintainance-details.sagas';
// jhipster-react-native-saga-method-import-needle

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = AppConfig.useFixtures ? FixtureAPI : API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(AuthInfoTypes.AUTH_INFO_REQUEST, getAuthInfo, api),

    // JHipster accounts
    takeLatest(LoginTypes.LOGIN_LOAD, loginLoad, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, api),

    takeLatest(CorporationTypes.CORPORATION_REQUEST, CorporationSagas.getCorporation, api),
    takeLatest(CorporationTypes.CORPORATION_ALL_REQUEST, CorporationSagas.getAllCorporations, api),
    takeLatest(CorporationTypes.CORPORATION_UPDATE_REQUEST, CorporationSagas.updateCorporation, api),
    takeLatest(CorporationTypes.CORPORATION_DELETE_REQUEST, CorporationSagas.deleteCorporation, api),

    takeLatest(BrandTypes.BRAND_REQUEST, BrandSagas.getBrand, api),
    takeLatest(BrandTypes.BRAND_ALL_REQUEST, BrandSagas.getAllBrands, api),
    takeLatest(BrandTypes.BRAND_UPDATE_REQUEST, BrandSagas.updateBrand, api),
    takeLatest(BrandTypes.BRAND_DELETE_REQUEST, BrandSagas.deleteBrand, api),

    takeLatest(CarTypes.CAR_REQUEST, CarSagas.getCar, api),
    takeLatest(CarTypes.CAR_ALL_REQUEST, CarSagas.getAllCars, api),
    takeLatest(CarTypes.CAR_UPDATE_REQUEST, CarSagas.updateCar, api),
    takeLatest(CarTypes.CAR_DELETE_REQUEST, CarSagas.deleteCar, api),

    takeLatest(MaintainanceTypes.MAINTAINANCE_REQUEST, MaintainanceSagas.getMaintainance, api),
    takeLatest(MaintainanceTypes.MAINTAINANCE_ALL_REQUEST, MaintainanceSagas.getAllMaintainances, api),
    takeLatest(MaintainanceTypes.MAINTAINANCE_UPDATE_REQUEST, MaintainanceSagas.updateMaintainance, api),
    takeLatest(MaintainanceTypes.MAINTAINANCE_DELETE_REQUEST, MaintainanceSagas.deleteMaintainance, api),

    takeLatest(MaintainanceDetailsTypes.MAINTAINANCE_DETAILS_REQUEST, MaintainanceDetailsSagas.getMaintainanceDetails, api),
    takeLatest(MaintainanceDetailsTypes.MAINTAINANCE_DETAILS_ALL_REQUEST, MaintainanceDetailsSagas.getAllMaintainanceDetails, api),
    takeLatest(MaintainanceDetailsTypes.MAINTAINANCE_DETAILS_UPDATE_REQUEST, MaintainanceDetailsSagas.updateMaintainanceDetails, api),
    takeLatest(MaintainanceDetailsTypes.MAINTAINANCE_DETAILS_DELETE_REQUEST, MaintainanceDetailsSagas.deleteMaintainanceDetails, api),
    // jhipster-react-native-saga-redux-connect-needle

    takeLatest(UserTypes.USER_ALL_REQUEST, UserSagas.getAllUsers, api),

    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, api),
    takeLatest(AccountTypes.ACCOUNT_UPDATE_REQUEST, updateAccount, api),
  ]);
}
