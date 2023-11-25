<template lang="pug">
.borrowerList
  v-tabs(
    v-model="tab"
    align-with-title
  )
    v-tabs-slider(color="primary")
    v-tab.rounded-t-xl.text-capitalize(
      v-for="t in tabs"
      :key="t"
    ) {{ t }}

  v-card.shadow.pa-4.rounded-b-lg.rounded-tr-lg(elevation="0")
    v-tabs-items(v-model="tab")
      v-tab-item(
        v-for="l in list"
        :key="l.id"
      )
        p.font-weight-medium {{ l.id === 1 ? 'Borrower List' : 'Customer Business List' }}
        v-data-table.mt-18(
          :headers="headers"
          :items="l.table"
          multi-sort
          @click:row=""
        )

            template(v-slot:body.prepend)
              tr
                td.py-4
                  v-text-field(v-model="total_sales" type="number" label="ID" hide-details="auto" dense outlined)
                td.py-4
                  v-text-field(v-model="name" type="text" label="Name" hide-details="auto" dense outlined)
                td.py-4
                  v-text-field(v-model="category" type="text" label="Product" hide-details="auto" dense outlined)
                td.py-4
                  v-text-field(v-model="amount" type="number" label="More than" hide-details="auto" dense outlined)
                td.py-4
                  v-select.select-category(:items="statusList" label="Select a status" v-model="status" hide-details="auto" multiple chips dense outlined)
                    template(v-slot:selection="{ item, index }")
                      v-chip(small :color="getChipColor(item)" :textColor="getColor(item)")
                        span {{ item }}
                td.py-4
                  v-text-field(v-model="purpose" type="text" label="Purpose" hide-details="auto" dense outlined)
                td.py-4
                  v-text-field(v-model="date" type="text" label="Date" hide-details="auto" dense outlined)
                td.py-4.action-field
                td.py-4.action-field

            template(v-slot:item.id="{ item }")
              p.mb-0 {{ item.id }}

            template(v-slot:item.name="{ item }")
              .d-flex.align-center
                v-avatar.profile-pic(size="24")
                  img(v-if="l.id === 1" :src="require(`../../assets/employee/${item.logo}.png`)" :alt="item.name")
                  img(v-else :src="require(`../../assets/company/${item.logo}.png`)" :alt="item.name")
                span.ml-2.body-2 {{item.name}}

            template(v-slot:item.category="{ item }")
              span.ml-2.body-2 {{item.category}}

            template(v-slot:item.amount="{ item }")
              p.mb-0 {{ $formatCurrency(item.amount) }}

            template(v-slot:item.status="{ item }")
              v-chip.my-1(
                :color="getChipColor(item.status)"
                :textColor="getColor(item.status)"
                pill
              )
                p.mb-0 {{ item.status }}

            template(v-slot:item.purpose="{ item }")
              p.mb-0 {{ item.purpose }}

            template(v-slot:item.date="{ item }")
              p.mb-0 {{ item.date }}

            //- Placeholder
            template(v-slot:item.actions="{ item }")
              .d-flex.align-center.mt-4
                v-icon.white--text.mr-2 mdi-magnify
                v-icon.white--text mdi-pencil-box-outline

            template(v-slot:item.actions="{ item }")
              .d-flex.align-center.mt-3
                v-icon.primary--text.mr-2(@click="") mdi-magnify
                v-icon.primary--text(@click="") mdi-pencil-box-outline

            template(v-slot:footer.page-text)
              PaginateComp
</template>

<script>
import PaginateComp from './PaginateComp.vue'

