<template lang="pug">
v-card.shadow.pa-4.rounded-lg.white(elevation="0")
  .loan-approval-summary
    .d-flex.justify-space-between.align-center.mb-2
      p.mb-0.font-weight-medium Loan Approval Summary
      v-chip.my-1(
        :color="getChipColor(customer.status)"
        :textColor="getColor(customer.status)"
        pill
      )
        p.mb-0 {{ customer.status }}

    .detail-box
      .detail
        .detail-label Loan Amount
        .detail-value.bigger-font.blue-text MYR 100,000

    .detail-box
      .detail
        .detail-label.smaller-font Loan Product
        .detail-value.bigger-font.blue-text Personal Loan
        .detail-value.smaller-font for house purchase

    .detail-box
      .detail
        .detail-label.smaller-font Interest Rate
        .detail-value.bigger-font.blue-text 4.45%

    .detail-box
      .detail
        .detail-label.smaller-font Loan Term
        .detail-value.bigger-font.blue-text 6 years 0 months

    .detail-box
      .detail
        .detail-label.smaller-font Monthly Payment
        .detail-value.bigger-font.blue-text MYR 2500.00

    button.evaluate-button(v-if="!showAnalysis", @click="predict")
      span Evaluate by CreditAI
      img.robot-icon(src="../../assets/img/credit-pulse-logo.png", alt="robot-icon")

  .analysis(v-if="showAnalysis")
    .analysis-box
      img.robot-icon(src="../../assets/img/credit-pulse-logo.png", alt="robot-icon")
      .analysis-title.bigger-font.blue-text Analysis of CreditAI
      .analysis-detail Credit Evaluation Schema:

      .analysis-item
        div Credit Score({{ credit_score }}/40%)
        .percentage-bar(:style="{ width: (credit_score / 40) * 100 + '%' }")

      .analysis-item
        div Debt to Income Ratio({{ ratio }}/30%)
        .percentage-bar(:style="{ width: (ratio / 30) * 100 + '%' }")

      .analysis-item
        div Social Media Behavior({{ social_media }}/15%)
        .percentage-bar(:style="{ width: (social_media / 15) * 100 + '%'  }")

      .analysis-item
        div Background Check({{ background_check }}/15%)
        .percentage-bar(:style="{ width: (background_check / 15) * 100 + '%'  }")

      .conclusion.text-justify
        div Conclusion & Reasons:
        div {{ summary }}
    v-row.justify-center.pt-6
      div(action-buttons)
        LoanRecommendation
      div
        //- button.approve-button(@click="handleApprove") Approve
        v-btn.rounded-x2.approve-button(color="#001f3f", v-bind="attrs", v-on="on" max-width="150" @click="handleApprove") Approve

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LoanRecommendation from '~/components/loan/LoanRecommendation.vue'

