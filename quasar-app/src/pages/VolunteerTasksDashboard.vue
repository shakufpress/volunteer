<template>
  <q-page>
    <TasksTable />
  </q-page>
</template>

<script>
import TasksTable from 'components/TasksTable'

export default {
  name: 'PageVolunteerTasksDashboard',

  components: {
    TasksTable
  }
}
</script>
