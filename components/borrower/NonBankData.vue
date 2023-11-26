<template lang="pug">
.non-bank-data
  p.font-weight-medium Other Non-Bank Data
  v-card.pa-3.rounded-lg(outlined)
    //- Title
    .d-flex.justify-space-between.align-start
      .d-grid
        p.font-weight-medium.primary--text.mb-0 Social Media Behaviour
        p.body-2.mb-0 The social media profile is
          |
          span.warning--text.ml-1 incomplete
      .d-flex
        v-icon.primary--text.mr-2 mdi-linkedin
        v-icon.primary--text.mr-2 mdi-instagram
        v-icon.lightBlue2--text.mr-2 mdi-facebook
        v-icon.lightBlue2--text mdi-twitter

    //- Linkedin
    v-card.background2.pa-2.mt-3(elevation="0")
      v-icon.primary--text.mr-2 mdi-linkedin
      span LinkedIn
      v-row.pt-2
        template(v-for="item in linkedin")
          v-col(:cols="item.col")
            v-card.bg--background2.px-1.py-2.d-flex.rounded-lg(outlined)
              v-icon.primary--text.pa-2(small) {{ item.icon }}
              .d-grid.pl-1
                .caption.font-weight-light.darkGrey--text {{ item.title }}
                p.mb-0.mt-n1.body-2 {{ item.value }}
      p.body-2.font-weight-medium.pt-2 Analysis
      v-row.pb-2
        template(v-for="v in linkedinScore")
          v-col.pb-0.pt-0(cols="6")
            p.body-2.mb-0 {{ v.name }}
            v-progress-linear.rounded-xl.mb-2(
              :value="v.per"
              :color="getProgressBarColor(v.per)"
              :background-color="$vuetify.theme.themes.light.background"
              height="28"
            )
              template(v-slot:default="{ value }")
                strong.white--text {{ Math.ceil(value) }}%

    //- Insta
    v-card.background2.pa-2.mt-3(elevation="0")
      v-icon.primary--text.mr-2 mdi-instagram
      span Instagram
      v-row.pt-2
        template(v-for="item in instagram")
          v-col(:cols="item.col")
            v-card.bg--background2.px-1.py-2.d-flex.rounded-lg(outlined)
              v-icon.primary--text.pa-2(small) {{ item.icon }}
              .d-grid.pl-1
                .caption.font-weight-light.darkGrey--text {{ item.title }}
                p.mb-0.mt-n1.body-2 {{ item.value }}
      p.body-2.font-weight-medium.pt-2 Analysis
      v-row.pb-2
        template(v-for="v in instaScore")
          v-col.pb-0.pt-0(cols="6")
            p.body-2.mb-0 {{ v.name }}
            v-progress-linear.rounded-xl.mb-2(
              :value="v.per"
              :color="getProgressBarColor(v.per)"
              :background-color="$vuetify.theme.themes.light.background"
              height="28"
            )
              template(v-slot:default="{ value }")
                strong.white--text {{ Math.ceil(value) }}%

    //- Facbook
    v-card.background2.pa-2.mt-3(elevation="0")
      v-icon.primary--text.mr-2 mdi-facebook
      span Facebook
      p.pl-8.darkGrey--text No data founded.

    //- Twitter
    v-card.background2.pa-2.mt-3(elevation="0")
      v-icon.primary--text.mr-2 mdi-twitter
      span Twitter
      p.pl-8.darkGrey--text No data founded.

  //- Criminal record
  v-card.pa-3.rounded-lg.mt-3(outlined)
    //- Title
    .d-flex.justify-space-between.align-start
      .d-grid
        p.font-weight-medium.primary--text.mb-0 Criminal Record
        p.body-2.mb-0 No criminal record is found

    //- Download document
    v-row.pt-3
      v-col(cols="6")
        v-card.rounded-lg(outlined)
          v-card.px-1.py-2.d-flex.rounded-lg.background.border(elevation="0" @click="")
            v-icon.primary--text.pa-2(small) mdi-file-download
            .d-grid.pl-1
              p.mb-1.font-weight-medium.primary--textbody-2.text-decoration-underline Sijil Kelakuan Baik (SKB)
              p.mb-0.mt-n1.body-2.darkGrey--text Download Here

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'NonBankData',
  components: {
  },
  data () {
    return {
      customer: null,
      linkedin: null,
      instagram: null,
      linkedinScore: [
        {
          name: 'Professional Background',
          per: null
        },
        {
          name: 'Education and Qualifications',
          per: null
        },
        {
          name: 'Networking and Connections',
          per: null
        },
        {
          name: 'Skills and Endorsements',
          per: null
        },
        {
          name: 'Professional Achievements',
          per: null
        },
        {
          name: 'Consistency with Application Data',
          per: null
        }
      ],
      instaScore: [
        {
          name: 'Lifestyle and Spending Habits',
          per: null
        },
        {
          name: 'Professional Life',
          per: null
        },
        {
          name: 'Network and Relationships',
          per: null
        },
        {
          name: 'Financial Responsibility ',
          per: null
        },
        {
          name: 'Consistency with Application Data',
          per: null
        }
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
    this.linkedinScore[0].per = this.customer.professional_background
    this.linkedinScore[1].per = this.customer.education
    this.linkedinScore[2].per = this.customer.network
    this.linkedinScore[3].per = this.customer.skills
    this.linkedinScore[4].per = this.customer.achievements
    this.linkedinScore[5].per = this.customer.consistency
    this.instaScore[0].per = this.customer.lifestyle
    this.instaScore[1].per = this.customer.professional_life
    this.instaScore[2].per = this.customer.relationship
    this.instaScore[3].per = this.customer.financial_reponsibility
    this.instaScore[4].per = this.customer.insta_consistency
    if (this.customer.name === 'Khairul bin Ahmad') {
      this.linkedin = [
        {
          col: 6,
          icon: 'mdi-link-variant',
          title: 'LinkedIn URL',
          value: 'www.linkedin.com/khairul'
        },
        {
          col: 6,
          icon: 'mdi-account-circle',
          title: 'Profile Name',
          value: this.customer.name
        }
      ]

      this.instagram = [
        {
          col: 6,
          icon: 'mdi-link-variant',
          title: 'LinkedIn URL',
          value: 'www.instagram.com/khairul'
        },
        {
          col: 6,
          icon: 'mdi-account-circle',
          title: 'Profile Name',
          value: this.customer.name
        }
      ]
    } else {
      this.linkedin = [
        {
          col: 6,
          icon: 'mdi-link-variant',
          title: 'LinkedIn URL',
          value: 'www.linkedin.com/gan12345'
        },
        {
          col: 6,
          icon: 'mdi-account-circle',
          title: 'Profile Name',
          value: this.customer.name
        }
      ]

      this.instagram = [
        {
          col: 6,
          icon: 'mdi-link-variant',
          title: 'LinkedIn URL',
          value: 'www.instagram.com/gan12345'
        },
        {
          col: 6,
          icon: 'mdi-account-circle',
          title: 'Profile Name',
          value: this.customer.name
        }
      ]
    }
  },
  methods: {
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
    }
  }
}
</script>

<style scoped>
.bg--background2 {
  background-color: #F4F6FB;
}

:deep(.v-progress-linear) {
  border: solid 6px #d6dceb;
}
</style>
