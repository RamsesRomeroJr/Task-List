'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Lists', [
        {
          userId: 1,
          title: 'Dog things',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 2,
          title: 'Road Trip',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 3,
          title: 'Interview',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Lists', null, {});

  }
};
