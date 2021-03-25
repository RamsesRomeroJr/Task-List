'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Comments', [
        {
          userId:1,
          taskId:1,
          content: 'classic, my favorite activity',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId:2,
          taskId:1,
          content: 'so thats what happend to my shoes',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId:3,
          taskId:1,
          content: 'uh please don\'t',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId:1,
          taskId:4,
          content: 'don\'t forget the pringles!!',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId:2,
          taskId:5,
          content: 'could we stop at a Popeyes??',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId:1,
          taskId:7,
          content: 'wow I wonder who got picked',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId:2,
          taskId:9,
          content: 'CONGRATS!!',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Comments', null, {});

  }
};
