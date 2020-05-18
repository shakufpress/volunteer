/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

const volunteers = require('../volunteers.json');
const specialties = require('../specialties.json');

module.exports.bootstrap = async function() {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // Set up fake development data (or if we already have some, avast)

  await Specialty.createEach(specialties);
  await Volunteer.createEach(volunteers);

  await Admin.createEach([
    { email: 'test@gmail.com', password: "asdfasdf", full_name: 'test testy', phone: '0547634381'},
  ]);

};
