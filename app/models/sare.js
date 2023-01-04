'use strict';
const {
  Model
} = require('sequelize');

const camelCase = require('lodash/camelCase');
const db = require('../models');
module.exports = (sequelize, DataTypes) => {
  class Sare extends Model {
    /**
     * Helper meSSSSthod for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sare.init({
    idSare: DataTypes.STRING,
    nameSare: DataTypes.STRING,
    nameJefeSare: DataTypes.STRING,
    telefono: DataTypes.STRING,
    email: DataTypes.STRING, 
    longitud: DataTypes.DOUBLE,
    latitud: DataTypes.DOUBLE,
    /*regionSaresId:{
      type: DataTypes.INTEGER,
      references: {
        model: 'regionsares',
        key: 'id'
      }
  },*/

  localidadId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'localidads',
        key: 'id'
      }
  },
  }, {
    sequelize,
    modelName: 'sare',
    scopes: {
      default: true
      },
    
  });
   
  Sare.associate = function(models) {
    Sare.belongsTo(models.localidad, {
      foreignKey: 'localidadId',
      targetId: 'id',
      as: 'localidad'
    });
    Sare.belongsToMany(models.region, {
      through: 'regionsares',
      as: 'Regiones'
    });
   
  }

  return Sare;
};