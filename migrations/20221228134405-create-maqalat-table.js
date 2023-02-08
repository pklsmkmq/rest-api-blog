'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('maqalat', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      penggunaId:{
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "pengguna",
          key: "id",
          as: "penggunaId"
        }
      },
      alfiaId:{
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "alfia",
          key: "id",
          as: "alfiaId"
        }
      },
      titleMaqalat: {
        type: Sequelize.STRING,
        allowNull: false
      },
      maqalat: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      imageMaqalat: {
        type: Sequelize.STRING,
        allowNull: false
      },
      activeMaqalat: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      featuredMaqalat: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      slugMaqalat: {
        type: Sequelize.STRING,
        allowNull: false
      },
      contentMaqalat: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('maqalat');
  }
};
