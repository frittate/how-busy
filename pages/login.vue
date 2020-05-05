<template>
  <main class="lg:max-w-6xl pt-40 pt-10 mb-8 mx-auto flex-grow">
    <h2>Login to your Account</h2>
    <p class="text-white mb-10">
      With an account, you can save destinations and later make personalized itineraries.
    </p>
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto max-w-2xl" @submit.prevent>
      <div class="mb-4">
        <label for="login-email" class="block text-gray-700 text-sm font-bold mb-2">email</label>
        <input id="login-email" v-model="account.email" type="text" placeholder="Email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div class="mb-6">
        <label for="login-password" class="block text-gray-700 text-sm font-bold mb-2">password</label>
        <input
          id="login-password"
          v-model="account.password"
          autocomplete="current-password"
          type="password"
          placeholder="*****"
          class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        >
      </div>
      <div v-if="errorMessage.length > 0" class="bg-red-300 text-black py-6 px-6 rounded mx-auto max-w-2xl mb-4">
        {{ errorMessage }}
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-dark001 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click="signIn">
          Sign In
        </button>
        <nuxt-link to="/register" class="inline-block align-baseline font-bold text-sm text-dark001 hover:text-blue-800">
          Create a new account
        </nuxt-link>
      </div>
    </form>
  </main>
</template>

<script>
/* eslint-disable no-console */

export default {
  data () {
    return {
      account: {
        email: '',
        password: ''
      },
      errorMessage: ''
    }
  },
  methods: {
    signIn () {
      this.errorMessage = ''
      this.$store.dispatch('users/login', this.account)
        .then(() => {
          this.$router.push('/admin/profile')
        })
        .catch((error) => {
          this.error = true
          this.errorMessage = error.message
        })
    }
  }
}
</script>
