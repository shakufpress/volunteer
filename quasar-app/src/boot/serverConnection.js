import firebaseService from '../services/firebase'

export default async () => {
  let config = process.env.environments?.FIREBASE_CONFIG
  if (!config) {
  	config = (await import('./config')).default
  }

  firebaseService.init(config)

  return new Promise(resolve => {
	firebaseService.auth(resolve)
  })
}
