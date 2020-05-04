<template>
  <q-page>
    <TasksTable currentUserRole="volunteer"/>
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