export default {
  name: 'TableLayout',
  components: {
    PaginateComp
  },
  data () {
    return {
      tab: null,
      tabs: ['Borrowers', 'Business Customers'],
      id: '',
      name: '',
      category: '',
      amount: '',
      status: '',
      purpose: '',
      date: '',
      statusList: [
        'All',
        'Approved',
        'Processing',
        'Rejected'
      ],
      colors: [
        { name: 'Approved', color: '#1F9254', background: '#EBF9F1' },
        { name: 'Processing', color: '#CD6200', background: '#FEF2E5' },
        { name: 'Rejected', color: '#BB0000', background: '#FBE7E8' }
      ],
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
          filter: (value) => {
            if (!this.id) { return true }
            return value === parseInt(this.id)
          }
        },
        {
          text: 'Name',
          align: 'start',
          value: 'name',
          filter: (f) => { return (f + '').toLowerCase().includes(this.name.toLowerCase()) }
        },
        {
          text: 'Loan Product',
          align: 'start',
          value: 'category',
          filter: (f) => { return (f + '').toLowerCase().includes(this.category.toLowerCase()) }
        },
        {
          text: 'Requested Loan Amount',
          align: 'end',
          value: 'amount',
          filter: (value) => {
            if (!this.amount) { return true }
            return value > parseInt(this.amount)
          }
        },
        {
          text: 'Status',
          align: 'center',
          sortable: false,
          value: 'status',
          filter: (f) => {
            if (f !== '') {
              if (this.status.length === 0 || this.status.includes('All')) {
                return true
              }
              const result = this.status.filter(value => f.includes(value))
              if (result.length > 0) {
                return true
              } else {
                return false
              }
            } else {
              return false
            }
          }
        },
        {
          text: 'Purpose',
          align: 'start',
          value: 'purpose',
          filter: (f) => { return (f + '').toLowerCase().includes(this.purpose.toLowerCase()) }
        },
        {
          text: 'Date',
          align: 'center',
          value: 'date',
          filter: (value) => {
            if (!this.date) { return true }
            return value > parseInt(this.date)
          }
        },
        { text: '', align: 'center', sortable: false, value: 'actions' },
        { text: 'Action', align: 'center', sortable: false, value: 'actions' }
      ],
      list: [
        {
          id: 1,
          table: [
            {
              id: '#20462',
              name: 'Nicholas Lee Wen Jie',
              category: 'Personal Loans',
              amount: 17000000,
              date: '13/05/2022',
              logo: 1,
              status: 'Approved',
              purpose: 'House Purchase'
            },
            {
              id: '#18933',
              name: 'Lau Say Heng',
              category: 'Personal Loans',
              amount: 13242100,
              date: '22/05/2022',
              logo: 2,
              status: 'Approved',
              purpose: 'Debt Consolidation'
            },
            {
              id: '#18934',
              name: 'Ray Gan Boon Kit',
              category: 'Personal Loans',
              amount: 13242100,
              date: '22/05/2022',
              logo: 10,
              status: 'Processing',
              purpose: 'House Purchase'
            },
            {
              id: '#18935',
              name: 'Chan Meng Hui',
              category: 'Mortgage Loan',
              amount: 13242100,
              date: '22/05/2022',
              logo: 4,
              status: 'Processing',
              purpose: 'Purchase or refinance a home'
            },
            {
              id: '#18936',
              name: 'Kris Chan Si Han',
              category: 'Credit Card',
              amount: 13242100,
              date: '22/05/2022',
              logo: 5,
              status: 'Approved',
              purpose: 'Debt Collection'
            },
            {
              id: '#18937',
              name: 'Evans Lee Ci Cen',
              category: 'Personal Loans',
              amount: 13242100,
              date: '22/05/2022',
              logo: 6,
              status: 'Processing',
              purpose: 'Other'
            },
            {
              id: '#18938',
              name: 'Khairul bin Ahmad',
              category: 'Personal Loans',
              amount: 13242100,
              date: '22/05/2022',
              logo: 7,
              status: 'Rejected',
              purpose: 'Credit Card'
            },
            {
              id: '#18939',
              name: 'Lau Pei Tong',
              category: 'Personal Loans',
              amount: 13242100,
              date: '22/05/2022',
              logo: 8,
              status: 'Processing',
              purpose: 'Debt Consolidation'
            },
            {
              id: '#18940',
              name: 'Dylan Tan Ze Han',
              category: 'Personal Loans',
              amount: 13242100,
              date: '22/05/2022',
              logo: 9,
              purpose: 'Debt Consolidation',
              status: 'Approved'
            }
          ]
        },
        {
          id: 2,
          table: [
            {
              id: '#20462',
              name: 'Fintech Corporation',
              category: 'Startup Loans',
              amount: 14000000,
              date: '13/05/2022',
              logo: 1,
              status: 'Processing',
              purpose: 'Funding for new businesses'
            },
            {
              id: '#18933',
              name: 'Sunny Global Co.',
              category: 'Business Term Loan',
              amount: 12242100,
              date: '14/05/2022',
              logo: 2,
              status: 'Approved',
              purpose: 'Funding for expansion'
            },
            {
              id: '#18934',
              name: 'Quantum Globe Co.',
              category: 'Franchise Financing',
              amount: 10242100,
              date: '15/05/2022',
              logo: 3,
              status: 'Processing',
              purpose: 'Funding for expansion'
            },
            {
              id: '#18935',
              name: 'Globalify Ltd.',
              category: 'Franchise Financing',
              amount: 32242100,
              date: '15/05/2022',
              logo: 4,
              status: 'Rejected',
              purpose: 'Funding for expansion'
            },
            {
              id: '#18936',
              name: 'Pioneer Group Ltd.',
              category: 'Startup Loans',
              amount: 2252100,
              date: '16/05/2022',
              logo: 5,
              status: 'Approved',
              purpose: 'Funding for new businesses'
            },
            {
              id: '#18937',
              name: 'Vertex Holdings LLC',
              category: 'Startup Loans',
              amount: 32992100,
              date: '16/05/2022',
              logo: 6,
              status: 'Processing',
              purpose: 'Funding for new business'
            },
            {
              id: '#18938',
              name: 'Echelon Capital Ltd.',
              category: 'Equipment Financing',
              amount: 13242100,
              date: '18/05/2022',
              logo: 7,
              status: 'Approved',
              purpose: 'Purchasing of business equipment or machinery'
            },
            {
              id: '#18939',
              name: 'Nexus Group Ltd.',
              category: 'Franchise Financing',
              amount: 30242100,
              date: '22/05/2022',
              logo: 8,
              status: 'Processing',
              purpose: 'Funding for expansion'
            },
            {
              id: '#18940',
              name: 'Evolvation Inc.',
              category: 'Startup Loans',
              amount: 21242100,
              date: '22/05/2022',
              logo: 8,
              status: 'Approved',
              purpose: 'Funding for new businesses'
            }
          ]
        }
      ]
    }
  },
  methods: {
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
    }
  }
}
</script>
<style scoped>
:deep(.v-tabs .v-tabs-bar) {
  background-color: transparent;
}

