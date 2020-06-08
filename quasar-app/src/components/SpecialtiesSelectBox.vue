<template>
  <q-select
    v-model="editArr"
    multiple
    :options="allSpecialties"
    option-value = "id"
    @input="update"
  >
    <template v-slot:before>
      <LabelDiv :label="label" />
    </template>
  </q-select>
</template>

<script>
import LabelDiv from 'components/LabelDiv'

import mapSpecialtiesOptions from '../utils/mapSpecialtiesOptions'

export default {
  name: 'SpecialtiesSelectBox',

  async beforeCreate () {
    await this.$store.dispatch('specialties/all')
  },

  components: {
    LabelDiv
  },

  props: {
    label: {
      type: String,
      default: 'Specialties'
    },

    value: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      editArr: []
    }
  },

  created () {
    this.editArr = this.value.slice()
  },

  computed: {
    allSpecialties () {
      return this.$store.state.specialties.data.map(mapSpecialtiesOptions)
    }
  },

  methods: {
    update () {
      this.$emit('input', this.editArr)
    }
  }
}
</script>
