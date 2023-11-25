<template lang="pug">
  v-row(justify="space-around")
      v-col(cols="auto")
        v-dialog(transition="dialog-bottom-transition", max-width="1200" max-length="800" v-model="dialogVisible")
          template(v-slot:activator="{ on, attrs }")
            //- v-btn.rounded-x2.reject-button(color="#ff0000", v-bind="attrs", v-on="on" max-width="150")
            v-btn.rounded-x2.reject-button(color="#ff0000", v-bind="attrs", v-on="on" max-width="150" @click="openDialog")
              | Reject
          //- template(v-slot:default="dialog")
          //-   v-card.rounded-xl
          //-     fetchdata()
          //-     v-toolbar(color="primary", dark)
          //-       | Loan Application Recommendation
          //-     v-card-text(color="black")
          //-       div.subtitle-1.pa-12 Based on the financial profile, we recommend the following loan options. If the application is rejected, these alternative loan options will be suggested for customer. This can help applicants explore other avenues and find a better-suited loan product.
          //-       v-col
          //-         v-row.justify-center
          //-           v-col
          //-             .d-flex.justify-center.pt-5
          //-             v-item-group
          //-               v-container
          //-                 v-row
          //-                   v-col(v-for="n in 3" :key="n" cols="12" md="4")
          //-                     v-item(v-slot="{ active, toggle }")
          //-                       v-card(:color="active ? 'light-blue lighten-4' : 'white'" class="d-flex flex-column align-center" outlined height="200" @click="toggle" max-width="350")
          //-                         v-scroll-y-transition
          //-                           div(class="text-h6 text-center mb-4")
          //-                             | Loan Recommendation {{ n }}
          //-                             br
          //-                             | Amount: RM{{ loan_recommendations[n-1].loan_amount }}
          //-                             br
          //-                             | Term: {{ loan_recommendations[n-1].term }}
          //-                             br
          //-                             | Interest Rate: {{ loan_recommendations[n-1].interest_rate }}%
          //-                             br
          //-                             | Monthly Payment: RM{{ loan_recommendations[n-1].monthly_payment  }}
          //-         v-card-text.justify-center
          //-           div.subtitle-1.pa-12 Are you sure you want to reject the loan application for Ray Gan?
          //-     v-card-actions(class="justify-center")
          //-       v-btn(color="grey", @click="goBackToPreviousPage()")
          //-         | cancel
          //-       v-btn(color="red", @click="Accepted()")
          //-         | Reject
          template(v-slot:default="dialog")
            v-card.rounded-xl
              fetchdata()
              v-toolbar(color="primary", dark)
                span.white--text Loan Application Recommendation
              v-card-text(color="black")
                div.subtitle-1.pa-4
                  | Based on the financial profile, we recommend the following loan options.
                  | If the application is rejected, these alternative loan options will be suggested for the customer.
                  | This can help applicants explore other avenues and find a better-suited loan product.
                v-row.justify-center
                  v-col
                    .d-flex.justify-center.pt-5
                      v-item-group
                        v-container
                          v-row
                            v-col(v-for="n in 3" :key="n" cols="12" md="4")
                              v-item(v-slot="{ active, toggle }")
                                v-card(:color="active ? 'light-blue lighten-4' : 'white'" class="d-flex flex-column align-center" outlined height="200" @click="toggle" max-width="350")
                                  v-scroll-y-transition
                                    div(class="text-h6 text-center mb-4")
                                      | Loan Recommendation {{ n }}
                                      br
                                      | Amount: RM{{ loan_recommendations[n-1].loan_amount }}
                                      br
                                      | Term: {{ loan_recommendations[n-1].term }}
                                      br
                                      | Interest Rate: {{ loan_recommendations[n-1].interest_rate }}%
                                      br
                                      | Monthly Payment: RM{{ loan_recommendations[n-1].monthly_payment  }}
                    v-card-text.justify-center
                      div.subtitle-1.pa-4 Are you sure you want to reject the loan application for Ray Gan?
              v-card-actions(class="justify-center")
                v-btn(color="grey", @click="goBackToPreviousPage()") Cancel
                v-btn(color="red", @click="rejected()") Reject

  </template>

<script>
import LoanDetail from '~/components/loan/LoanDetail.vue'
export default {
  components: {
    LoanDetail
  },
  data () {
    return {
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
  mounted () {
    // this.fetchdata()
  },
  methods: {
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
