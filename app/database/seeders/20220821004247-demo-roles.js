'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.bulkInsert('roles', [
        { name_role: "administrador"},
        { name_role: "usuario"}
      ], {}),

    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.bulkDelete('roles', null, {}),
      //queryInterface.bulkDelete('user_role', null, {})
    ])
  }
};
