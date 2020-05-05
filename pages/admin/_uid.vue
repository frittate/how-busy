<template>
  <div>
    <h1>
      Test
    </h1>
    <p>
      {{ count }}
    </p>
    <button @click="changeVisitorCount('add')">
      Add
    </button>
    <button @click="changeVisitorCount('subtract')">
      Leave
    </button>
  </div>
</template>

<script>
/* eslint-disable no-console */

export default {
  computed: {
    count () {
      if (this.$store.state.location.location != null) {
        return this.$store.state.location.location.current
      }
      return ''
    }
  },
  created () {
    this.$store.dispatch('location/getLocation', this.$route.params.uid)
  },
  methods: {
    changeVisitorCount (change) {
      this.$store.dispatch('location/changeVisitorCount', change)
    },
    getCurrent () {

    }
  }
}
</script>
