import mapSpecialtiesOptions from '../../utils/mapSpecialtiesOptions'

export default function () {
  return {
    data: [
      {
        id: 1,
        full_name: 'שקופי שקופוביץ',
        email: 'bla@shakuf.com',
        phone: '054-1234567',
        facebook_profile_url: 'https://www.facebook.com/shakuf',
        city: 'תל אביב',
        available_hours_per_week: 5.5,
        specialties: [{ name: 'bla', category: 'a' }, { name: 'bla bla', category: 'a' }].map(mapSpecialtiesOptions),
        notes: 'woo hoo'
      },
      {
        id: 2,
        full_name: 'mr bloop',
        email: 'bloop@shakuf.com',
        phone: '054-756754',
        facebook_profile_url: 'https://www.facebook.com/bloop',
        city: 'somewhere',
        available_hours_per_week: 2,
        specialties: [],
        notes: 'na na na na na na na\n na na na\n na na na na na'
      }
    ]
  }
}
