'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    let sequelize = queryInterface.sequelize
    return sequelize.transaction(function (t) {
      return queryInterface.addColumn(
        'message',
        'msg_time',
        {
          type: Sequelize.DATE
        },
        {transaction: t}
      )
    })
  },
  down: function (queryInterface, Sequelize) {
    return false
  }
}



