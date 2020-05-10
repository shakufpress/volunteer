import volunteerStatusEnum from '../../utils/volunteerStatusEnum'

export default function () {
  return {
    data: [
      {
        id: 1,
        managerId: 1,
        title: 'task 1',
        estimation: 5.2,
        description: 'bla bla bla',
        phone: '054-26543656',
        email: 'shakuf@shakuf.com',
        wanted_volunteers: 5,
        status: 0,
        volunteers: [
          {
            id: 1,
            full_name: 'שקופי שקופוביץ',
            email: 'bla@shakuf.com',
            status: 0
          },
          {
            id: 2,
            full_name: 'bla',
            email: 'asdf@asdf.com',
            status: 1
          }
        ].map(v => {
          v.status = { label: volunteerStatusEnum[v.status], value: v.status }
          return v
        })
      },
      {
        id: 2,
        managerId: 1,
        title: 'best task ever',
        estimation: 15,
        description: 'wow this \nis amazing',
        phone: '054-7674574567',
        email: 'shakuf@shakuf.com',
        wanted_volunteers: 2,
        status: 1,
        volunteers: []
      }
    ]
  }
}
