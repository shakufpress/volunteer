<template>
  <q-page>
    <TasksTable />
  </q-page>
</template>

<script>
import TasksTable from 'components/TasksTable'

export default {
  name: 'PageTasksDashboard',

  async beforeCreate () {
    const user = this.$store.state.user
    if (!user.id) {
      this.$router.replace('/')
    }
  },

  components: {
    TasksTable
  }
}
</script>