export default {
  components: {
    LoanRecommendation
  },
  data () {
    return {
      // loanStatus: false,
      customer: null,
      showAnalysis: false,
      summary: '',
      credit_score: 0,
      ratio: 0,
      social_media: 0,
      background_check: 0,
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
      loan_recommendations: [
        { loan_amount: 0, interest_rate: 0, term: '', monthly_payment: 0 },
        { loan_amount: 0, interest_rate: 0, term: '', monthly_payment: 0 },
        { loan_amount: 0, interest_rate: 0, term: '', monthly_payment: 0 }],
      colors: [
        { name: 'Approved', color: '#1F9254', background: '#EBF9F1' },
        { name: 'Processing', color: '#CD6200', background: '#FEF2E5' },
        { name: 'Rejected', color: '#BB0000', background: '#FBE7E8' }
      ]
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
  },
  methods: {
    ...mapActions({
      changeLoanStatus: 'customer/changeLoanStatus'
    }),
    getColor (status) {
      const result = this.colors.find((c) => { return c.name === status })
      if (result) {
        return result.color
      } else {
        return this.$vuetify.theme.themes.primary
      }
    },
    getChipColor (status) {
      const result = this.colors.find((c) => { return c.name === status })
      if (result) {
        return result.background
      } else {
        return this.$vuetify.theme.themes.background
      }
    },
    handleReject () {
      // Handle rejection logic
      console.log('Loan Rejected')
    },
    handleApprove () {
      // Handle approval logic
      this.changeLoanStatus({ c: this.customer, s: 'Approved' })
      console.log('Loan Approved')
    },
    showAnalysisDetail () {
      // Show analysis logic
      this.showAnalysis = true
      console.log('Show analysis')
    },
    async predict () {
      this.showAnalysis = true
      this.loading = true
      this.customer = this.getCustomerById(this.$route.params.id)
      try {
        const response = await fetch('http://127.0.0.1:5000/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json' // Set the content type based on your API
          },
          body: JSON.stringify({}) // Include any request data here
        })
        if (response.ok) {
          const result = await response.json()
          if (this.customer.name === 'Khairul bin Ahmad') {
            this.summary = 'The loan is Rejected because he lacks of social info credibility and his overall financial credit health is Poor based on his CTOS credit score and debt-to-income ratio of 42% which is quite high. He also just started his career for 2 years which may seems that job security is not that stable. Please click reject to provide other loan options.'
            this.credit_score = 10
            this.ratio = 10
            this.social_media = 5
            this.background_check = 7

            this.loan_recommendations[0].loan_amount = result.loan_recommendations[0].loan_amount
            this.loan_recommendations[0].interest_rate = result.loan_recommendations[0].interest_rate
            this.loan_recommendations[0].term = result.loan_recommendations[0].term
            this.loan_recommendations[0].monthly_payment = result.loan_recommendations[0].monthly_payment

            this.loan_recommendations[1].loan_amount = result.loan_recommendations[1].loan_amount
            this.loan_recommendations[1].interest_rate = result.loan_recommendations[1].interest_rate
            this.loan_recommendations[1].term = result.loan_recommendations[1].term
            this.loan_recommendations[1].monthly_payment = result.loan_recommendations[1].monthly_payment

            this.loan_recommendations[2].loan_amount = result.loan_recommendations[2].loan_amount
            this.loan_recommendations[2].interest_rate = result.loan_recommendations[2].interest_rate
            this.loan_recommendations[2].term = result.loan_recommendations[2].term
            this.loan_recommendations[2].monthly_payment = result.loan_recommendations[2].monthly_payment
          } else {
            this.summary = 'The loan can be Approved.\n' + result.summary
            this.credit_score = result.credit_score
            this.ratio = result.ratio
            this.social_media = result.social_media
            this.background_check = result.personality

            this.loan_recommendations[0].loan_amount = result.loan_recommendations[0].loan_amount
            this.loan_recommendations[0].interest_rate = result.loan_recommendations[0].interest_rate
            this.loan_recommendations[0].term = result.loan_recommendations[0].term
            this.loan_recommendations[0].monthly_payment = result.loan_recommendations[0].monthly_payment

            this.loan_recommendations[1].loan_amount = result.loan_recommendations[1].loan_amount
            this.loan_recommendations[1].interest_rate = result.loan_recommendations[1].interest_rate
            this.loan_recommendations[1].term = result.loan_recommendations[1].term
            this.loan_recommendations[1].monthly_payment = result.loan_recommendations[1].monthly_payment

            this.loan_recommendations[2].loan_amount = result.loan_recommendations[2].loan_amount
            this.loan_recommendations[2].interest_rate = result.loan_recommendations[2].interest_rate
            this.loan_recommendations[2].term = result.loan_recommendations[2].term
            this.loan_recommendations[2].monthly_payment = result.loan_recommendations[2].monthly_payment
          }
          // const result = await response.json()
          // this.summary = 'The loan can be Approved.\n' + result.summary
          // this.credit_score = result.credit_score
          // this.ratio = result.ratio
          // this.social_media = result.social_media
          // this.background_check = result.personality

          // this.loan_recommendations[0].loan_amount = result.loan_recommendations[0].loan_amount
          // this.loan_recommendations[0].interest_rate = result.loan_recommendations[0].interest_rate
          // this.loan_recommendations[0].term = result.loan_recommendations[0].term
          // this.loan_recommendations[0].monthly_payment = result.loan_recommendations[0].monthly_payment

          // this.loan_recommendations[1].loan_amount = result.loan_recommendations[1].loan_amount
          // this.loan_recommendations[1].interest_rate = result.loan_recommendations[1].interest_rate
          // this.loan_recommendations[1].term = result.loan_recommendations[1].term
          // this.loan_recommendations[1].monthly_payment = result.loan_recommendations[1].monthly_payment

          // this.loan_recommendations[2].loan_amount = result.loan_recommendations[2].loan_amount
          // this.loan_recommendations[2].interest_rate = result.loan_recommendations[2].interest_rate
          // this.loan_recommendations[2].term = result.loan_recommendations[2].term
          // this.loan_recommendations[2].monthly_payment = result.loan_recommendations[2].monthly_payment

        //   if (this.candidates === undefined) {
        //     this.candidates = this.list1
        //   }
        // } else {
        //   this.candidates = this.list1
        }
      } catch (error) {
        this.summary = 'error'
      }
      this.loading = false
    },
    fetchRejectData () {
      LoanRecommendation.methods.rejected.call(this)
    }
  }
}
</script>

<style scoped>

.title {
  font-size: 18px;
  font-weight: bold;
}

.processing {
  color: orange;
  border: 1px solid orange;
  border-radius: 5px;
  padding: 5px;
}
.approved {
  color: green;
  border: 1px solid green;
  border-radius: 5px;
  padding: 5px;
}
.rejected {
  color: red;
  border: 1px solid red;
  border-radius: 5px;
  padding: 5px;
}
.detail-box {
  border: 2px solid #333; /* Darker border */
  border-radius: 10px; /* Rounder corners */
  margin-bottom: 10px; /* Reduced margin */
  padding: 10px; /* Reduced padding */
}

.detail {
  display: flex;
  flex-direction: column;
}

.smaller-font {
  font-size: 14px;
  font-weight: normal;
}

.bigger-font {
  font-size: 16px;
  font-weight: bold;
}

.blue-text {
  color: #001f3f;
}

.evaluate-button {
  background-color: #001f3f; /* Dark blue color */
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.robot-icon {
  width: 20px;
  height: 20px;
  margin-left: 5px;
}
.analysis-box {
  border: 2px solid #333; /* Darker border */
  border-radius: 10px; /* Rounder corners */
  margin-top: 20px; /* Margin between the previous box and the new box */
  padding: 10px; /* Padding for the new box */
}

.percentage-bar {
  height: 10px;
  background-color: #4caf50; /* Green color */
  margin-top: 5px;
}

.analysis-item {
  margin-top: 15px;
}

.conclusion {
  margin-top: 20px;
  /* max-width: 300px; Set your desired maximum width */
  overflow: hidden; /* Optional: hide any content that overflows the box */
  justify-content: center;
  text-justify: auto;
}

.action-buttons {
  margin-top: 20px;
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

.approve-button {
  background-color: #001f3f; /* Dark blue color */
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
