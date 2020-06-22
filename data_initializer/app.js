const admin = require("firebase-admin");

const serviceAccount = require("./service_key.json");

admin.initializeApp({
	  credential: admin.credential.cert(serviceAccount),
	  databaseURL: "https://shakuf-volunteer.firebaseio.com"
});

const specialties = require('./specialties.json');
const volunteers = require('./volunteers.json');

const firestore = admin.firestore();

specialties.forEach(async s => {
	await firestore.collection('specialties').doc(s.id + "").set(s);
})

volunteers.forEach(async v => {
	await firestore.collection('volunteers').add(v);
})
