<template>
  <div class="container">
    <div v-if="loading">
      Loading
    </div>
    <div v-else>
      <logo />
      <h1 class="title">
        {{ customer.name }}
      </h1>
      <h2 class="subtitle">
        HowBusy will track the number of customers in a business
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
        <nuxt-link to="/login">
          Login
        </nuxt-link>
        <nuxt-link to="/register">
          Register
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import { firestore } from '@/services/firebase'

export default {
  components: {
    Logo
  },
  data () {
    return {
      customer: null,
      loading: true
    }
  },
  mounted () {
    firestore.collection('customers').onSnapshot((snapshot) => {
      const customers = []
      snapshot.forEach((doc) => {
        customers.push({
          id: doc.id,
          name: doc.data().name,
          locations: doc.data().locations,
          premium: doc.data().premium
        })
      })
      this.customer = customers[0]
      this.loading = false
    })
  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
