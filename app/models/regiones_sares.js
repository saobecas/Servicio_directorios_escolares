'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Regiones_sares extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Regiones_sares.init({
  }, {
    sequelize,
    modelName: 'regiones_sares',
  });
  Regiones_sares.associations = function(models) {
    Regiones_sares.belongsToMany(models.region, {
      through: 'regiones_sares',
      onDelete: 'CASCADE', // default for belongsToMany
      onUpdate: 'CASCADE', // default for belongsToMany
      foreignKey: {
        name: 'regionId',
        type: DataTypes.INTEGER,
        
      },
    });
    Regiones_sares.belongsToMany(models.sare, {
      through: 'regiones_sares',
      onDelete: 'CASCADE', // default for belongsToMany
      onUpdate: 'CASCADE', // default for belongsToMany
      foreignKey: {
        name: 'sareId',
        type: DataTypes.INTEGER,
        
      },
    });
     
  }
  return Regiones_sares;
};