import cloneObject from './cloneObject'
import mapSpecialtiesOptions from './mapSpecialtiesOptions'

export default row => {
  const n = cloneObject(row)
  n.specialties = (n.specialties || []).map(mapSpecialtiesOptions)
  return n
}
