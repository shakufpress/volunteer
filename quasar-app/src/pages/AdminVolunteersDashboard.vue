<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        title="Volunteers"
        :data="data"
        :columns="columns"
        row-key="name"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageAdminVolunteersDashboard',
  data () {
    return {
      columns: [
        { name: 'fullname', required: true, label: 'Full Name', align: 'right', field: 'fullname', sortable: true },
        { name: 'email', align: 'center', label: 'Email', field: 'email', sortable: true },
        { name: 'telephone', label: 'Telephone', align: 'left', field: 'telephone', sortable: true },
        { name: 'facebook_profile', label: 'Facebook Profile', align: 'left', field: 'facebook_profile', sortable: true },
        { name: 'city_residence', label: 'City of Residence', field: 'city_residence', sortable: true },
        { name: 'weekly_free_hours', label: 'Weekly Free Hours', align: 'left', field: 'weekly_free_hours', sortable: true },
        { name: 'interests_and_expertise', label: 'Interests / Expertise', align: 'left', field: 'interests_and_expertise', sortable: true },
        { name: 'notes', label: 'Notes', align: 'left', field: 'notes', sortable: true },
        { name: 'newsletter', label: 'Newsletter', align: 'left', field: 'newsletter', sortable: true },
        { name: 'sayeret', label: 'Sayeret', align: 'left', field: 'sayeret', sortable: true }
      ],
      data: [
        {
          fullname: 'שקופי שקופוביץ',
          email: 'bla@shakuf.com',
          telephone: '054-1234567',
          facebook_profile: 'www.facebook.com/shakuf',
          city_residence: 'תל אביב',
          weekly_free_hours: 5.5,
          interests_and_expertise: ['bla', 'bla bla'],
          notes: 'woo hoo',
          newsletter: true,
          sayeret: false
        }
      ]
    }
  }
}
</script>
