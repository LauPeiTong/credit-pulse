<template lang="pug">
.financial-info
  p.font-weight-medium Financial Information
  v-row
    template(v-for="item in financialData")
      v-col.pb-1(:cols="item.col")
        v-card.px-1.py-2.d-flex.rounded-lg(outlined)
          v-icon.primary--text.pa-2(small) {{ item.icon }}
          .d-grid.pl-1
            .caption.font-weight-light.darkGrey--text {{ item.title }}
            p.mb-0.mt-n1.body-2 {{ item.value }}

    v-col(cols="6")
      v-card.rounded-lg(outlined)
        v-card.px-1.py-2.d-flex.rounded-lg.background.border(elevation="0" @click="")
          v-icon.primary--text.pa-2(small) mdi-file-download
          .d-grid.pl-1
            p.mb-1.font-weight-medium.primary--textbody-2.text-decoration-underline Bank Statement
            p.mb-0.mt-n1.body-2.darkGrey--text Download Here

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'FinancialInfo',
  components: {
  },
  data () {
    return {
      customer: null,
      financialData: null
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
    if (this.customer.name === 'Khairul bin Ahmad') {
      this.financialData = [
        {
          col: 6,
          icon: 'mdi-hand-coin',
          title: 'Annual Salary',
          value: 'MYR 36,000'
        },
        {
          col: 6,
          icon: 'mdi-file',
          title: 'Debt-To-Income Ratio',
          value: '42%'
        }
      ]
    } else {
      this.financialData = [
        {
          col: 6,
          icon: 'mdi-hand-coin',
          title: 'Annual Salary',
          value: 'MYR 64,321'
        },
        {
          col: 6,
          icon: 'mdi-file',
          title: 'Debt-To-Income Ratio',
          value: '18%'
        }
      ]
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
