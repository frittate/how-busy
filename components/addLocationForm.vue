<template>
  <div>
    <form v-if="setup" @submit.prevent>
      <div>
        <label for="newLocation-name" class="block text-gray-700 text-sm font-bold mb-2">Name</label>
        <input
          id="newLocation-name"
          v-model="name"
          type="text"
        >
      </div>
      <div>
        <label for="newLocation-address">
          Addresse (optional)
        </label>
        <input
          id="newLocation-address"
          v-model="address"
          type="text"
        >
      </div>
      <div class="">
        <label for="newLocation-maximum">
          Maximale Anzahl von Kunden (optional)
        </label>
        <input
          id="newLocation-maximum"
          v-model="maximum"
          type="number"
        >
      </div>
      <div class="">
        <label for="newLocation-current-public">
          genaue Kundenzahl öffentlich anzeigen
        </label>
        <input
          id="newLocation-current-public"
          v-model="make_current_number_public"
          type="checkbox"
        >
      </div>
      <div class="">
        <label for="newLocation-maximum-public">
          maximale Kundenzahl öffentlich anzeigen
        </label>
        <input
          id="newLocation-maximum-public"
          v-model="make_maximum_number_public"
          type="checkbox"
        >
      </div>
      <button @click="validateSetup">
        Weiter
      </button>
    </form>
    <form v-else @submit.prevent>
      <p>
        {{ name }}
      </p>
      <p>
        {{ address }}
      </p>
      <p>
        {{ maximum }}
      </p>
      <p>
        {{ code }}
      </p>
      <button @click="confirmSetup">
        Speichern & abschließen
      </button>
    </form>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { getShortId } from '@/services/shortId'

export default {
  data: () => ({
    name: '',
    address: '',
    maximum: 0,
    make_current_number_public: true,
    make_maximum_number_public: true,
    setup: true,
    code: ''
  }),
  methods: {
    validateSetup () {
      this.code = getShortId()
      this.setup = false
    },
    async confirmSetup () {
      // eslint-disable-next-line no-console
      console.log('confirm')
      const newLocation = {
        name: this.name,
        address: this.address,
        maximum: this.maximum,
        make_current_number_public: this.make_current_number_public,
        make_maximum_number_public: this.make_maximum_number_public,
        code: this.code
      }

      const refID = await this.$store.dispatch('location/saveNewLocation', newLocation)
      const writeToUser = this.$store.dispatch('users/saveLocationToUser', await refID)
      console.log('done and done', writeToUser)
    }
  }
}
</script>
