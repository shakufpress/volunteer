<template>
  <q-table
    :title="title"
    :data="data"
    :columns="columns"
    row-key="id"
    :dense="$q.screen.lt.md"
    :grid="$q.screen.xs"
    separator="cell"
    selection="single"
    :selected.sync="selectedSync"
    :filter="filter">

    <template v-slot:top>
      <h5 class="q-ma-xs">{{ title }}</h5>
      <q-space />
      <q-input placeholder="Search" dense outlined class="q-ml-md" debounce="300" color="primary" v-model="filter">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>

    <!-- <template v-slot:body-cell-facebook_profile_url="props">
      <slot name="body-cell-facebook_profile_url">
        <q-td :props="props">
          asdf
        </q-td>
      </slot>
    </template> -->

    <template v-for="col in columns" v-bind="attribute(`v-slot:body-cell-${col.name}`, 'props')">
      <q-td v-bind:key="col.name" :props="props">
        asdf
      </q-td>
      <!-- <slot :name="`body-cell-${col.name}`">
      </slot> -->
    </template>

    <!-- <template v-for="col in columns" v-bind="attribute(`v-slot:body-cell-${col.name}`, 'props')">
      <slot :name="`v-slot:body-cell-${col.name}`">
        <q-td v-bind:key="col.name">
          {{ props.row[col.name] }}
        </q-td>
      </slot>
    </template> -->

    <!--
    <template v-slot:item="props">
      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
        <q-card :class="props.selected ? 'bg-grey-2' : ''">
          <q-card-section>
            <q-checkbox dense v-model="props.selected" :label="props.row.full_name" />
          </q-card-section>

          <q-separator inset />

          <q-list dense>
            <q-item v-for="col in columns" :key="col.name">
              <q-item-section>
                <q-item-label caption>{{ col.label }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <slot :name="`v-slot:item-${col.name}`">
                  <q-item-label>{{ props.row[col.name] }}</q-item-label>
                </slot>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </template> -->

  </q-table>
</template>

<script>
export default {
  name: 'ResponsiveDataTable',
  props: {
    title: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    selectedSync: {
      type: Array,
      required: true
    },
    filter: {
      type: String,
      required: true
    }
  },
  methods: {
    attribute (name, val) {
      return {
        [name]: val
      }
    }
  }
}
</script>
