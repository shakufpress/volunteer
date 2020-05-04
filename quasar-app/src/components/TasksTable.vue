<template>
  <div class="q-pa-md">
    <q-table
      title="Tasks"
      :data="data"
      :columns="columns"
      row-key="id"
      :dense="$q.screen.lt.md"
      :grid="$q.screen.xs || currentUserRole !== 'admin'"
      separator="cell"
      selection="single"
      :selected.sync="selected"
      :filter="filter"
      :pagination.sync="pagination">

      <template v-slot:top>
        <h5 class="q-ma-xs">Tasks</h5>
        <q-space />
        <q-input placeholder="Search" dense outlined class="q-ml-md" debounce="300" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
          <q-card :class="props.selected ? 'bg-grey-2' : ''">
            <q-card-section>
              <q-checkbox dense v-model="props.selected" :label="props.row.task_title" />
            </q-card-section>

            <q-separator inset />

            <q-list dense>
              <q-item v-for="col in defaultColumns" :key="col.name">
                <q-item-section>
                  <q-item-label caption>{{ col.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label>{{ props.row[col.name] }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </template>

    </q-table>

    <q-btn class="q-ma-md" color="primary" :disable="!selected.length" label="Edit" @click="edit = true; editing = cloneObject(selected[0])" />

    <q-btn class="q-ma-md" color="primary" :disable="!selected.length" label="New Task" @click="newTask = true" />

    <q-btn class="q-ma-md" color="primary" :disable="!selected.length" label="Join" @click="join = true" />

    <EditDialog :show="edit" :editing="editing" label="Edit Task" :columns="columns" @close="onCloseEditDialog">
      <template v-slot:customItems>
        <span v-if="editing">

        </span>
      </template>
    </EditDialog>
  </div>
</template>

<script>
import defaultColumns from '../utils/defaultColumns'

import EditDialog from 'components/EditDialog'

export default {
  name: 'TasksTable',
  props: {
    currentUserRole: {
      type: String,
      required: true
    }
  },

  components: {
    EditDialog
  },

  data () {
    return {
      selected: [],
      filter: '',
      edit: false,
      newTask: false,
      join: false,
      editing: {},
      pagination: {
        rowsPerPage: 25
      },
      columns: [
        { name: 'task_title', required: true, label: 'Task Title', align: 'left', field: 'task_title', sortable: true }
      ],
      data: [
        {
          id: 1,
          task_title: 'task 1'
        },
        {
          id: 2,
          task_title: 'best task ever'
        }
      ]
    }
  },

  computed: {
    defaultColumns
  },

  methods: {
    onCloseEditDialog (newValue) {}
  }
}
</script>
