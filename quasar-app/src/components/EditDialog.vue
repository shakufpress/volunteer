<template>
  <q-dialog v-model="show">
    <q-card v-if="editing">
      <q-card-section>
        {{ label }}
      </q-card-section>

      <q-separator inset />

      <q-list dense>
        <q-item v-for="col in columns" :key="col.name">
          <q-item-section>
            <q-item-label caption>{{ col.label }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-input outlined v-model="editing[col.name]" :placeholder="col.label" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'EditDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    },

    editing: {
      type: Object,
      required: true
    },

    label: {
      type: String,
      required: true
    },

    columns: {
      type: Array,
      required: true
    }
  }
}
</script>
