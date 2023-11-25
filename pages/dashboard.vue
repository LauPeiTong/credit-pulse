<template lang="pug">
.dashboard-page.pa-0.ma-0.fill-width
  upper-title.ma-0(:title="'Dashboard'" :icon="'bell'" :rightIconColor="$vuetify.theme.themes.light.primary")
  v-row.ma-0.pt-16.fill-width
    v-row
      v-card.rounded-xl.px-0.mb-4(outlined).flex
        v-card-text.d-flex
          apexchart(type="bar" height="350" width="500" :options="chartOptions" :series="series")
          apexchart(type="pie" height="350" width="600" :options="chartOptions1" :series="series1")
          apexchart(type="bar" height="400" width="300" :options="chartOptions2" :series="series2")
    v-row
      v-card.rounded-xl.px-0.mb-4(outlined).flex
        v-card-text.d-flex
          info-card(:value="totalBorrowers" title="Total Borrowers")
          info-card(:value="700" title="Average Credit Score of Borrowers")
          info-card(:value="160000" title="Average Size of Loans")
</template>

<script>
import { mapGetters } from 'vuex'
import VueApexCharts from 'vue-apexcharts'
import InfoCard from '@/components/InfoCard.vue'

export default {
  name: 'DashboardPage',
  components: {
    apexchart: VueApexCharts,
    InfoCard
  },
  layout: 'default',
  data () {
    return {
      totalBorrowers: 100,
      chartOptions: {
        // Add your chart options here
        chart: {
          id: 'apexchart-example'
        },
        xaxis: {
          categories: ['Loans']
        },
        title: {
          text: 'Number of Approved Loans',
          align: 'center',
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#263238'
          }
        }
      },
      series: [{
        name: 'Disapproved Loans',
        data: [20],
        fill: {
          colors: ['#008000']
        }
      },
      {
        name: 'Approved Loans',
        data: [100],
        fill: {
          colors: ['#FF0000']
        }
      }],
      chartOptions1: {
        labels: ['Penang', 'Kuala Lumpur', 'Johor', 'Selangor'],
        title: {
          text: 'Number of Borrowers in Malaysia',
          align: 'center',
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#263238'
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }
        ]
      },
      series1: [40, 20, 30, 10],
      chartOptions2: {
        // Add your chart options here
        chart: {
          id: 'apexchart-example'
        },
        xaxis: {
          categories: ['Type of Loans']
        },
        title: {
          text: 'Types of Loans',
          align: 'center',
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#263238'
          }
        }
      },
      series2: [{
        name: 'Personal Loans',
        data: [100],
        fill: {
          colors: ['#33FF57']
        }
      },
      {
        name: 'Business Loans',
        data: [20],
        fill: {
          colors: ['#FF5733']
        }
      },
      {
        name: 'Mortgage',
        data: [20],
        fill: {
          colors: ['#5733FF']
        }
      }]
    }
  },
  computed: {
    ...mapGetters({
    })
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
