<template lang="pug">
.dashboard-page.pa-0.ma-0.fill-width
  upper-title.ma-0(:title="'Customer Insights'" :icon="'bell'" :rightIconColor="$vuetify.theme.themes.light.primary")
  v-row.ma-0.pt-8.fill-width
    v-col(cols="8")

    v-col(cols="4")

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BorrowerDetailsPage',
  components: {
  },
  layout: 'default',
  data () {
    return {
      // search: null
    }
  },
  computed: {
    ...mapGetters({
    })
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
