<template>
  <span>
    <LabelDiv v-if="!!label" :label="label" />
    <q-badge :color="color" v-for="sp in list" v-bind:key="sp.category + sp.name">
      {{sp.category}}: {{sp.name}}
    </q-badge>
  </span>
</template>

<script>
import LabelDiv from 'components/LabelDiv'

export default {
  name: 'SpecialtiesBadgeList',

  components: {
    LabelDiv
  },

  props: {
    color: {
      type: String,
      default: 'green'
    },

    label: {
      type: String,
      default: ''
    },

    list: {
      type: Array,
      required: true
    }
  }
}
</script>
