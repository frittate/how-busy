<template>
  <main class="lg:max-w-6xl pt-40 pt-10 mb-8 mx-auto flex-grow">
    <h2>Register a new account</h2>
    <form v-if="!confirmation" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto max-w-2xl">
      <div class="mb-4">
        <label for="login-email" class="block text-gray-700 text-sm font-bold mb-2">email</label>
        <input
          id="login-email"
          v-model="account.email"
          type="text"
          placeholder="Email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          autocomplete="email"
        >
      </div>
      <div class="mb-4">
        <label for="login-password" class="block text-gray-700 text-sm font-bold mb-2">password</label>
        <input
          id="login-password"
          v-model="account.password"
          type="password"
          placeholder="*****"
          class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          autocomplete="current-password"
        >
      </div>
      <div class="mb-6">
        <label for="login-password-confirm" class="block text-gray-700 text-sm font-bold mb-2">repeat password</label>
        <input
          id="login-password-confirm"
          v-model="account.passwordConfirm"
          type="password"
          placeholder="*****"
          class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          autocomplete="current-password"
        >
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-dark001 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click="registerNew">
          Register now
        </button>
        <nuxt-link to="/login" class="inline-block align-baseline font-bold text-sm text-dark001 hover:text-blue-800">
          Go to login
        </nuxt-link>
      </div>
    </form>
    <div v-else class="bg-white rounded px-8 pt-6 pb-8 mx-auto max-w-2xl">
      <h3 class="text-center">
        Thanks for signing up! <br>You can now go to the
        <nuxt-link to="/login" class="underline">
          login page
        </nuxt-link>!
      </h3>
    </div>
    <div v-if="errorMessage.length > 0" class="bg-red-300 text-black py-6 px-6 rounded mx-auto max-w-2xl mb-4">
      {{ errorMessage }}
    </div>
  </main>
</template>

<script>
export default {
  data () {
    return {
      account: {
        email: '',
        password: '',
        passwordConfirm: ''
      },
      confirmation: false,
      errorMessage: ''
    }
  },
  methods: {
    registerNew () {
      this.errorMessage = ''
      this.$store.dispatch('users/register', this.account)
        .then(() => {
          this.confirmation = true
        })
        .catch((error) => {
          this.errorMessage = error.message
        })
    }
  }
}
</script>
