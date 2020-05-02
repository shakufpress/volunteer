<template>
  <q-badge :color="color" v-if="url" class="badge-link">
    <a :href="url" target="_blank">
      {{ label }}
    </a>
  </q-badge>
</template>

<script>
export default {
  name: 'BadgeLink',
  props: {
    color: {
      type: String,
      default: 'blue'
    },

    url: {
      type: String,
      default: ''
    },

    label: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="sass">
.badge-link
  a:link, a:visited, a:hover, a:active
    color: white
</style>
