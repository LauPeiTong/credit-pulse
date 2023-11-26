<template lang="pug">
v-card.fill-height.shadow.pa-4.rounded-lg.white(elevation="0")
  .loan-approval-summary
    .d-flex.justify-space-between.align-center.mb-2
      p.mb-0.font-weight-medium Loan Approval Summary
      v-chip.my-1(
        :color="getChipColor(customer.status)"
        :textColor="getColor(customer.status)"
        pill
      )
        p.mb-0 {{ customer.status }}

    .v-card.rounded-lg.primary-linear.mb-3.pa-3
      .detail-label.white--text.pt-8 Loan Amount
      h2.detail-value.white--text {{$formatCurrency(customer.amount)}}

    .detail-box.mb-3
      .detail
        .detail-label.smaller-font Loan Product
        .detail-value.bigger-font.blue-text {{customer.category}}
        .detail-value.smaller-font {{customer.purpose}}

    .detail-box.mb-3
      .detail
        .detail-label.smaller-font Interest Rate
        .detail-value.bigger-font.blue-text 7.00%

    .detail-box.mb-3
      .detail
        .detail-label.smaller-font Loan Term
        .detail-value.bigger-font.blue-text 6 years 0 months

    .detail-box.mb-3
      .detail
        .detail-label.smaller-font Monthly Payment
        .detail-value.bigger-font.blue-text MYR 1486.11

    .d-flex.justify-center
      v-btn.text-capitalize(color="primary" rounded v-if="!showAnalysis", @click="predict")
        span Evaluate by CreditAI
        v-icon(right dark) mdi-robot

  .analysis(v-if="showAnalysis")
    .analysis-box.pa-2
      .d-flex
        v-icon.primary--text mdi-robot
        p.primary--text.mb-0.font-weight-medium.ml-2 Analysis of CreditAI
      v-divider.my-2
      p.primary--text.font-weight-medium.mb-0 Credit Evaluation Schema:

      .analysis-item
        p.body-2.mb-0 Credit Score({{ credit_score }}/40%)
        v-progress-linear.rounded-xl.mb-2(
          :value="(credit_score / 40) * 100"
          :color="getProgressBarColor((credit_score / 40) * 100)"
          :background-color="$vuetify.theme.themes.light.background"
          :indeterminate="loading"
          height="28"
        )
          template(v-slot:default="{ value }")
            strong.white--text {{ credit_score }} / 40 %

      .analysis-item
        p.body-2.mb-0 Debt to Income Ratio({{ ratio }}/30%)
        v-progress-linear.rounded-xl.mb-2(
          :value="(ratio / 30) * 100"
          :color="getProgressBarColor((ratio / 30) * 100)"
          :background-color="$vuetify.theme.themes.light.background"
          :indeterminate="loading"
          height="28"
        )
          template(v-slot:default="{ value }")
            strong.white--text {{ ratio }} / 30 %

      .analysis-item
        p.body-2.mb-0 Social Media Behavior({{ social_media }}/15%)
        v-progress-linear.rounded-xl.mb-2(
          :value="(social_media / 15) * 100"
          :color="getProgressBarColor((social_media / 15) * 100)"
          :background-color="$vuetify.theme.themes.light.background"
          :indeterminate="loading"
          height="28"
        )
          template(v-slot:default="{ value }")
            strong.white--text {{ social_media }} / 15 %

      .analysis-item
        p.body-2.mb-0 Background Check({{ background_check }}/15%)
        v-progress-linear.rounded-xl.mb-2(
          :value="(background_check / 15) * 100"
          :color="getProgressBarColor((background_check / 15) * 100)"
          :background-color="$vuetify.theme.themes.light.background"
          :indeterminate="loading"
          height="28"
        )
          template(v-slot:default="{ value }")
            strong.white--text {{ background_check }} / 15 %

      v-divider.mt-4.mb-2
      .conclusion.text-justify
        p.primary--text.font-weight-medium.mb-0 Conclusion & Reasons:
        div(v-if="!loading")
          pre.wrapped-text {{ summary }}
          p.text-decoration-underline.text-right View Details
        .d-flex.justify-center.pt-2(v-else)
          v-img.rounded-circle(:src="require(`../../assets/img/creditai.gif`)" max-height="200" max-width="200")

    v-row.justify-center.pt-6.pb-3
      div(action-buttons)
        LoanRecommendation
      div.ml-2
        //- button.approve-button(@click="handleApprove") Approve
        v-btn.text-capitalize(rounded color="primary" v-bind="attrs" v-on="on" @click="handleApprove") Approve
          v-icon(right dark) mdi-check-circle
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
      loading: true,
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
    getProgressBarColor (value) {
      const color = this.$vuetify.theme.themes.light.primary
      const opacity = (value) / 100 + 0.1 // Assuming value is between 0 and 100

      // Parse the color to get the RGB values
      const matches = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
      const r = parseInt(matches[1], 16)
      const g = parseInt(matches[2], 16)
      const b = parseInt(matches[3], 16)

      // Return the color with the adjusted opacity
      return `rgba(${r}, ${g}, ${b}, ${opacity})`
    },
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
    scrollToTop () {
      const element = document.getElementById('top')
      if (element) {
        const top = element.offsetTop
        window.scrollTo({ top, behavior: 'smooth' })
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
      this.scrollToTop()
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
            this.summary = 'The loan should be rejected because he lacks of social info credibility and his overall financial credit health is Poor based on his CTOS credit score and debt-to-income ratio of 42% which is quite high. He also just started his career for 2 years which may seems that job security is not that stable. Please click reject to provide other loan options.'
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
:deep(.v-progress-linear) {
  border: solid 6px #d6dceb;
}

.wrapped-text {
  white-space: pre-wrap;
}

.primary-linear {
  background: linear-gradient(200deg, #A6C2EC 5.17%, #5761B8 49.42%, #002147 117.87%);
}

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

.analysis-box {
  border: 2px dashed #001f3f; /* Darker border */
  border-radius: 12px; /* Rounder corners */
  background-color: rgba(0, 33, 71, 0.04);
}

.percentage-bar {
  height: 10px;
  background-color: #001f3f; /* Green color */
  margin-top: 5px;
}

.conclusion {
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

</style>
