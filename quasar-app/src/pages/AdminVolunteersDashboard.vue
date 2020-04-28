<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        title="Volunteers"
        :data="data"
        :columns="columns"
        row-key="id"
        :dense="$q.screen.lt.md"
        separator="cell"
        selection="single"
        :selected.sync="selected"
        :filter="filter">

        <template v-slot:top>
          <h5 class="q-ma-xs">Volunteers</h5>
          <q-space />
          <q-input placeholder="Search" dense  class="q-ml-md" debounce="300" color="primary" v-model="filter">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:body-cell-facebook_profile_url="props">
          <q-td :props="props">
            <q-badge color="blue" v-if="props.value" class="badge-link">
              <a :href="props.value" target="_blank">
                facebook
              </a>
            </q-badge>
          </q-td>
        </template>

        <template v-slot:body-cell-specialties="props">
          <q-td :props="props">
            <q-badge color="green" v-for="sp in props.value" v-bind:key="sp.category + sp.name">
              {{sp.category}}: {{sp.name}}
            </q-badge>
          </q-td>
        </template>

      </q-table>

      <q-btn class="q-ma-md" color="primary" :disable="!selected.length" label="Edit" @click="editRow" />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageAdminVolunteersDashboard',
  data () {
    return {
      selected: [],
      filter: '',
      columns: [
        { name: 'full_name', required: true, label: 'Full Name', align: 'left', field: 'full_name', sortable: true },
        { name: 'email', required: true, label: 'Email', align: 'left', field: 'email', sortable: true },
        { name: 'phone', label: 'Phone', align: 'left', field: 'phone', sortable: true },
        { name: 'facebook_profile_url', label: 'Facebook Profile', align: 'left', field: 'facebook_profile_url', sortable: true },
        { name: 'city', label: 'City', align: 'left', field: 'city', sortable: true },
        { name: 'available_hours_per_week', label: 'Available Hours per Week', align: 'left', field: 'available_hours_per_week', sortable: true },
        { name: 'specialties', label: 'Specialties', align: 'left', field: 'specialties', sortable: true },
        { name: 'notes', label: 'Notes', align: 'left', field: 'notes', sortable: true }
      ],
      data: [
        {
          full_name: 'שקופי שקופוביץ',
          email: 'bla@shakuf.com',
          phone: '054-1234567',
          facebook_profile_url: 'https://www.facebook.com/shakuf',
          city: 'תל אביב',
          available_hours_per_week: 5.5,
          specialties: [{ name: 'bla', category: 'a' }, { name: 'bla bla', category: 'a' }],
          notes: 'woo hoo'
        }
      ]
    }
  }
}
</script>

<style lang="sass">
.badge-link
  a:link, a:visited, a:hover, a:active
    color: white
</style>

<!-- <style lang="sass">
.sticky-header-column-table
  td:first-child
    /* bg color is important for td; just specify one */
    background-color: #c1f4cd !important

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: #fff

  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0
</style> -->
