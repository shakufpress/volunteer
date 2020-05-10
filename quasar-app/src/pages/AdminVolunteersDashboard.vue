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
        :filter="filter"
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

      <q-btn class="q-ma-md" color="primary" :disable="!selected.length" label="Edit" @click="edit = true; editing = cloneObject(selected[0])" />

      <EditDialog :show="edit" :editing="editing" label="Edit Volunteer" :columns="defaultColumns" @close="onCloseEditDialog">
        <template v-slot:customItems>
          <span v-if="editing">
            <q-item key="facebook_profile_url">
              <q-item-section>
                <q-input dense outlined v-model="editing.facebook_profile_url" placeholder="Facebook Profile">
                  <template v-slot:before>
                    <LabelDiv label="Facebook Profile" />
                  </template>
                </q-input>
              </q-item-section>
            </q-item>

            <q-item key="specialties">
              <q-item-section>
                <q-select
                  v-model="editing.specialties"
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
                <q-input dense outlined autogrow v-model="editing.notes" placeholder="Notes">
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
      edit: false,
      editing: {},
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
      ],
      data: [
        {
          id: 1,
          full_name: 'שקופי שקופוביץ',
          email: 'bla@shakuf.com',
          phone: '054-1234567',
          facebook_profile_url: 'https://www.facebook.com/shakuf',
          city: 'תל אביב',
          available_hours_per_week: 5.5,
          specialties: [{ name: 'bla', category: 'a' }, { name: 'bla bla', category: 'a' }].map(mapSpecialtiesOptions),
          notes: 'woo hoo'
        },
        {
          id: 2,
          full_name: 'mr bloop',
          email: 'bloop@shakuf.com',
          phone: '054-756754',
          facebook_profile_url: 'https://www.facebook.com/bloop',
          city: 'somewhere',
          available_hours_per_week: 2,
          specialties: [],
          notes: 'na na na na na na na\n na na na\n na na na na na'
        }
      ]
    }
  },
  computed: {
    defaultColumns,
    allSpecialties () {
      return this.$store.state.specialties.data
    }
  },
  methods: {
    cloneObject,
    ellipsis15,
    onCloseEditDialog (newValue) {
      this.edit = false
      this.editing = {}

      if (newValue && this.selected.length) {
        this.columns.forEach(c => { this.selected[0][c.name] = newValue[c.name] })
      }
    }
  }
}
</script>
