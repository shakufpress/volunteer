const mapOptions = obj => Object.assign({ label: obj.name, value: obj }, obj)

export default function () {
  return {
    data: [
      { id: 1, name: 'bob', email: 'bob@bob.com' },
      { id: 2, name: 'alice', email: 'alice@asdf.com' }
    ].map(mapOptions).reduce((dict, obj) => {
      dict[obj.id] = obj
      return dict
    }, {})
  }
}
