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

    estimation: {
      type: 'number',
      required: false,
    },

    description: {
      type: 'string',
      required: true,
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

    manager_name: {
      type: 'string',
      required: true,
      description: 'Full representation of the manager\'s name.',
      maxLength: 120,
      example: 'Mary Sue van der McHenst'
    },

    email: {
      type: 'string',
      required: true,
      isEmail: true,
      maxLength: 200,
      example: 'mary.sue@example.com'
    },

    phone: {
      type: 'string',
      required: true,
      unique: true,
      description: 'Phone Number.',
      maxLength: 13,
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    volunteers: {
      collection: 'status',
      via: 'project',
    },

    categories: {
      collection: 'specialty',
      via: 'projects',
    },

  },

};

