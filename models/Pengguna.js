'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pengguna extends Model {
    static associate(models) {
      Pengguna.hasMany(models.Maqalat, {
        as: "maqalat",
        foreignKey: "penggunaId"
      })

      Pengguna.hasMany(models.Taeliq, {
        as: "taeliq",
        foreignKey: "penggunaId"
      })
    }
  }
  Pengguna.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pengguna',
    tableName: 'pengguna'
  });
  return Pengguna;
};