export default {
  // Functions return fixtures

  // entity fixtures
  updateCorporation: (corporation) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-corporation.json'),
    };
  },
  getAllCorporations: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-corporations.json'),
    };
  },
  getCorporation: (corporationId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-corporation.json'),
    };
  },
  deleteCorporation: (corporationId) => {
    return {
      ok: true,
    };
  },
  updateBrand: (brand) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-brand.json'),
    };
  },
  getAllBrands: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-brands.json'),
    };
  },
  getBrand: (brandId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-brand.json'),
    };
  },
  deleteBrand: (brandId) => {
    return {
      ok: true,
    };
  },
  updateCar: (car) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-car.json'),
    };
  },
  getAllCars: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-cars.json'),
    };
  },
  getCar: (carId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-car.json'),
    };
  },
  deleteCar: (carId) => {
    return {
      ok: true,
    };
  },
  updateMaintainance: (maintainance) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-maintainance.json'),
    };
  },
  getAllMaintainances: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-maintainances.json'),
    };
  },
  getMaintainance: (maintainanceId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-maintainance.json'),
    };
  },
  deleteMaintainance: (maintainanceId) => {
    return {
      ok: true,
    };
  },
  updateMaintainanceDetails: (maintainanceDetails) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-maintainance-details.json'),
    };
  },
  getAllMaintainanceDetails: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-maintainance-details.json'),
    };
  },
  getMaintainanceDetails: (maintainanceDetailsId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-maintainance-details.json'),
    };
  },
  deleteMaintainanceDetails: (maintainanceDetailsId) => {
    return {
      ok: true,
    };
  },
  // jhipster-react-native-api-fixture-needle

  // user fixtures
  updateUser: (user) => {
    return {
      ok: true,
      data: require('../fixtures/update-user.json'),
    };
  },
  getAllUsers: () => {
    return {
      ok: true,
      data: require('../fixtures/get-users.json'),
    };
  },
  getUser: (userId) => {
    return {
      ok: true,
      data: require('../fixtures/get-user.json'),
    };
  },
  deleteUser: (userId) => {
    return {
      ok: true,
    };
  },
  // auth fixtures
  setAuthToken: () => {},
  removeAuthToken: () => {},
  getOauthInfo: () => {
    return {
      ok: true,
      data: require('../fixtures/get-oauth-info.json'),
    };
  },
  register: ({ user }) => {
    if (user === 'user') {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        data: {
          title: 'Invalid email',
        },
      };
    }
  },
  forgotPassword: ({ email }) => {
    if (email === 'valid@gmail.com') {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        data: 'Invalid email',
      };
    }
  },
  getAccount: () => {
    return {
      ok: true,
      status: 200,
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      data: require('../fixtures/get-account.json'),
    };
  },
  updateAccount: () => {
    return {
      ok: true,
    };
  },
  changePassword: ({ currentPassword }) => {
    if (currentPassword === 'valid-password') {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        data: 'Password error',
      };
    }
  },
};
