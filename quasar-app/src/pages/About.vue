<template>
  <q-page>
    <div class="q-pa-md">
      This is the Shakuf Volunteers management app.
    </div>
    <div class="q-pa-md">
      Developed by <a href="https://github.com/Malkiz">@Malkiz
        <q-avatar square size="xl">
          <img src="https://avatars1.githubusercontent.com/u/3840566" alt="@Malkiz" />
        </q-avatar>
      </a>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageAbout',

  async beforeCreate () {
    const user = this.$store.state.user
    if (!user.id) {
      this.$router.replace('/')
    }
  }
}
</script>
