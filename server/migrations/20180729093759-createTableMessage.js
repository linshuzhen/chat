'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let sequelize = queryInterface.sequelize
    return sequelize.transaction(function (t) {
      return queryInterface.createTable(
        'message',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
          },
          msg_to: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          msg_from: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          msg_content: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          msg_type: {
            type: Sequelize.STRING,
            allowNull: false
          },
          meta: {
            type: Sequelize.STRING
          }
        },
        {
          charset: 'UTF8'
        },
        {transaction: t}
      )
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
