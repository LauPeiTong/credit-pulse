<template lang="pug">
.dashboard-page.pa-0.ma-0.fill-width
  upper-title.ma-0(:title="'Customer Insights'" :icon="'bell'" :rightIconColor="$vuetify.theme.themes.light.primary")
  v-row.ma-0.pt-14.fill-width.px-2
    v-col(cols="12")
      borrower-list-vue
</template>

<script>
import { mapGetters } from 'vuex'
import BorrowerListVue from '~/components/borrowerList/BorrowerList.vue'

export default {
  name: 'BorrowerPage',
  components: {
    BorrowerListVue
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
.shadow {
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.12) !important;
}

</style>
