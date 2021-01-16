'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dataChanges', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      passwordId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'passwords',
          key: 'id',
        },
      },
      actionType: {
        type: Sequelize.ENUM('CREATE', 'UPDATE', 'DELETE'),
        allowNull: false,
      },
      fields: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      currentValues: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      previousValues: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('dataChanges');
  },
};
