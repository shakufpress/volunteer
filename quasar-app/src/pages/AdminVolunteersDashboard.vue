<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        title="Volunteers"
        :data="data"
        :columns="columns"
        row-key="email"
        :dense="$q.screen.lt.md"
        separator="cell"
        selection="single"
        :selected.sync="selected">
        <template v-slot:body-cell-facebook_profile="props">
          <q-td :props="props">
            <q-badge color="blue" v-if="props.value" class="badge-link">
              <a :href="props.value" target="_blank">
                facebook
              </a>
            </q-badge>
          </q-td>
        </template>
        <template v-slot:body-cell-newsletter="props">
          <q-td :props="props">
            <div>
              {{props.value ? 'V' : 'X'}}
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-sayeret="props">
          <q-td :props="props">
            <div>
              {{props.value ? 'V' : 'X'}}
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageAdminVolunteersDashboard',
  data () {
    return {
      selected: [],
      columns: [
        { name: 'fullname', required: true, label: 'Full Name', align: 'right', field: 'fullname', sortable: true },
        { name: 'email', required: true, align: 'center', label: 'Email', field: 'email', sortable: true },
        { name: 'telephone', label: 'Telephone', align: 'left', field: 'telephone', sortable: true },
        { name: 'facebook_profile', label: 'Facebook Profile', align: 'left', field: 'facebook_profile', sortable: true },
        { name: 'city_residence', label: 'City of Residence', field: 'city_residence', sortable: true },
        { name: 'weekly_free_hours', label: 'Weekly Free Hours', align: 'left', field: 'weekly_free_hours', sortable: true },
        { name: 'interests_and_expertise', label: 'Interests / Expertise', align: 'left', field: 'interests_and_expertise', sortable: true },
        { name: 'notes', label: 'Notes', align: 'left', field: 'notes', sortable: true },
        { name: 'newsletter', label: 'Newsletter', align: 'left', field: 'newsletter', sortable: true },
        { name: 'sayeret', label: 'Sayeret', align: 'left', field: 'sayeret', sortable: true }
      ],
      data: [
        {
          fullname: 'שקופי שקופוביץ',
          email: 'bla@shakuf.com',
          telephone: '054-1234567',
          facebook_profile: 'https://www.facebook.com/shakuf',
          city_residence: 'תל אביב',
          weekly_free_hours: 5.5,
          interests_and_expertise: ['bla', 'bla bla'],
          notes: 'woo hoo',
          newsletter: true,
          sayeret: false
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
