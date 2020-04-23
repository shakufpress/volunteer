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
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          Shakuf Volunteers
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered content-class="bg-grey-1">
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Navigation
        </q-item-label>
        <q-item
          clickable
          v-ripple
          v-for="menuItem in menuItems"
          :key="menuItem.title"
          v-bind="menuItem">
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

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      leftDrawerOpen: false,
      // TODO: should we get the menu items from the server according to login permissions (admin / volunteer)
      menuItems: [
        {
          title: 'Volunteers Dashbaord',
          caption: 'Volunteers Dashbaord',
          icon: 'public',
          link: '/volunteers_dashboard'
        }
      ]
    }
  }
}
</script>
