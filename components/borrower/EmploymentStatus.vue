<template lang="pug">
.employment-status
  p.font-weight-medium Employment Status
  v-row
    template(v-for="item in financialData")
      v-col.pb-1(:cols="item.col")
        v-card.px-1.py-2.d-flex.rounded-lg(outlined)
          v-icon.primary--text.pa-2(small) {{ item.icon }}
          .d-grid.pl-1
            .caption.font-weight-light.darkGrey--text {{ item.title }}
            p.mb-0.mt-n1.body-2 {{ item.value }}

    v-col.pb-1(cols="6")

    v-col(cols="6")
      v-card.rounded-lg(outlined)
        v-card.px-1.py-2.d-flex.rounded-lg.background.border(elevation="0" @click="")
          v-icon.primary--text.pa-2(small) mdi-file-download
          .d-grid.pl-1
            p.mb-1.font-weight-medium.primary--textbody-2.text-decoration-underline Salary Slip
            p.mb-0.mt-n1.body-2.darkGrey--text Download Here

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'EmploymentStatus',
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
          icon: 'mdi-briefcase-account',
          title: 'Job Position',
          value: 'Technician'
        },
        {
          col: 6,
          icon: 'mdi-domain',
          title: 'Working Company',
          value: 'SunPlex Engineering'
        },
        {
          col: 6,
          icon: 'mdi-calendar-blank',
          title: 'Years in current job',
          value: '2 years'
        }
      ]
    } else {
      this.financialData = [
        {
          col: 6,
          icon: 'mdi-briefcase-account',
          title: 'Job Position',
          value: 'Software Developer'
        },
        {
          col: 6,
          icon: 'mdi-domain',
          title: 'Working Company',
          value: 'Nexus Solutions Technology'
        },
        {
          col: 6,
          icon: 'mdi-calendar-blank',
          title: 'Years in current job',
          value: '7 years'
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
