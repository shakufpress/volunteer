export default function () {
  return this.columns.filter(col => !col.hasCustomStyle)
}
