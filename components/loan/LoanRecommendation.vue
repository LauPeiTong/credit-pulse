<template lang="pug">
  v-row(justify="space-around")
      v-col(cols="auto")
        v-dialog(transition="dialog-bottom-transition", max-width="1200" max-length="800" v-model="dialogVisible")
          template(v-slot:activator="{ on, attrs }")
            //- v-btn.rounded-x2.reject-button(color="#ff0000", v-bind="attrs", v-on="on" max-width="150")
            v-btn.text-capitalize(rounded dark color="warning" v-bind="attrs" v-on="on" @click="openDialog") Reject
              v-icon(right dark) mdi-close-circle

          template(v-slot:default="dialog")
            v-card.rounded-xl
              fetchdata()
              v-toolbar.px-4(elevation="0")
                h3.primary--text.font-weight-medium Loan Application Recommendation
              v-card-text.pb-0(color="black")
                div.subtitle-1.pa-3.secondary--text
                  | Based on the financial profile, we recommend the following loan options.
                  | If the application is rejected, these alternative loan options will be suggested for the customer.
                  | This can help applicants explore other avenues and find a better-suited loan product.
                v-row.justify-center
                  v-col
                    .d-flex.pt-3.px-4
                      v-item-group.fill-width
                        v-row
                          v-col(v-for="n in 3" :key="n" cols="12" md="4")
                            v-item(v-slot="{ active, toggle }")
                              v-card.fill-width.pa-3.rounded-lg.d-flex.flex-column.align-center(:class="active ? 'primary--card' : 'gray--card'" outlined @click="toggle")
                                .text-center
                                  h3.font-weight-medium Loan Recommendation {{ n }}
                                  v-divider.mb-2
                                  p.mb-0 Amount: RM{{ loan_recommendations[n-1].loan_amount }}
                                  p.mb-0 Term: {{ loan_recommendations[n-1].term }}
                                  p.mb-0 Interest Rate: {{ loan_recommendations[n-1].interest_rate }}%
                                  p.mb-0 Monthly Payment: RM{{ loan_recommendations[n-1].monthly_payment  }}
                    v-card-text.justify-center
                      div.subtitle-1.primary--text Are you sure you want to reject the loan application for {{ customer.name }}?
              v-card-actions.justify-center.text-center.pb-3
                v-btn.text-capitalize(rounded dark color="grey" v-bind="attrs" v-on="on" @click="goBackToPreviousPage()") Cancel
                v-btn.text-capitalize(rounded dark color="warning" v-bind="attrs" v-on="on" @click="rejected()") Reject

  </template>

<script>
import { mapGetters, mapActions } from 'vuex'

import LoanDetail from '~/components/loan/LoanDetail.vue'
export default {
  components: {
    LoanDetail
  },
  data () {
    return {
      customer: null,
      numberInput: '',
      selectedButton: '',
      loan_amount0: 0,
      interest_rate0: 0,
      term0: '',
      monthly_payment0: 0,
      loan_amount1: 0,
      interest_rate1: 0,
      term1: '',
      monthly_payment1: 0,
      loan_amount2: 0,
      interest_rate2: 0,
      term2: '',
      monthly_payment2: 0,
      activeItem: null,
      loan_recommendations: [
        { loan_amount: 0, interest_rate: 0, term: '', monthly_payment: 0 },
        { loan_amount: 0, interest_rate: 0, term: '', monthly_payment: 0 },
        { loan_amount: 0, interest_rate: 0, term: '', monthly_payment: 0 }],
      dialogVisible: false,
      loanStatus: 'processing'
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
  mounted () {
    // this.fetchdata()
  },
  created () {
    // console.log(this.$route.params)
    this.customer = this.getCustomerById(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      changeLoanStatus: 'customer/changeLoanStatus'
    }),
    searchBy (newValue) {
      this.search = newValue
    },
    goBackToPreviousPage () {
      this.dialogVisible = false
      // this.$router.go(-1)
    },
    rejected () {
      // this.$router.push('/borrower_list')
      this.loanStatus = 'approved'
      this.dialogVisible = false
      this.changeLoanStatus({ c: this.customer, s: 'Rejected' })
      this.scrollToTop()
    },
    scrollToTop () {
      const element = document.getElementById('top')
      if (element) {
        const top = element.offsetTop
        window.scrollTo({ top, behavior: 'smooth' })
      }
    },
    isActive (itemNumber) {
      return this.activeItem === itemNumber
    },
    toggle (itemNumber) {
      this.activeItem = this.isActive(itemNumber) ? null : itemNumber
    },
    fetchdata () {
      LoanDetail.methods.predict.call(this)
    },
    openDialog () {
      this.fetchdata()
      this.dialogVisible = true
    }
  }
}

</script>

<style scoped>
.primary--card {
  border: 1px solid #002147;
  color: #002147;
}

.gray--card {
  border: 1px solid gray;
  color: gray;
}
.button {
  float: left;
  margin: 0 5px 0 0;
  width: 60px;
  height: 40px;
  position: relative;
}

.button label,
.button input {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.button input[type="radio"] {
  opacity: 0.011;
  z-index: 100;
}

.button input[type="radio"]:checked + label {
  background: #6aabdd;
  border-radius: 4px;
}

.button label {
  cursor: pointer;
  z-index: 90;
  line-height: 1.8em;
}
.reject-button {
  background-color: #ff0000; /* Red color */
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}

.label-details {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.button-group label:hover .label-details {
  display: block;
}
</style>
