<template>
  <div class="q-pa-md">
    <q-table
      title="Tasks"
      class="sticky-header-table"
      :data="mappedData"
      :columns="columns"
      row-key="id"
      :dense="$q.screen.lt.md"
      :grid="$q.screen.xs || !isAdmin"
      separator="cell"
      selection="single"
      :selected.sync="selected"
      :filter="filter"
      :filter-method="protectedDeepSearch"
      :pagination.sync="pagination">

      <template v-slot:top>
        <h5 class="q-ma-xs">Tasks</h5>
        <q-btn v-if="isAdmin" class="q-ma-md" color="primary" :disable="!selected.length" label="Edit" :to="'/task/edit/'+(selected[0] || {}).id" />
        <q-btn v-if="isAdmin" class="q-ma-md" color="primary" label="New Task" :to="'/task/new/0'" />
        <q-btn v-if="isAdmin" class="q-ma-md" color="primary" :disable="!selected.length" label="Details" :to="'/task/details/'+(selected[0] || {}).id" />

        <q-space />
        <TagLine />
        <q-space />

        <q-input placeholder="Search" dense outlined class="q-ml-md" debounce="300" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-categories="props">
        <q-td :props="props">
          <SpecialtiesBadgeList :list="props.value" />
        </q-td>
      </template>

      <template v-slot:body-cell-total-volunteers="props">
        <q-td :props="props">
          {{ props.value.length }}
        </q-td>
      </template>

      <template v-slot:body-cell-pending-volunteers="props">
        <q-td :props="props">
          {{ props.value.filter(v => v.statusObj.label === volunteerStatusEnum[0]).length }}
        </q-td>
      </template>

      <template v-slot:body-cell-approved-volunteers="props">
        <q-td :props="props">
          {{ props.value.filter(v => v.statusObj.label === volunteerStatusEnum[1]).length }}
        </q-td>
      </template>

      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
          <q-card :class="props.selected ? 'bg-grey-2' : ''">
            <q-card-section>
              <q-checkbox v-if="isAdmin" dense v-model="props.selected" :label="props.row.title" />
              <span v-if="!isAdmin">
                <q-avatar v-if="isTaskJoined(props.row)" class="q-mr-md" icon="done" color="primary" text-color="white" />
                <LabelDiv :label="props.row.title" width="200px" xsWidth="200px" />
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

              <q-item>
                <q-item-section>
                  <q-item-label caption>Categories</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <SpecialtiesBadgeList :list="props.row.categories" />
                </q-item-section>
              </q-item>
            </q-list>

            <q-card-actions v-if="!isAdmin">
              <span v-if="isTaskJoined(props.row)" style="color:red" class="q-ma-md">Join request status: {{joinStatusStr(props.row)}}</span>
              <q-space />
              <q-btn color="primary" label="Details" :to="'/task/details/'+props.row.id" />
            </q-card-actions>
          </q-card>
        </div>
      </template>

    </q-table>

    <EditDialog :show="!!dialogState" :objGetter="getTaskForDialog" :label="dialogLabel" :columns="editColumns" @close="onCloseNewEditDialog" :readonly="details" :labelCancel="details ? 'Close' : 'Cancel'">
      <template v-slot:customItems="props">
        <span v-if="props.editing">
          <q-item key="statusStr">
            <q-item-section>
              <q-select
                v-model="props.editing.statusObj"
                :options="Object.keys(taskStatusEnum).map(n => ({label: taskStatusEnum[n], value: n}))"
                :readonly="details"
                :disabled="details"
              >
                <template v-slot:before>
                  <LabelDiv label="Status" />
                </template>
              </q-select>
            </q-item-section>
          </q-item>

          <q-item key="categories">
            <q-item-section>
              <SpecialtiesSelectBox v-if="!details" label="Categories" v-model="props.editing.categories"/>
              <SpecialtiesBadgeList v-if="details" label="Categories" :list="props.editing.categories" />
            </q-item-section>
          </q-item>

          <q-item key="description">
            <q-item-section>
              <q-input dense outlined autogrow :readonly="details" :disabled="details" v-model="props.editing.description">
                <template v-slot:before>
                  <LabelDiv label="Description" />
                </template>
              </q-input>
            </q-item-section>
          </q-item>

          <q-item key="volunteers" v-if="!newTask && isAdmin">
            <q-item-section>
              <q-table
                title="Volunteers"
                :data="props.editing.volunteers"
                :columns="volunteersColumns"
                row-key="id"
                dense
                separator="cell"
                :filter="filterVolunteer"
                :filter-method="deepSearch">

                <template v-slot:top>
                  <h5 class="q-ma-xs">Volunteers</h5>
                  <q-space />
                  <span v-if="edit" style="color:red">click on a status to edit</span>
                  <q-space />
                  <q-input placeholder="Search" dense outlined class="q-ml-md" debounce="300" color="primary" v-model="filterVolunteer">
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </template>

                <template v-slot:body-cell-status="props">
                  <q-td :props="props">
                    {{ props.row.statusObj.label }}
                    <q-popup-edit v-if="!details" v-model="props.row.statusObj" buttons persistent title="Edit the Status">
                      <q-select
                        dense
                        v-model="props.row.statusObj"
                        :options="Object.keys(volunteerStatusEnum).map(n => ({label: volunteerStatusEnum[n], value: n}))"
                      />
                    </q-popup-edit>
                  </q-td>
                </template>

              </q-table>
            </q-item-section>
          </q-item>
        </span>
      </template>

      <template v-slot:buttons="props" v-if="details && !isAdmin">
        <q-btn class="q-ma-md" color="primary" label="Join" :disable="!!isTaskJoined(props.editing)" :to="'/task/join/'+props.editing.id" />
        <span v-if="isTaskJoined(props.editing)" style="color:red" class="q-ma-md">Join request status: {{joinStatusStr(props.editing)}}</span>

        <q-dialog v-model="join" persistent>
          <q-card>
            <q-card-section class="items-center">
              <q-avatar icon="done" color="primary" text-color="white" />
              <span class="q-ml-sm">Are you sure you want to join this task?</span>
              <br/>
              <span v-if="props.editing">{{ props.editing.title }}</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="primary" @click="onJoin()" />
              <q-btn flat label="Join" color="primary" @click="onJoin(props.editing)" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </template>

    </EditDialog>
  </div>
