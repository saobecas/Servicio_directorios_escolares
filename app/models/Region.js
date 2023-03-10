'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Region extends Model {
    /**
     * Helper meSSSSthod for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Region.init({
    nameRegion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'region',
  });
   
  Region.associate = function(models){
    Region.hasMany(models.municipio, {
      foreignKey: 'regionId',
      sourceKey: 'id'
     // as: 'school'
    });
    Region.belongsToMany(models.sare, {
      through: 'regiones_sares',
      onDelete: 'CASCADE', // default for belongsToMany
      onUpdate: 'CASCADE', // default for belongsToMany
      foreignKey: {
        name: 'regionId',
        type: DataTypes.INTEGER,
        
      }});
    
/*
    Region.belongsToMany(models.sare, {
      through: 'regionsares'
    });
     */
  }

  return Region;
};