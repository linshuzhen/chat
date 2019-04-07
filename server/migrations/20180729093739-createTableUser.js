'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let sequelize = queryInterface.sequelize
    return sequelize.transaction(function (t) {
      return queryInterface.createTable(
        'user',
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
          tel: {
            type: Sequelize.STRING,
            allowNull: false
          },
          password: {
            type: Sequelize.STRING,
            allowNull: false
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false
          },
          avatar: {
            type: Sequelize.STRING
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
