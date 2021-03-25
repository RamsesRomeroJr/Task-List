'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Tasks', [
        {
          listId: 1,
          title: 'Bite Shoes',
          description: 'Find my owners favorite pair of shoes and start chewing it like a steak',
          complete: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          listId: 1,
          title: 'eat',
          description: 'find food bowl, see whats for today and CHOW DOWN',
          complete: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          listId: 1,
          title: 'Protect House',
          description: 'Watch out for intruders and squirrels and alert the boss',
          complete: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          listId: 2,
          title: 'pack',
          description: 'Pack clothes and snacks for the long trip',
          complete: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          listId: 2,
          title: 'routes',
          description: 'plan the pit stops for the road trip and place to stop at for pics',
          complete: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          listId: 2,
          title: 'Pick up friends',
          description: 'pick everyone up and get hype',
          complete: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          listId: 3,
          title: 'Pick a Canidate',
          description: 'go through stack of applicants and choose a the perfect canidate',
          complete: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          listId: 3,
          title: 'Interview Canidate',
          description: 'Interview the canidate to make sure they\'re a good fit for the role ' ,
          complete: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          listId: 3,
          title: 'Hire',
          description: 'after interviewing the canidate reach out with a offer letter and congradulate them',
          complete: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Tasks', null, {});

  }
};
