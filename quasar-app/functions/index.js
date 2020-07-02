const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

exports.getVolunteerId = functions.https.onCall((data, context) => {
  return admin.firestore().collection('volunteers')
    .where('email', '==', data.email).get()
    .then(volunteers => {
      if (volunteers && volunteers.length === 1) {
        return volunteers[0].id
      }
    })
});