.v-tab {
  margin: 0 !important;
  font-size: 12px;
}

.v-tab:not(.v-tab--active) {
  border: solid 4px white;
  border-bottom-style: none;
  background-color: #F4F6FB;
  color: #002147;
  padding: 0px 12px;
  margin-top: 8px !important;
}

.v-tab--active {
  background-color: #002147;
  color: white;
  padding: 0px 16px;
  margin-top: 4px !important;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.12) !important;
}

:deep(thead)  {
  background-color: #F4F6FB;
}

:deep(.v-data-table)  {
  overflow: auto !important;
  max-width: 100% !important;
}

:deep(.v-data-table td:nth-child(1)) {
  min-width: 100px;
}

:deep(.v-data-table td:nth-child(2)) {
  min-width: 220px;
}

:deep(.v-data-table td:nth-child(3)) {
  min-width: 200px;
}

:deep(.v-data-table td:nth-child(4)) {
  min-width: 200px;
}

:deep(.v-data-table td:nth-child(5)) {
  min-width: 200px;
}

:deep(.v-data-table td:nth-child(6)) {
  min-width: 300px;
}

:deep(.v-data-table td:last-child) {
  background-color: white;
  position: absolute !important;
  right: 0%;
  width: 88px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.12) !important;
}

:deep(thead th:last-child)  {
  background-color: #F4F6FB;
  position: absolute !important;
  right: 0%;
  width: 88px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.12) !important;
  padding-top: 12px !important;
}

:deep(.v-data-table td:nth-last-child(2),
thead th:nth-last-child(2)) {
  min-width: 88px;
}

.action-field {
  height: 20% !important;
  width: 88px;
}

:deep(.select-category .v-chip .v-chip__content) {
  font-size: 12px !important;
}

:deep(.select-category .v-chip .v-chip__content) {
  font-size: 12px !important;
}

:deep(.v-data-footer__icons-after) {
  display: none;
}

:deep(.v-data-footer__icons-before) {
  display: none;
}

:deep(.v-data-footer__pagination) {
  margin-right: 0px;
}

/* .dflex {
  display: flex !important;
}
.bg-primary {
  background-color: #002147 !important;
}

.bg-orange-50 {
  background-color: #fff7ed !important;
}
.text-orange-700 {
  color: #f97316 !important;
}
.h-70 {
  height: 70px;
}
.low {
  color: #666666;
}
.borderGray {
  border: 2px solid rgba(209, 213, 219, 1) !important;
}
.bg-inactive {
  background-color: #f4f6fb;
} */
</style>
