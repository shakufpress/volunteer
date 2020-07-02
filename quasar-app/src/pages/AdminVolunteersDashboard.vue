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
          <TagLine />
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

      <q-dialog v-model="showError" persistent>
        <q-card>
          <q-card-section class="items-center">
            <q-avatar icon="error" color="primary" text-color="white" />
            <span class="q-ml-sm">{{ errorText }}</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Close" color="primary" v-close-popup @click="showError = false" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import defaultColumns from '../utils/defaultColumns'
import deepSearch from '../utils/deepSearch'
import volunteerBasicColumns from '../utils/volunteerBasicColumns'

import BadgeLink from 'components/BadgeLink'
import TagLine from 'components/TagLine'
import SpecialtiesBadgeList from 'components/SpecialtiesBadgeList'
import EditVolunteerDialog from 'components/EditVolunteerDialog'

const ellipsis15 = str => str && str.length > 15 ? str.substr(0, 15) + '...' : str

export default {
  name: 'PageAdminVolunteersDashboard',

  components: {
    BadgeLink,
    TagLine,
    SpecialtiesBadgeList,
    EditVolunteerDialog
  },

  async beforeCreate () {
    await this.$store.dispatch('volunteers/all')
  },

  data () {
    return {
      selected: [],
      filter: '',
      showError: false,
      errorText: '',
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
      return this.$store.state.volunteers.data
    },
    editVolunteerId () {
      return this.$route.params?.volunteerId
    }
  },
  methods: {
    ellipsis15,
    async onCloseEditDialog (newValue) {
      this.$router.go(-1)

      if (newValue) {
        try {
          await this.$store.dispatch('volunteers/update', newValue)
        } catch (ex) {
          this.errorText = ex.message
          this.showError = true
        }
      }
    },
    deepSearch
  }
}
</script>
