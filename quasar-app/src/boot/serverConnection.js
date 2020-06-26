import firebaseService from '../services/firebase'
import axios from "axios"

const getFirebaseConfig = async () => {
  try {
    const { data } = await axios.get(`/__/firebase/init.json`)
    return data
  } catch (ex) {
    // dev env
  }
};


export default async () => {
  let config = await getFirebaseConfig()
  if (!config) {
    config = (await import('./config')).default
  }
  firebaseService.init(config)

  return new Promise(resolve => {
    firebaseService.auth(resolve)
  })
}
