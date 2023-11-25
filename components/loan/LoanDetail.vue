<template>
<!-- //- .loan-approval-summary
//-   .header
//-     .title Loan Approval Summary
//-     .processing Processing

//-   .detail-box
//-     .detail
//-       .detail-label Loan Amount
//-       .detail-value.bigger-font.blue-text MYR 100,000

//-   .detail-box
//-     .detail
//-       .detail-label.smaller-font Loan Product
//-       .detail-value.bigger-font.blue-text Personal Loan
//-       .detail-value.smaller-font.blue-text For house purchase

//-   .detail-box
//-     .detail
//-       .detail-label.smaller-font Interest Rate
//-       .detail-value.bigger-font.blue-text 4.45%

//-   .detail-box
//-     .detail
//-       .detail-label.smaller-font Loan Term
//-       .detail-value.bigger-font.blue-text 6 years 0 months

//-   .detail-box
//-     .detail
//-       .detail-label.smaller-font Monthly Payment
//-       .detail-value.bigger-font.blue-text MYR 2500.00

//-   button.evaluate-button
//-     span Evaluate by CreditAI
//-     img.robot-icon(src='../../assets/img/credit-pulse-logo.png', alt='robot-icon') -->

<div>
  <div class="loan-approval-summary">
    <div class="header">
      <div class="title">Loan Approval Summary</div>
      <!-- <div v-if="!loanStatus && loanReject" class="reject">Rejected</div> -->
      <!-- <div v-if="!loanStatus" class="processing">Processing</div>
      <div v-if="loanStatus" class="approved">Approved</div> -->
      <div v-if="loanStatus === 'rejected'" class="rejected">Rejected</div>
      <div v-else-if="loanStatus === 'processing'" class="processing">Processing</div>
      <div v-else-if="loanStatus === 'approved'" class="approved">Approved</div>
    </div>

    <div class="detail-box">
      <div class="detail">
        <div class="detail-label">Loan Amount</div>
        <div class="detail-value bigger-font blue-text">MYR 100,000</div>
      </div>
    </div>

    <div class="detail-box">
      <div class="detail">
        <div class="detail-label smaller-font">Loan Product</div>
        <div class="detail-value bigger-font blue-text">Personal Loan</div>
        <div class="detail-value smaller-font">for house purchase</div>
      </div>
    </div>

    <div class="detail-box">
      <div class="detail">
        <div class="detail-label smaller-font">Interest Rate</div>
        <div class="detail-value bigger-font blue-text">4.45%</div>
      </div>
    </div>

    <div class="detail-box">
      <div class="detail">
        <div class="detail-label smaller-font">Loan Term</div>
        <div class="detail-value bigger-font blue-text">6 years 0 months</div>
      </div>
    </div>

    <div class="detail-box">
      <div class="detail">
        <div class="detail-label smaller-font">Monthly Payment</div>
        <div class="detail-value bigger-font blue-text">MYR 2500.00</div>
      </div>
    </div>

    <!-- <button v-if="!showAnalysis" @click="showAnalysis = true ,predict" class="evaluate-button"></button> -->
    <button v-if="!showAnalysis" @click="predict"  class="evaluate-button">
      <span>Evaluate by CreditAI</span>
      <img src="../../assets/img/credit-pulse-logo.png" alt="robot-icon" class="robot-icon" />
    </button>
  </div>

  <div v-if="showAnalysis" class="analysis-box">
    <img src="../../assets/img/credit-pulse-logo.png" alt="robot-icon" class="robot-icon" />
    <div class="analysis-title bigger-font blue-text">Analysis of CreditAI</div>
    <div class="analysis-detail">Credit Evaluation Schema:</div>

    <div class="analysis-item">
      <div>Credit Score({{ credit_score }}/40%)</div>
      <div class="percentage-bar" :style="{ width: '75%' }"></div>
    </div>

    <div class="analysis-item">
      <div>Debt to Income Ratio({{ ratio }}/30%)</div>
      <div class="percentage-bar" :style="{ width: '93%' }"></div>
    </div>

    <div class="analysis-item">
      <div>Social Media Behavior({{ social_media }}/15%)</div>
      <div class="percentage-bar" :style="{ width: '67%' }"></div>
    </div>

    <div class="analysis-item">
      <div>Background Check({{ background_check }}/15%)</div>
      <div class="percentage-bar" :style="{ width: '93%' }"></div>
    </div>

    <div class="conclusion">
      <div>Conclusion & Reasons:</div>
      <div>{{ summary }}</div>
    </div>
  </div>
    <div v-if="showAnalysis">
    <div class="action-buttons">
      <!-- <button class="reject-button" @click="handleReject">Reject</button> -->
      <LoanRecommendation> </LoanRecommendation>
      <button class="approve-button" @click="handleApprove">Approve</button>
    </div>

  </div>
</div>

</template>

<script>
import LoanRecommendation from '~/components/loan/LoanRecommendation.vue'

export default {
  components: {
    LoanRecommendation
  },
  data () {
    return {
      // loanStatus: false,
      loanStatus: 'processing',
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
        { loan_amount: 0, interest_rate: 0, term: '', monthly_payment: 0 }]
    }
  },
  methods: {
    handleReject () {
      // Handle rejection logic
      // this.$router.push('/donation')
      console.log('Loan Rejected')
    },
    handleApprove () {
      // Handle approval logic
      // this.loanStatus = true
      this.loanStatus = 'approved'
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
.loan-approval-summary {
  max-width: 800px;
  margin: 20px auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
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
  max-width: 300px; /* Set your desired maximum width */
  overflow: hidden; /* Optional: hide any content that overflows the box */
  justify-content: center;
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