</template>

<script>
import cloneObject from '../utils/cloneObject'
import defaultColumns from '../utils/defaultColumns'
import taskStatusEnum from '../utils/taskStatusEnum'
import volunteerStatusEnum from '../utils/volunteerStatusEnum'
import deepSearch from '../utils/deepSearch'

import EditDialog from 'components/EditDialog'
import LabelDiv from 'components/LabelDiv'
import TagLine from 'components/TagLine'
import SpecialtiesBadgeList from 'components/SpecialtiesBadgeList'
import SpecialtiesSelectBox from 'components/SpecialtiesSelectBox'

export default {
  name: 'TasksTable',
  props: {
  },

  components: {
    EditDialog,
    LabelDiv,
    TagLine,
    SpecialtiesBadgeList,
    SpecialtiesSelectBox
  },

  async beforeCreate () {
    await this.$store.dispatch('tasks/all')
    await this.$store.dispatch('specialties/all')
  },

  data () {
    return {
      selected: [],
      filter: '',
      filterVolunteer: '',
      taskStatusEnum,
      volunteerStatusEnum,
      pagination: {
        rowsPerPage: 25
      },
      volunteersColumns: [
        { name: 'full_name', required: true, label: 'Full Name', field: 'full_name', align: 'left', sortable: true },
        { name: 'email', required: true, label: 'Email', field: 'email', align: 'left', sortable: true },
        { name: 'status', required: true, label: 'Status', field: 'status', align: 'left', sortable: true }
      ],
      columns: [
        { name: 'title', required: true, label: 'Task Title', align: 'left', field: 'title', sortable: true },
        { name: 'estimation', required: true, label: 'Estimation', align: 'left', field: 'estimation', sortable: true },
        { name: 'deadline', required: true, label: 'Deadline', align: 'left', field: 'deadline', sortable: true },
        { name: 'description', required: true, label: 'Description', align: 'left', field: 'description', sortable: true, hasCustomStyle: true, hasCustomEdit: true },
        { name: 'manager_name', required: true, label: 'Manager Name', align: 'left', field: 'manager_name', sortable: true },
        { name: 'phone', required: true, label: 'Phone', align: 'left', field: 'phone', sortable: true },
        { name: 'email', required: true, label: 'Email', align: 'left', field: 'email', sortable: true },
        { name: 'wanted_volunteers', required: true, label: 'Wanted Volunteers', align: 'left', field: 'wanted_volunteers', sortable: true },
        { name: 'total-volunteers', label: 'Total Volunteers', align: 'left', field: 'volunteers', sortable: true, hasCustomStyle: true, hasCustomEdit: true },
        { name: 'pending-volunteers', label: 'Pending Volunteers', align: 'left', field: 'volunteers', sortable: true, hasCustomStyle: true, hasCustomEdit: true },
        { name: 'approved-volunteers', label: 'Approved Volunteers', align: 'left', field: 'volunteers', sortable: true, hasCustomStyle: true, hasCustomEdit: true },
        { name: 'categories', label: 'Categories', align: 'left', field: 'categories', sortable: true, hasCustomStyle: true, hasCustomEdit: true },
        { name: 'statusStr', required: true, label: 'Status', align: 'left', field: 'statusStr', sortable: true, hasCustomEdit: true }
      ]
    }
  },

  computed: {
    defaultColumns,
    editColumns () {
      return this.columns.filter(col => !col.hasCustomEdit)
    },
    userRole () {
      return this.$store.state.user.role
    },
    isAdmin () {
      return this.userRole === 'admin'
    },
    tasks () {
      return this.$store.getters['tasks/all']()
    },
    mappedData () {
      const allTasks = this.tasks.map(this.mapRow)
      if (this.isAdmin) {
        return allTasks
      }
      return allTasks.filter(row => Number(row.status) !== 2)
    },
    loggedInVolunteer () {
      return this.$store.state.user
    },
    dialogTaskId () {
      return this.$route.params?.taskId
    },
    dialogState () {
      return this.$route.params?.dialogState
    },
    emptyTask () {
      const t = { volunteers: [] }
      this.columns.forEach(({ field }) => { t[field] = '' })
      t.categories = []
      return t
    },
    dialogLabel () {
      const state = this.dialogState
      switch (state) {
        case 'edit': return 'Edit Task'
        case 'new': return 'New Task'
        case 'details':
        case 'join':
          return 'Task Details'
      }
      return ''
    },
    details () {
      return this.dialogState === 'details' || this.join
    },
    newTask () {
      return this.dialogState === 'new'
    },
    edit () {
      return this.dialogState === 'edit'
    },
    join () {
      return this.dialogState === 'join'
    }
  },

  methods: {
    cloneObject,
    deepSearch,
    protectedDeepSearch (rows, terms, cols, getCellValue) {
      if (this.isAdmin) {
        return this.deepSearch(rows, terms, cols, getCellValue)
      }
      return this.deepSearch(rows.map(r => Object.assign({}, r, { volunteers: [] })), terms, cols, getCellValue)
    },
    mapRow (row) {
      const m = cloneObject(row)
      if (m.status) {
        m.statusStr = taskStatusEnum[m.status]
        m.statusObj = { label: this.taskStatusEnum[m.status], value: m.status }
      }
      m.volunteers = (m.volunteers || []).map(({ id, status, statusId }) => {
        const v = this.$store.getters['volunteers/getId'](id)
        const statusObj = { label: this.volunteerStatusEnum[status], value: status }
        return { ...v, status, statusId, statusObj }
      })
      return m
    },
    getTaskForDialog () {
      const v = this.$store.getters['tasks/getTask'](this.dialogTaskId)
      const ret = v ? cloneObject(v) : this.emptyTask
      return this.mapRow(ret)
    },
    async onCloseNewEditDialog (newValue) {
      this.$router.go(-1)

      if (newValue) {
        if (this.edit) {
          await this.$store.dispatch('tasks/update', newValue)
        } else if (this.newTask) {
          await this.$store.dispatch('tasks/add', newValue)
        }
      }
    },
    async onJoin (task) {
      this.$router.go(-1)
      if (task && task.id) {
        await this.$store.dispatch('tasks/joinVolunteer', { taskId: task.id, volunteer: this.loggedInVolunteer })

        const newTask = this.getTaskForDialog()
        task.volunteers = newTask.volunteers
      }
    },
    taskVolunteerRow (task) {
      return task.volunteers.filter(({ id }) => id === this.loggedInVolunteer.id)
    },
    isTaskJoined (task) {
      return this.taskVolunteerRow(task).length
    },
    joinStatusStr (task) {
      return this.volunteerStatusEnum[this.taskVolunteerRow(task)[0].status]
    }
  }
}
</script>
