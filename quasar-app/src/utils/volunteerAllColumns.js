import volunteerBasicColumns from './volunteerBasicColumns'
import ellipsis15 from './ellipsis15'

export default [
  ...volunteerBasicColumns,
  { name: 'notes', label: 'Notes', align: 'left', field: 'notes', sortable: true, hasCustomStyle: true, format: ellipsis15 }
]