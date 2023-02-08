'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('taeliq', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      maqalatId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "maqalat",
          key: "id",
          as: "maqalatId"
        }
      },
      nameTaeliq: {
        type: Sequelize.STRING,
        allowNull: false
      },
      emailTaeliq: {
        type: Sequelize.STRING,
        allowNull: false
      },
      taeliq: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      statusTaeliq: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      penggunaId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: "CASCADE",
        references: {
          model: "pengguna",
          key: "id",
          as: "penggunaId"
        }
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
    await queryInterface.dropTable('taeliq');
  }
};
