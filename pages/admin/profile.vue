<template>
  <div>
    <h1>Profile</h1>
    <h2>
      User
    </h2>
    <button @click="signOut">
      sign Out
    </button>
    <div v-if="userLocations !== undefined && userLocations.length === 0">
      Du hast noch keine Locations
      <br>
      <add-location-form v-if="showAddLocationForm" />
      <button v-else @click="showAddLocation">
        + neue location anlegen
      </button>
    </div>
    <div v-else>
      Deine Locations:
      <ul>
        <li v-for="location in userLocations" :key="location.id">
          {{ location }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
import { auth } from '@/services/firebase'

import addLocationForm from '@/components/addLocationForm'

export default {
  components: {
    addLocationForm
  },
  data: () => ({
    showAddLocationForm: false
  }),
  computed: {
    ...mapState(['location', 'users']),
    userLocations () {
      return this.users.userLocations
    }
  },
  mounted () {
    if (this.users.userLocations.length === 0) {
      this.$store.dispatch('users/loadLocations')
    }
  },
  methods: {
    async signOut () {
      await auth.signOut()
      await Cookie.remove('bsy__access_token')
      await Cookie.remove('bsy__user_saved')

      location.href = '/'
    },
    showAddLocation () {
      this.showAddLocationForm = true
    }
  }
}
</script>
