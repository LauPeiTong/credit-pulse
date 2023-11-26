<template lang="pug">
.user-data
  v-tabs(
    v-model="tab"
    align-with-title
  )
    v-tabs-slider(color="primary")
    v-tab.rounded-t-xl.text-capitalize(
      v-for="t in tabs"
      :key="t"
    ) {{ t }}

  v-card.fill-height.shadow.pa-4.rounded-b-lg.rounded-tr-lg(elevation="0")
    v-tabs-items(v-model="tab")
      v-tab-item
        credit-score-vue
      v-tab-item
        financial-info-vue
      v-tab-item
        employment-status-vue
      v-tab-item
        non-bank-data-vue

</template>

<script>
import { mapGetters } from 'vuex'
import CreditScoreVue from './CreditScore.vue'
import EmploymentStatusVue from './EmploymentStatus.vue'
import FinancialInfoVue from './FinancialInfo.vue'
import NonBankDataVue from './NonBankData.vue'

export default {
  name: 'UserProfile',
  components: {
    CreditScoreVue,
    EmploymentStatusVue,
    FinancialInfoVue,
    NonBankDataVue
  },
  data () {
    return {
      customer: null,
      tab: null,
      tabs: ['Credit Score', 'Financial Information', 'Employment Status', 'Other Non-Bank Data']
    }
  },
  computed: {
    ...mapGetters({
      getCustomerById: 'customer/getCustomerById'
    })
  },
  watch: {
    $route (to, from) {
      this.customer = to.params.customer
    }
  },
  created () {
    // console.log(this.$route.params)
    this.customer = this.getCustomerById(this.$route.params.id)
  }
}
</script>

<style scoped>
:deep(.v-tabs .v-tabs-bar) {
  background-color: transparent;
}

.v-tab {
  margin: 0 !important;
  font-size: 12px;
}

.v-tab:not(.v-tab--active) {
  border: solid 4px white;
  border-bottom-style: none;
  background-color: #F4F6FB;
  color: #002147;
  padding: 0px 12px;
  margin-top: 8px !important;
}

.v-tab--active {
  background-color: #002147;
  color: white;
  padding: 0px 16px;
  margin-top: 4px !important;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.30) !important;
}
</style>
