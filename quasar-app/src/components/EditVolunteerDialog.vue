<template>
  <EditDialog :show="show" :objGetter="getVolunteerToEdit" :label="label" :columns="defaultColumns" @close="onClose">
    <template v-slot:customItems="props">
      <span v-if="props.editing">
        <q-item v-if="columnExists('facebook_profile_url')" key="facebook_profile_url">
          <q-item-section>
            <q-input dense outlined v-model="props.editing.facebook_profile_url" placeholder="Facebook Profile">
              <template v-slot:before>
                <LabelDiv label="Facebook Profile" />
              </template>
            </q-input>
          </q-item-section>
        </q-item>

        <q-item v-if="columnExists('specialties')" key="specialties">
          <q-item-section>
            <SpecialtiesSelectBox v-model="props.editing.specialties"/>
          </q-item-section>
        </q-item>

        <q-item v-if="columnExists('notes')" key="notes">
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
</template>

<script>
import EditDialog from 'components/EditDialog'
import LabelDiv from 'components/LabelDiv'
import SpecialtiesSelectBox from 'components/SpecialtiesSelectBox'

import defaultColumns from '../utils/defaultColumns'

export default {
  name: 'EditVolunteerDialog',

  components: {
    EditDialog,
    LabelDiv,
    SpecialtiesSelectBox
  },

  props: {
    show: {
      type: Boolean,
      default: false
    },

    editVolunteerId: {
      type: Number,
      default: -1
    },

    columns: {
      type: Array,
      required: true
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
    onClose (event) {
      this.$emit('close', event)
    }
  }
}
</script>
