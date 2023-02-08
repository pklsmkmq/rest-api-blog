'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Maqalat extends Model {
    static associate(models) {
      Maqalat.belongsTo(models.Pengguna, {
        as: "penulis",
        foreignKey: "penggunaId"
      })

      Maqalat.belongsTo(models.Alfia, {
        as: "kategori",
        foreignKey: "alfiaId"
      })

      Maqalat.hasMany(models.Taeliq, {
        as: "taeliq",
        foreignKey: "maqalatId"
      })
    }
  }
  Maqalat.init({
    penggunaId: DataTypes.INTEGER,
    alfiaId: DataTypes.INTEGER,
    titleMaqalat: DataTypes.STRING,
    imageMaqalat: DataTypes.STRING,
    activeMaqalat: DataTypes.BOOLEAN,
    featuredMaqalat: DataTypes.BOOLEAN,
    slugMaqalat: DataTypes.STRING,
    contentMaqalat: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Maqalat',
    tableName: 'maqalat'
  });
  return Maqalat;
};