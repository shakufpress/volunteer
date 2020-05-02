<template>
  <span>
    <q-badge :color="color" v-for="sp in list" v-bind:key="sp.category + sp.name">
      {{sp.category}}: {{sp.name}}
    </q-badge>
  </span>
</template>

<script>
export default {
  name: 'SpecialtiesBadgeList',
  props: {
    color: {
      type: String,
      default: 'green'
    },

    list: {
      type: Array,
      required: true
    }
  }
}
</script>
