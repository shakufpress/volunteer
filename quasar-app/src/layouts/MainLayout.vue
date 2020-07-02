<template>
  <q-layout view="lHh lpR fFf">

    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          <q-avatar square size="md">
            <img src="statics/Shakuf-Logo-Main-Transparent-White-Website.png">
          </q-avatar>
          Shakuf Volunteers
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered content-class="bg-grey-1">
      <q-card>
        <q-card-section class="items-center">
          <span class="q-ml-sm">Hello {{ loggedInUser.full_name }}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat v-if="!isAdmin" label="Update" color="primary" @click="updateVolunteer = true" />
          <q-btn flat label="Logout" color="primary" to="/" @click="onLogout" />
        </q-card-actions>
      </q-card>

      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Menu
        </q-item-label>
        <q-item
          clickable
          v-ripple
          v-for="menuItem in displayMenu"
          v-bind:key="menuItem.link"
          v-bind="menuItem"
          :to="menuItem.link"
          exact>
          <q-item-section avatar>
            <q-icon :name="menuItem.icon" />
          </q-item-section>
          <q-item-section>
            {{ menuItem.title }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <EditVolunteerDialog v-if="!isAdmin" :show="updateVolunteer" :editVolunteerId="loggedInUser.id" label="Update User Details" :columns="volunteerBasicColumns" @close="onCloseEditDialog" />

    <q-dialog v-model="showError" persistent>
      <q-card>
        <q-card-section class="items-center">
          <q-avatar icon="error" color="primary" text-color="white" />
          <span class="q-ml-sm">{{ errorText }}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup @click="showError = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-layout>
</template>

<script>
import EditVolunteerDialog from 'components/EditVolunteerDialog'

import auth from '../utils/auth'
import volunteerBasicColumns from '../utils/volunteerBasicColumns'

export default {
  async beforeCreate () {
    const user = await auth(this.$store)
    if (!user?.id) {
      this.$router.replace('/')
    }
  },

  components: {
    EditVolunteerDialog
  },

  data () {
    return {
      leftDrawerOpen: false,
      updateVolunteer: false,
      showError: false,
      errorText: '',
      volunteerBasicColumns,
      // TODO: should we get the menu items from the server according to login permissions (admin / volunteer)
      menuItems: [
        {
          title: 'Admin Volunteers Dashbaord',
          icon: 'people',
          link: '/admin_volunteers_dashboard',
          displayToRole: 'admin'
        },
        {
          title: 'Admin Tasks Dashbaord',
          icon: 'assignment',
          link: '/tasks_dashboard',
          displayToRole: 'admin'
        },
        {
          title: 'Tasks Dashbaord',
          icon: 'assignment_turned_in',
          link: '/tasks_dashboard',
          displayToRole: 'volunteer'
        },
        {
          title: 'About',
          icon: 'help',
          link: '/about',
          displayToRole: 'all'
        }
      ]
    }
  },

  computed: {
    displayMenu () {
      return this.menuItems.filter(menuItem => menuItem.displayToRole === this.userRole || menuItem.displayToRole === 'all')
    },
    loggedInUser () {
      return this.$store.state.user
    },
    userRole () {
      return this.loggedInUser.role
    },
    isAdmin () {
      return this.userRole === 'admin'
    }
  },

  methods: {
    async onLogout () {
      await this.$store.dispatch('user/logout')
    },
    async onCloseEditDialog (newValue) {
      if (newValue) {
        try {
          await this.$store.dispatch('volunteers/update', newValue)
          await this.$store.dispatch('user/loginVolunteer', newValue)
        } catch (ex) {
          this.errorText = ex.message
          this.showError = true
        }
      }
      this.updateVolunteer = false
    }
  }
}
</script>

<style lang="sass">
.sticky-header-table
  /* height or max-height is important */
  height: 80vh

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #FFFFFF

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
