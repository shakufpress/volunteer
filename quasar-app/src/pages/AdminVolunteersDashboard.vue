<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        title="Volunteers"
        class="sticky-header-table"
        :data="volunteers"
        :columns="columns"
        row-key="id"
        :dense="$q.screen.lt.md"
        :grid="$q.screen.xs"
        separator="cell"
        selection="single"
        :selected.sync="selected"
        :filter="filter"
        :filter-method="deepSearch"
        :pagination.sync="pagination">

        <template v-slot:top>
          <h5 class="q-ma-xs">Volunteers</h5>
          <q-btn class="q-ma-md" color="primary" :disable="!selected.length" label="Edit" :to="'/edit_volunteer/'+(selected[0] || {}).id" />
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
            <SpecialtiesBadgeList :list="props.value" />
          </q-td>
        </template>

        <template v-slot:body-cell-notes="props">
          <q-td :props="props">
            {{ props.value }}

            <q-tooltip>
              {{ props.row.notes }}
            </q-tooltip>
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
                    <SpecialtiesBadgeList :list="props.row.specialties" />
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label caption>Notes</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label>{{ ellipsis15(props.row.notes) }}</q-item-label>

                    <q-tooltip>
                      {{ props.row.notes }}
                    </q-tooltip>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </template>

      </q-table>

      <EditVolunteerDialog :show="!!editVolunteerId" :editVolunteerId="editVolunteerId" label="Edit Volunteer" :columns="columns" @close="onCloseEditDialog" />
    </div>
  </q-page>
</template>

<script>
import defaultColumns from '../utils/defaultColumns'
import deepSearch from '../utils/deepSearch'
import mapVolunteer from '../utils/mapVolunteer'
import volunteerBasicColumns from '../utils/volunteerBasicColumns'

import BadgeLink from 'components/BadgeLink'
import SpecialtiesBadgeList from 'components/SpecialtiesBadgeList'
import EditVolunteerDialog from 'components/EditVolunteerDialog'

const ellipsis15 = str => str && str.length > 15 ? str.substr(0, 15) + '...' : str

export default {
  name: 'PageAdminVolunteersDashboard',

  components: {
    BadgeLink,
    SpecialtiesBadgeList,
    EditVolunteerDialog
  },

  async beforeCreate () {
    const user = this.$store.state.user
    if (!user.id || user.role !== 'admin') {
      this.$router.replace('/')
    } else {
      await this.$store.dispatch('volunteers/all')
      await this.$store.dispatch('specialties/all')
    }
  },

  data () {
    return {
      selected: [],
      filter: '',
      pagination: {
        rowsPerPage: 25
      },
      columns: [
        ...volunteerBasicColumns,
        { name: 'notes', label: 'Notes', align: 'left', field: 'notes', sortable: true, hasCustomStyle: true, format: ellipsis15 }
      ]
    }
  },
  computed: {
    defaultColumns,
    volunteers () {
      return this.$store.state.volunteers.data.map(this.mapRow)
    },
    editVolunteerId () {
      return Number(this.$route.params?.volunteerId)
    }
  },
  methods: {
    ellipsis15,
    mapRow: mapVolunteer,
    async onCloseEditDialog (newValue) {
      this.$router.go(-1)

      if (newValue) {
        await this.$store.dispatch('volunteers/update', newValue)
      }
    },
    deepSearch
  }
}
</script>
