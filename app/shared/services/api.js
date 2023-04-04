// a library to wrap and simplify api calls
import apisauce from 'apisauce';

import AppConfig from '../../config/app-config';

// our "constructor"
const create = (baseURL = AppConfig.apiUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
    },
    // 10 second timeout...
    timeout: 10000,
  });

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const setAuthToken = (userAuth) => api.setHeader('Authorization', 'Bearer ' + userAuth);
  const removeAuthToken = () => api.deleteHeader('Authorization');
  // use an empty Authorization header in the auth-info request to prevent an invalid token from returning 401
  const getOauthInfo = () => api.get('api/auth-info', {}, { headers: { Authorization: undefined } });
  const getOauthIssuerInfo = (issuerUrl) => api.get(`${issuerUrl}/.well-known/openid-configuration`);
  const register = (user) => api.post('api/register', user);
  const forgotPassword = (data) =>
    api.post('api/account/reset-password/init', data, {
      headers: { 'Content-Type': 'text/plain', Accept: 'application/json, text/plain, */*' },
    });

  const getAccount = () => api.get('api/account');
  const updateAccount = (account) => api.post('api/account', account);
  const changePassword = (currentPassword, newPassword) =>
    api.post(
      'api/account/change-password',
      { currentPassword, newPassword },
      { headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/plain, */*' } },
    );

  const getUser = (userId) => api.get('api/users/' + userId);
  const getAllUsers = (options) => api.get('api/users', options);
  const createUser = (user) => api.post('api/users', user);
  const updateUser = (user) => api.put('api/users', user);
  const deleteUser = (userId) => api.delete('api/users/' + userId);

  const getCorporation = (corporationId) => api.get('api/corporations/' + corporationId);
  const getAllCorporations = (options) => api.get('api/corporations', options);
  const createCorporation = (corporation) => api.post('api/corporations', corporation);
  const updateCorporation = (corporation) => api.put(`api/corporations/${corporation.id}`, corporation);
  const deleteCorporation = (corporationId) => api.delete('api/corporations/' + corporationId);

  const getBrand = (brandId) => api.get('api/brands/' + brandId);
  const getAllBrands = (options) => api.get('api/brands', options);
  const createBrand = (brand) => api.post('api/brands', brand);
  const updateBrand = (brand) => api.put(`api/brands/${brand.id}`, brand);
  const deleteBrand = (brandId) => api.delete('api/brands/' + brandId);

  const getCar = (carId) => api.get('api/cars/' + carId);
  const getAllCars = (options) => api.get('api/cars', options);
  const createCar = (car) => api.post('api/cars', car);
  const updateCar = (car) => api.put(`api/cars/${car.id}`, car);
  const deleteCar = (carId) => api.delete('api/cars/' + carId);

  const getMaintainance = (maintainanceId) => api.get('api/maintainances/' + maintainanceId);
  const getAllMaintainances = (options) => api.get('api/maintainances', options);
  const createMaintainance = (maintainance) => api.post('api/maintainances', maintainance);
  const updateMaintainance = (maintainance) => api.put(`api/maintainances/${maintainance.id}`, maintainance);
  const deleteMaintainance = (maintainanceId) => api.delete('api/maintainances/' + maintainanceId);

  const getMaintainanceDetails = (maintainanceDetailsId) => api.get('api/maintainance-details/' + maintainanceDetailsId);
  const getAllMaintainanceDetails = (options) => api.get('api/maintainance-details', options);
  const createMaintainanceDetails = (maintainanceDetails) => api.post('api/maintainance-details', maintainanceDetails);
  const updateMaintainanceDetails = (maintainanceDetails) =>
    api.put(`api/maintainance-details/${maintainanceDetails.id}`, maintainanceDetails);
  const deleteMaintainanceDetails = (maintainanceDetailsId) => api.delete('api/maintainance-details/' + maintainanceDetailsId);
  // jhipster-react-native-api-method-needle

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    createUser,
    updateUser,
    getAllUsers,
    getUser,
    deleteUser,

    createCorporation,
    updateCorporation,
    getAllCorporations,
    getCorporation,
    deleteCorporation,

    createBrand,
    updateBrand,
    getAllBrands,
    getBrand,
    deleteBrand,

    createCar,
    updateCar,
    getAllCars,
    getCar,
    deleteCar,

    createMaintainance,
    updateMaintainance,
    getAllMaintainances,
    getMaintainance,
    deleteMaintainance,

    createMaintainanceDetails,
    updateMaintainanceDetails,
    getAllMaintainanceDetails,
    getMaintainanceDetails,
    deleteMaintainanceDetails,
    // jhipster-react-native-api-export-needle
    setAuthToken,
    removeAuthToken,
    getOauthInfo,
    getOauthIssuerInfo,
    register,
    forgotPassword,
    getAccount,
    updateAccount,
    changePassword,
  };
};

// let's return back our create method as the default.
export default {
  create,
};
