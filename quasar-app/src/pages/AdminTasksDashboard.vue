<template>
  <q-page>
    <TasksTable />
  </q-page>
</template>

<script>
import TasksTable from 'components/TasksTable'

export default {
  name: 'PageAdminTasksDashboard',

  components: {
    TasksTable
  }
}
</script>
