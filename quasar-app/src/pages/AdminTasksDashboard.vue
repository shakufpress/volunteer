<template>
  <q-page>
    <TasksTable currentUserRole="admin"/>
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
