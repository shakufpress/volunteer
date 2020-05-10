import mapSpecialtiesOptions from '../../utils/mapSpecialtiesOptions'

export default function () {
  return {
    data: [
      { name: 'bla', category: 'a' },
      { name: 'bla bla', category: 'a' }
    ].map(mapSpecialtiesOptions)
  }
}
