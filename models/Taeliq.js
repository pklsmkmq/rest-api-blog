'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Taeliq extends Model {
    static associate(models) {
      Taeliq.belongsTo(models.Maqalat, {
        as: "maqalat",
        foreignKey: "maqalatId"
      })

      Taeliq.belongsTo(models.Pengguna, {
        as: "pengguna",
        foreignKey: "penggunaId"
      })
    }
  }
  Taeliq.init({
    maqalatId: DataTypes.INTEGER,
    nameTaeliq: DataTypes.STRING,
    emailTaeliq: DataTypes.STRING,
    taeliq: DataTypes.TEXT,
    statusTaeliq: DataTypes.BOOLEAN,
    penggunaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Taeliq',
    tableName: 'taeliq'
  });
  return Taeliq;
};