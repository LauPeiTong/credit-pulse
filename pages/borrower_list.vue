<template lang="pug">
.dashboard-page.pa-0.ma-0.fill-width
  upper-title.ma-0(:title="'Customer Insights'" :icon="'bell'" :rightIconColor="$vuetify.theme.themes.light.primary")
  v-row.ma-0.pt-8.fill-width
    v-col(cols="12")
    loan-detail
</template>

<script>
import { mapGetters } from 'vuex'
import LoanDetail from '~/components/loan/LoanDetail.vue'

export default {
  name: 'BorrowerListPage',
  components: {
    LoanDetail
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
