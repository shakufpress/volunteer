<template>
  <div :style="divStyles">{{ label }}</div>
</template>

<script>
export default {
  name: 'LabelDiv',
  props: {
    width: {
      type: String,
      default: '250px'
    },

    xsWidth: {
      type: String,
      default: '100px'
    },

    fontSize: {
      type: String,
      default: '16px'
    },

    label: {
      type: String,
      required: true
    }
  },
  computed: {
    divStyles () {
      return {
        width: this.$q.screen.xs ? this.xsWidth : this.width,
        'max-width': this.$q.screen.xs ? this.xsWidth : this.width,
        display: 'inline-block',
        fontSize: this.fontSize
      }
    }
  }
}
</script>
