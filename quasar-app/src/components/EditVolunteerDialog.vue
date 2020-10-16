<template>
  <EditDialog :show="show" :objGetter="getVolunteerToEdit" :label="label" :columns="defaultColumns" @close="onClose" :readonly="readonly" >
    <template v-slot:customItems="props">
      <span v-if="props.editing">
        <q-item v-if="columnExists('facebook_profile_url')" key="facebook_profile_url">
          <q-item-section>
            <q-input dense outlined v-model="props.editing.facebook_profile_url" placeholder="Facebook Profile" :readonly="readonly || getColumn('facebook_profile_url').readonly">
              <template v-slot:before>
                <LabelDiv label="Facebook Profile" />
              </template>
            </q-input>
          </q-item-section>
        </q-item>

        <q-item v-if="columnExists('specialties')" key="specialties">
          <q-item-section>
            <SpecialtiesBadgeList label="Specialties" :list="props.editing.specialties" v-if="readonly || getColumn('specialties').readonly" />
            <SpecialtiesSelectBox v-model="props.editing.specialties" v-else/>
          </q-item-section>
        </q-item>

        <q-item v-if="columnExists('notes')" key="notes">
          <q-item-section>
            <q-input dense outlined autogrow v-model="props.editing.notes" placeholder="Notes" :readonly="readonly || getColumn('notes').readonly">
              <template v-slot:before>
                <LabelDiv label="Notes" />
              </template>
            </q-input>
          </q-item-section>
        </q-item>
      </span>
    </template>
  </EditDialog>
</template>

<script>
import EditDialog from 'components/EditDialog'
import LabelDiv from 'components/LabelDiv'
import SpecialtiesSelectBox from 'components/SpecialtiesSelectBox'
import SpecialtiesBadgeList from 'components/SpecialtiesBadgeList'

import defaultColumns from '../utils/defaultColumns'

export default {
  name: 'EditVolunteerDialog',

  components: {
    EditDialog,
    LabelDiv,
    SpecialtiesSelectBox,
    SpecialtiesBadgeList
  },

  props: {
    show: {
      type: Boolean,
      default: false
    },

    editVolunteerId: {
      type: String,
      default: 'noId'
    },

    columns: {
      type: Array,
      required: true
    },

    readonly: {
      type: Boolean,
      default: false
    },

    label: {
      type: String,
      default: 'Edit Volunteer'
    }
  },

  computed: {
    defaultColumns
  },

  methods: {
    getVolunteerToEdit () {
      const v = this.$store.getters['volunteers/getId'](this.editVolunteerId)
      return v || { specialties: [] }
    },
    columnExists (name) {
      return this.columns.filter(c => c.name === name).length > 0
    },
    getColumn (name) {
      return this.columns.filter(c => c.name === name)[0]
    },
    onClose (event) {
      this.$emit('close', event)
    }
  }
}
</script>
