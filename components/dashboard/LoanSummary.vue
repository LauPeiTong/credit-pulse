<template lang="pug">
v-row.dashboard.justify-center.mx-auto.pt-4.shadow.rounded-lg
  v-card.shadow.px-6.pb-6.rounded-lg.fill-width(elevation="0")
    v-row
      v-col(:cols="9")
        v-card-title.px-0.pb-0
          h3.font-weight-medium Good Morning, Sarween
          v-spacer
          p.body-2.mb-1.mr-2.primary--text We optimize and elevate the credit approval process, enabling a more data-driven approach to credit decision-making.
        v-card-body
          v-row.pt-4
            v-col(:cols="3")
              v-card.fill-height.primary--border.rounded-lg.pa-4.primary--text.text-center(outlined @click="goToPath('/borrower')")
                v-card.rounded-lg.lightBlue3.pa-3.mb-3.mx-12(flat)
                  v-icon.primary--text(x-large) mdi-account-search
                h2.mb-0.font-weight-regular 100
                p.font-weight-medium.font-14.mb-0 Total Borrowers
            v-col(:cols="3")
              v-card.fill-height.primary--border.rounded-lg.pa-4.primary--text.text-center(outlined @click="goToPath('/')")
                v-card.rounded-lg.lightBlue3.pa-3.mb-3.mx-12(flat)
                  v-icon.primary--text(x-large) mdi-speedometer
                h2.mb-0.font-weight-regular 700
                p.font-weight-medium.font-14.mb-0 Average Credit Score of Borrowers
            v-col(:cols="3")
              v-card.fill-height.primary--border.rounded-lg.pa-4.primary--text.text-center(outlined @click="goToPath('/')")
                v-card.rounded-lg.lightBlue3.pa-3.mb-3.mx-12(flat)
                  v-icon.primary--text(x-large) mdi-hand-coin
                h2.mb-0.font-weight-regular 160000
                p.font-weight-medium.font-14.mb-0 Average Size of Loans
      v-col(:cols="3")
        v-img(:src="require(`../../assets/img/dashboard1.png`)" max-height="300" max-width="300")
</template>

<script>

export default {
  name: 'LoanSummary',
  components: { },
  data () {
    return {
    }
  },
  computed: {

  },
  methods: {
    goToPath (link) {
      this.$router.push({
        path: link
      })
    }
  }
}
</script>

<style scoped>
.wrapped-text {
  white-space: pre-wrap;
}

.font-14 {
  font-size: 14px;
}

.primary--border{
  border: solid 1px #002147;
}
</style>
