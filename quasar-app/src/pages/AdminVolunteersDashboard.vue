<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        title="Volunteers"
        :data="data"
        :columns="columns"
        row-key="id"
        :dense="$q.screen.lt.md"
        :grid="$q.screen.xs"
        separator="cell"
        selection="single"
        :selected.sync="selected"
        :filter="filter">

        <template v-slot:top>
          <h5 class="q-ma-xs">Volunteers</h5>
          <q-space />
          <q-input placeholder="Search" dense outlined class="q-ml-md" debounce="300" color="primary" v-model="filter">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:body-cell-facebook_profile_url="props">
          <q-td :props="props">
            <BadgeLink :url="props.row.facebook_profile_url" label="facebook"/>
          </q-td>
        </template>

        <template v-slot:body-cell-specialties="props">
          <q-td :props="props">
            <q-badge color="green" v-for="sp in props.value" v-bind:key="sp.category + sp.name">
              {{sp.category}}: {{sp.name}}
            </q-badge>
          </q-td>
        </template>

        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
            <q-card :class="props.selected ? 'bg-grey-2' : ''">
              <q-card-section>
                <q-checkbox dense v-model="props.selected" :label="props.row.full_name" />
              </q-card-section>

              <q-separator inset />

              <q-list dense>
                <q-item v-for="col in defaultColumns" :key="col.name">
                  <q-item-section>
                    <q-item-label caption>{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label>{{ props.row[col.name] }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label caption>Facebook Profile</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <BadgeLink :url="props.row.facebook_profile_url" label="facebook"/>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label caption>Specialties</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-badge color="green" v-for="sp in props.row.specialties" v-bind:key="sp.category + sp.name">
                    {{sp.category}}: {{sp.name}}
                  </q-badge>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </template>

      </q-table>

      <q-btn class="q-ma-md" color="primary" :disable="!selected.length" label="Edit" @click="edit = true; editing = cloneObject(selected[0])" />

      <q-dialog v-model="edit">
        <q-card v-if="editing">
          <q-card-section>
            Edit Volunteer
          </q-card-section>

          <q-separator inset />

          <q-list dense>
            <q-item v-for="col in columns" :key="col.name">
              <q-item-section>
                <q-item-label caption>{{ col.label }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-input outlined v-model="editing[col.name]" :placeholder="col.label" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import cloneObject from '../utils/clone-object'
import BadgeLink from 'components/BadgeLink'

export default {
  name: 'PageAdminVolunteersDashboard',

  components: {
    BadgeLink
  },

  data () {
    return {
      selected: [],
      filter: '',
      edit: false,
      editing: undefined,
      columns: [
        { name: 'full_name', required: true, label: 'Full Name', align: 'left', field: 'full_name', sortable: true },
        { name: 'email', required: true, label: 'Email', align: 'left', field: 'email', sortable: true },
        { name: 'phone', label: 'Phone', align: 'left', field: 'phone', sortable: true },
        { name: 'facebook_profile_url', label: 'Facebook Profile', align: 'left', field: 'facebook_profile_url', sortable: true, hasCustomStyle: true },
        { name: 'city', label: 'City', align: 'left', field: 'city', sortable: true },
        { name: 'available_hours_per_week', label: 'Available Hours per Week', align: 'left', field: 'available_hours_per_week', sortable: true },
        { name: 'specialties', label: 'Specialties', align: 'left', field: 'specialties', sortable: true, hasCustomStyle: true },
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
  },
  computed: {
    defaultColumns () {
      return this.columns.filter(col => !col.hasCustomStyle)
    }
  },
  methods: {
    cloneObject
  }
}
</script>
