<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        title="Volunteers"
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

      <q-btn class="q-ma-md" color="primary" :disable="!selected.length" label="Edit" :to="'/edit_volunteer/'+(selected[0] || {}).id" />

      <EditDialog :show="!!editVolunteerId" :objGetter="getVolunteerToEdit" label="Edit Volunteer" :columns="defaultColumns" @close="onCloseEditDialog">
        <template v-slot:customItems="props">
          <span v-if="props.editing">
            <q-item key="facebook_profile_url">
              <q-item-section>
                <q-input dense outlined v-model="props.editing.facebook_profile_url" placeholder="Facebook Profile">
                  <template v-slot:before>
                    <LabelDiv label="Facebook Profile" />
                  </template>
                </q-input>
              </q-item-section>
            </q-item>

            <q-item key="specialties">
              <q-item-section>
                <q-select
                  v-model="props.editing.specialties"
                  multiple
                  :options="allSpecialties"
                >
                  <template v-slot:before>
                    <LabelDiv label="Specialties" />
                  </template>
                </q-select>
              </q-item-section>
            </q-item>

            <q-item key="notes">
              <q-item-section>
                <q-input dense outlined autogrow v-model="props.editing.notes" placeholder="Notes">
                  <template v-slot:before>
                    <LabelDiv label="Notes" />
                  </template>
                </q-input>
              </q-item-section>
            </q-item>
          </span>
        </template>
      </EditDialog>
    </div>
  </q-page>
</template>

<script>
import cloneObject from '../utils/cloneObject'
import defaultColumns from '../utils/defaultColumns'
import mapSpecialtiesOptions from '../utils/mapSpecialtiesOptions'
import deepSearch from '../utils/deepSearch'

import BadgeLink from 'components/BadgeLink'
import SpecialtiesBadgeList from 'components/SpecialtiesBadgeList'
import EditDialog from 'components/EditDialog'
import LabelDiv from 'components/LabelDiv'

const ellipsis15 = str => str && str.length > 15 ? str.substr(0, 15) + '...' : str

export default {
  name: 'PageAdminVolunteersDashboard',

  components: {
    BadgeLink,
    SpecialtiesBadgeList,
    EditDialog,
    LabelDiv
  },

  data () {
    return {
      selected: [],
      filter: '',
      pagination: {
        rowsPerPage: 25
      },
      columns: [
        { name: 'full_name', required: true, label: 'Full Name', align: 'left', field: 'full_name', sortable: true },
        { name: 'email', required: true, label: 'Email', align: 'left', field: 'email', sortable: true },
        { name: 'phone', label: 'Phone', align: 'left', field: 'phone', sortable: true },
        { name: 'facebook_profile_url', label: 'Facebook Profile', align: 'left', field: 'facebook_profile_url', sortable: true, hasCustomStyle: true },
        { name: 'city', label: 'City', align: 'left', field: 'city', sortable: true },
        { name: 'available_hours_per_week', label: 'Available Hours per Week', align: 'left', field: 'available_hours_per_week', sortable: true },
        { name: 'specialties', label: 'Specialties', align: 'left', field: 'specialties', sortable: true, hasCustomStyle: true },
        { name: 'notes', label: 'Notes', align: 'left', field: 'notes', sortable: true, hasCustomStyle: true, format: ellipsis15 }
      ]
    }
  },
  computed: {
    defaultColumns,
    allSpecialties () {
      return this.$store.state.specialties.data.map(mapSpecialtiesOptions)
    },
    volunteers () {
      return this.$store.state.volunteers.data.map(this.mapRow)
    },
    editVolunteerId () {
      return Number(this.$route.params?.volunteerId)
    }
  },
  methods: {
    cloneObject,
    ellipsis15,
    mapRow (row) {
      const n = cloneObject(row)
      n.specialties = n.specialties.map(mapSpecialtiesOptions)
      return n
    },
    getVolunteerToEdit () {
      const v = this.$store.getters['volunteers/getVolunteer'](this.editVolunteerId)
      return this.mapRow(v || {})
    },
    onCloseEditDialog (newValue) {
      this.$router.go(-1)

      if (newValue) {
        this.$store.commit('volunteers/editVolunteer', { newValue, columns: this.columns })
      }
    },
    deepSearch
  }
}
</script>
