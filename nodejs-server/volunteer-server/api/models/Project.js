/**
 * Project.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  primaryKey: 'id',

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    title: {
      type: 'string',
      required: true,
      maxLength: 120,
    },

    categories: {
      type: 'json',
      required: true,
      example: "['cat1', 'cat2', 'cat3']"
    },

    estimation: {
      type: 'number',
      required: false,
    },

    description: {
      type: 'string',
      required: true,
    },

    phone: {
      type: 'string',
      required: true,
      description: 'Manager phone Number.',
      maxLength: 13,
    },

    email: {
      type: 'string',
      required: true,
      isEmail: true,
      maxLength: 200,
      example: 'mary.sue@example.com'
    },

    wanted_volunteers: {
      type: 'number',
      required: true,
    },

    status: {
      type: 'string',
      required: true,
      maxLength: 20,
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝


    pending_volunteers: {
      collection: 'volunteer',
      via: 'applied_projects',
    },

    approved_volunteers: {
      collection: 'volunteer',
      via: 'working_projects',
    },

    denied_volunteers: {
      collection: 'volunteer',
      via: 'denied_projects',
    },

  },

};

