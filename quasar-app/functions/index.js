const express = require('express');
const cors = require('cors');
const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const volunteersStoreName = 'volunteers'
const statusStoreName = 'projectsRequestStatuses'
const specialtiesStoreName = 'specialties'
const GENERAL_CATEGORY = "כללי"

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

function hasSpecialty(specialties, s) {
  let specialty = s.split(':');

  try {
    specialty = {
      name: specialty[1].trim(),
      category: specialty[0].trim(),
    }
  } catch (e)
  {
    specialty = {
      name: specialty[0].trim(),
      category: GENERAL_CATEGORY
    }
  }

  return specialties.find(s => {
    return s.name == specialty.name && s.category == specialty.category;
  })
}

function getSpecialties(oldSpecialties, volunteer) {
  let newSpecialties = [];
  let user_specialties = [];
  let specialties_length = oldSpecialties.length;
  volunteer.specialties.split(',').forEach(s => {
    specialty_id = 0;
    let specialty
    try {
      specialty = hasSpecialty(oldSpecialties, s);
    } catch (err) {
      console.err("Specialty: " + s);
      console.err(err.stack);
      return
    }
    if (specialty) {
      specialty_id = specialty.id;
    } else {
      specialty_id = specialties_length++;
      try {
        specialty = s.split(':');
        specialty = {
          id: specialty_id,
          name: specialty[1].trim(),
          category: specialty[0].trim(),
        }
      } catch (ex) {
        specialty = {
          id: specialty_id,
          name: specialty[0].trim(),
          category: GENERAL_CATEGORY,
        };
      }
      newSpecialties.push(specialty);
    }
    user_specialties.push(specialty_id);
  });

  return [newSpecialties, user_specialties];
}

const app = express();
app.use(cors({ origin: true }));

app.post('/', async (req, res) => {
  let specialties = []
  try {
    let snapshot = await (await admin.firestore().collection(specialtiesStoreName).get()).docs;
    snapshot.forEach(doc => {
      specialties.push({
        id: doc.id,
        ...doc.data()
      })
    })
  } catch (err) {
    return res.status(500).send(err.stack)
  }

  const volunteer = req.body;
  let newspecs = []
  let userspecs = []
  if (volunteer.specialties != "") {
    try {
      [newspecs, userspecs] = getSpecialties(specialties, volunteer)
    } catch (err) {
      return res.status(500).send(err.stack)
    }
  }

  try {
    newspecs.forEach(async s => {
      await admin.firestore().collection(specialtiesStoreName).doc(s.id + "").set(s);
    })
  } catch (err) {
    return res.status(500).send(err.stack)
  }

  volunteer.specialties = userspecs;
  volunteer.projects = [];
  try {
    let updateVol = await (await getVolunteersByEmail(volunteer.email)).docs
    if (updateVol && updateVol.length == 1) {
      await admin.firestore().collection(volunteersStoreName).doc(updateVol[0].id).update(volunteer)
    } else {
      await admin.firestore().collection(volunteersStoreName).add(volunteer);
    }
  } catch (err) {
    return res.status(500).send(err.stack)
  }
  return res.status(201).json(volunteer);
});

exports.addVolunteerFromSheet = functions.https.onRequest(app);