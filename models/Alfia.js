'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alfia extends Model {
    static associate(models) {
      Alfia.hasMany(models.Maqalat, {
        as: "maqalat",
        foreignKey: "alfiaId"
      })
    }
  }
  Alfia.init({
    nameAlfia: DataTypes.STRING,
    slugAlfia: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Alfia',
    tableName: 'alfia'
  });
  return Alfia;
};