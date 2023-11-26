<template lang="pug">
.dashboard-page.pa-0.ma-0.fill-width
  upper-title.ma-0(:title="'Customer Insights'" :icon="'bell'" :rightIconColor="$vuetify.theme.themes.light.primary")
  v-row.ma-0.pt-14.fill-width.px-2
    v-col(cols="12")
      .d-flex.align-center(id="top")
        v-btn.shadow.white(
          text
          icon
          color="primary"
          @click="goToList"
        )
          v-icon mdi-chevron-left
        .d-grid.pl-2
          p.mb-0 Borrower Information
          v-breadcrumbs.pa-0(:items="breadcrumbs")
    v-col(cols="8")
      user-profile-vue
      user-data-vue.pt-4
    v-col(cols="4")
      loan-detail
</template>

<script>
import { mapGetters } from 'vuex'
import UserProfileVue from '~/components/borrower/UserProfile.vue'
import LoanDetail from '~/components/loan/LoanDetail.vue'
import UserDataVue from '~/components/borrower/UserData.vue'

export default {
  name: 'BorrowerIdPage',
  components: {
    UserProfileVue,
    UserDataVue,
    LoanDetail
  },
  layout: 'default',
  data () {
    return {
      // search: null
      breadcrumbs: [
        {
          text: 'Borrower List',
          disabled: false,
          href: 'borrower_list'
        },
        {
          text: 'Borrower Information',
          disabled: true,
          href: 'borrower_details'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
    })
  },
  methods: {
    goToList () {
      this.$router.push('/borrower')
    }
  }
}
</script>

<style scoped>
.shadow {
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.12) !important;
}
</style>
