'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sares', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idSare: {
        type: Sequelize.STRING
      },
       nameSare: {
        type: Sequelize.STRING
      },
      nameJefeSare: { 
        type: Sequelize.STRING
      },
      telefono: { 
        type: Sequelize.STRING
      },
      email: { 
        type: Sequelize.STRING
      }, 
      longitud: { 
        type: Sequelize.DOUBLE
      },
      latidud: { 
        type: Sequelize.DOUBLE
      },
      /*regionSaresId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'regionsares',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },*/
      localidadId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'localidads',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
    await queryInterface.dropTable('sares');
  }
};