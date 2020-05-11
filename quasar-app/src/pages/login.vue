<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <div id="particles-js"></div>
        <q-card class="login-form" v-bind:style="$q.platform.is.mobile?{'width': '80%'}:{'width':'30%'}">
          <q-img src="/statics/images/pharmacy.jpg"></q-img>
          <q-card-section>
            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">
                Log in to Shakuf Volunteers
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="email"
                label="Email"
                lazy-rules
              />

              <div>
                <q-btn label="Login" type="button" color="primary" @click="onLogin"/>
              </div>
            </q-form>
          </q-card-section>
        </q-card>

        <q-dialog v-model="register" persistent>
          <q-card>
            <q-card-section class="items-center">
              <q-avatar icon="error" color="primary" text-color="white" />
              <span class="q-ml-sm">Your email address is not registered. Please register!</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Close" color="primary" v-close-popup @click="register = false" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script type="text/javascript">
</script>
<script>
export default {
  data() {
    return {
      email: '',
      register: false
    }
  },

  computed: {
    volunteers () {
      return this.$store.state.volunteers.data
    }
  },

  methods: {
    onLogin (event) {
      const volunteer = this.volunteers.filter(v => v.email === this.email)[0]
      if (volunteer) {
        this.$store.commit('user/updateRole', 'volunteer')
        this.$store.commit('user/loginVolunteer', volunteer)
        this.$router.push('tasks_dashboard')
      } else {
        this.register = true
      }
    }
  }
}
</script>

<style>
  #particles-js {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(145deg, rgb(74, 94, 137) 15%, #FFFFFF 70%);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
  }

  .login-form {
    position: absolute;
  }
</style>
