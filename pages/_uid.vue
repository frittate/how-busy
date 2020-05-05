<template>
  <h1>
    {{ this.$route.params.uid }} {{ count }}
  </h1>
</template>

<script>
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
  }
}
</script>
