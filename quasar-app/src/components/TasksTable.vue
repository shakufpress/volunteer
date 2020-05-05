<template>
  <div class="q-pa-md">
    <q-table
      title="Tasks"
      :data="data"
      :columns="defaultColumns"
      row-key="id"
      :dense="$q.screen.lt.md"
      :grid="$q.screen.xs || !isAdmin"
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
              <q-checkbox v-if="isAdmin" dense v-model="props.selected" :label="props.row.title" />
              <span v-if="!isAdmin">
                <LabelDiv :label="props.row.title" width="270px" xsWidth="270px" />
                <q-btn color="primary" label="Details" @click="onDetailsClick(props.row)" />
              </span>
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

    <q-btn v-if="isAdmin" class="q-ma-md" color="primary" :disable="!selected.length" label="Edit" @click="edit = true; editing = cloneObject(selected[0])" />

    <q-btn v-if="isAdmin" class="q-ma-md" color="primary" label="New Task" @click="newTask = true; editing = {}" />

    <q-btn v-if="isAdmin" class="q-ma-md" color="primary" :disable="!selected.length" label="Details" @click="onDetailsClick(selected[0])" />

    <EditDialog :show="edit || newTask || details" :editing="editing" :label="edit ? 'Edit Task' : newTask ? 'New Task' : 'Task Details'" :columns="columns" @close="onCloseNewEditDialog" :readonly="details" :labelCancel="details ? 'Close' : 'Cancel'">
      <template v-slot:customItems>
        <span v-if="editing">
          <q-item>
            <q-item-section>
              <q-input dense outlined autogrow :readonly="details" v-model="editing.description">
                <template v-slot:before>
                  <LabelDiv label="Description" />
                </template>
              </q-input>
            </q-item-section>
          </q-item>
        </span>
      </template>

      <template v-slot:buttons v-if="details">
        <q-btn v-if="!isAdmin" class="q-ma-md" color="primary" label="Join" @click="join = true" />
      </template>
    </EditDialog>

    <q-dialog v-model="join" persistent>
      <q-card>
        <q-card-section class="items-center">
          <q-avatar icon="done" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to join this task?</span>
          <br/>
          <span v-if="editing">{{ editing.title }}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Join" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import cloneObject from '../utils/cloneObject'
import defaultColumns from '../utils/defaultColumns'

import EditDialog from 'components/EditDialog'
import LabelDiv from 'components/LabelDiv'

export default {
  name: 'TasksTable',
  props: {
  },

  components: {
    EditDialog,
    LabelDiv
  },

  data () {
    return {
      selected: [],
      filter: '',
      edit: false,
      newTask: false,
      details: false,
      join: false,
      editing: {},
      pagination: {
        rowsPerPage: 25
      },
      columns: [
        { name: 'managerId', required: true, label: 'Manager', align: 'left', field: 'managerId', sortable: true },
        { name: 'title', required: true, label: 'Task Title', align: 'left', field: 'title', sortable: true },
        { name: 'estimation', required: true, label: 'Estimation', align: 'left', field: 'estimation', sortable: true },
        { name: 'description', required: true, label: 'Description', align: 'left', field: 'description', sortable: true, hasCustomStyle: true },
        { name: 'phone', required: true, label: 'Phone', align: 'left', field: 'phone', sortable: true },
        { name: 'email', required: true, label: 'Email', align: 'left', field: 'email', sortable: true },
        { name: 'wanted_volunteers', required: true, label: 'Wanted Volunteers', align: 'left', field: 'wanted_volunteers', sortable: true },
        { name: 'status', required: true, label: 'Status', align: 'left', field: 'status', sortable: true }
      ],
      data: [
        {
          id: 1,
          managerId: 1,
          title: 'task 1',
          estimation: 5.2,
          description: 'bla bla bla',
          phone: '054-26543656',
          email: 'shakuf@shakuf.com',
          wanted_volunteers: 5,
          status: 0
        },
        {
          id: 2,
          managerId: 1,
          title: 'best task ever',
          estimation: 15,
          description: 'wow this \nis amazing',
          phone: '054-7674574567',
          email: 'shakuf@shakuf.com',
          wanted_volunteers: 2,
          status: 1
        }
      ]
    }
  },

  computed: {
    defaultColumns,
    userRole () {
      return this.$store.state.user.role
    },
    isAdmin () {
      return this.userRole === 'admin'
    }
  },

  methods: {
    cloneObject,
    onCloseNewEditDialog (newValue) {
      if (this.edit) {
        if (newValue && this.selected.length) {
          this.columns.forEach(c => { this.selected[0][c.name] = newValue[c.name] })
        }
      } else if (this.newTask) {
        if (newValue) {
          newValue.id = this.data.length + 1
          this.data.push(newValue)
        }
      }

      this.edit = false
      this.newTask = false
      this.details = false
      this.editing = {}
    },
    onCloseJoinDialog (value) {
      this.join = false
    },
    onDetailsClick (row) {
      this.details = true
      this.editing = row
    }
  }
}
</script>