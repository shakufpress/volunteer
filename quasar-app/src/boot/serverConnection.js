import firebaseService from '../services/firebase'
import axios from "axios"

const getFirebaseConfig = async () => {
  const { data } = await axios.get(`/__/firebase/init.json`)
  return data
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
