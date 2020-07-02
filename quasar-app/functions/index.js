const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

exports.getVolunteerId = functions.https.onCall((data, context) => {
  return admin.firestore().collection('volunteers')
    .where('email', '==', data.email).get()
    .then(snapshot => {
      if (snapshot.docs && snapshot.docs.length === 1) {
        return snapshot.docs[0].id
      }
    })
});
