<template>
  <q-dialog persistent v-model="isShow" full-width>
    <q-card v-if="editing">
      <q-card-section>
        {{ label }}
      </q-card-section>

      <q-separator inset />

      <q-list dense>
        <q-item v-for="col in columns" :key="col.name">
          <q-item-section>
            <q-input dense outlined :readonly="readonly || col.readonly" v-model="editing[col.name]" :placeholder="col.label">
              <template v-slot:before>
                <LabelDiv :label="col.label" />
              </template>
            </q-input>
          </q-item-section>
        </q-item>

        <slot name="customItems" v-bind:editing="editing">
        </slot>
      </q-list>

      <q-btn v-if="!readonly" class="q-ma-md" color="primary" label="Save" v-close-popup @click="onSave" />
      <slot name="buttons" v-bind:editing="editing">
      </slot>
      <q-btn class="q-ma-md" color="primary" :label="labelCancel" v-close-popup @click="onClose" />
    </q-card>
  </q-dialog>
</template>

<script>
import cloneObject from '../utils/cloneObject'

import LabelDiv from './LabelDiv'

export default {
  name: 'EditDialog',

  components: {
    LabelDiv
  },

  props: {
    show: {
      type: Boolean,
      default: false
    },

    objGetter: {
      type: Function,
      required: true
    },

    label: {
      type: String,
      required: true
    },

    columns: {
      type: Array,
      required: true
    },

    readonly: {
      type: Boolean,
      default: false
    },

    labelCancel: {
      type: String,
      default: 'Cancel'
    }
  },

  data () {
    return {
      editing: null,
      isShow: false
    }
  },

  watch: {
    show (newVal, oldVal) {
      this.isShow = newVal
      if (newVal) {
        this.editing = cloneObject(this.objGetter())
      }
    }
  },

  methods: {
    onClose (event) {
      this.$emit('close')
    },
    onSave (event) {
      this.$emit('close', this.editing)
    }
  }
}
</script>
