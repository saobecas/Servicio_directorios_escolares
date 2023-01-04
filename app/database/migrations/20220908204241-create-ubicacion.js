'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ubicacions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      longitud: {
        type: Sequelize.DOUBLE
      },
      latidud: {
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ubicacions');
  }
};