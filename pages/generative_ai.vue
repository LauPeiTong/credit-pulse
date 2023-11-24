<template lang="pug">
.dashboard-page.pa-0.ma-0.fill-width
  upper-title.ma-0(:title="'Customer Insights'" :icon="'bell'" :rightIconColor="$vuetify.theme.themes.light.primary")
  v-row.ma-0.pt-8.fill-width
    v-col(cols="8")

    v-col(cols="4")
    v-card-text.pt-0(class="text-center")
      h2.fw-600.secondary--text.mb-2 Summary
      //- h2.fw-600.secondary--text.mb-2 Excellent
      h2.primary--text.mb-4 {{ summary }}
      h2.fw-600.secondary--text.mb-2 Credit Score
      //- h2.fw-600.secondary--text.mb-2 Excellent
      h2.primary--text.mb-10 {{ credit_score }}
      h2.fw-600.secondary--text.mb-2 Debt to Income Ratio
      //- h2.fw-600.secondary--text.mb-2 Excellent
      h2.primary--text.mb-10 {{ ratio }}
      h2.fw-600.secondary--text.mb-2 Social Media
      //- h2.fw-600.secondary--text.mb-2 Excellent
      h2.primary--text.mb-10 {{ social_media }}
      h2.fw-600.secondary--text.mb-2 Background Check
      //- h2.fw-600.secondary--text.mb-2 Excellent
      h2.primary--text.mb-10 {{ background_check }}
      button.styled-button.mb-4(@click="predict") Check Results

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'GenerativeAi',
  components: {
  },
  layout: 'default',
  data () {
    return {
      summary: '',
      credit_score: 0,
      ratio: 0,
      social_media: 0,
      background_check: 0,
      loan_amount: 0,
      interest_rate: 0,
      term: '',
      monthly_payment: 0,
      loan_amount1: 0,
      interest_rate1: 0,
      term1: '',
      monthly_payment1: 0,
      loan_amount2: 0,
      interest_rate2: 0,
      term2: '',
      monthly_payment2: 0
      // search: null
    }
  },
  computed: {
    ...mapGetters({
    })
  },
  methods: {
    async predict () {
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
          this.summary = result.summary
          this.credit_score = result.credit_score
          this.ratio = result.ratio
          this.social_media = result.social_media
          this.background_check = result.personality
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
    }
  }
}
</script>

<style scoped>

</style>
