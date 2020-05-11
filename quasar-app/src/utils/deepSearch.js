export default function deepSearch (rows, terms, cols, getCellValue) {
  return rows.filter(r => getKeys(r, terms).length > 0)
}

function getKeys (obj, val) {
  val = val.toLowerCase()
  var objects = []
  for (var i in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue
    if (typeof obj[i] === 'object') {
      objects = objects.concat(getKeys(obj[i], val))
    } else if (obj[i] === val || ('' + obj[i]).toLowerCase().indexOf(val) !== -1) {
      objects.push(i)
    }
  }
  return objects
}
