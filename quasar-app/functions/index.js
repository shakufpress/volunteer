const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const volunteersStoreName = 'volunteers'
const statusStoreName = 'projectsRequestStatuses'

function getVolunteersByEmail(email) {
  return admin.firestore().collection(volunteersStoreName)
    .where('email', '==', email).get()
}

exports.getVolunteerId = functions.https.onCall((data, context) => {
  return getVolunteersByEmail(data.email)
    .then(snapshot => {
      if (snapshot.docs && snapshot.docs.length === 1) {
        return snapshot.docs[0].id
      }
    })
})

exports.updateVolunteer = functions.https.onCall((data, context) => {
  const item = data.item

  return getVolunteersByEmail(item.email)
    .then(snapshot => {
      // if updating the volunteer email - make sure there isn't another volunteer with the same email
      const docs = snapshot.docs
      if (docs && docs.length && docs.filter(d => d.id !== item.id).length) {
        throw new functions.https.HttpsError('invalid-argument',
          'The provided email already exists. Update failed.')
      }
    }).then(() => {
      return admin.firestore().collection(volunteersStoreName).doc(item.id).update(item)
    })
})

exports.getProjectRequestsByVolunteer = functions.https.onCall((data, context) => {
  const id = data.id

  return admin.firestore().collection(statusStoreName)
    .where('volunteer', '==', id).get()
    .then(snapshot => {
      const arr = []
      snapshot.forEach(doc => {
        arr.push({
          id: doc.id,
          ...doc.data()
        })
      })
      return arr
    })
})