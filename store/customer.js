export const state = () => ({
  customer: null,
  list: [
    {
      id: 1,
      table: [
        {
          id: 'A18932',
          name: 'Nicholas Lee Wen Jie',
          category: 'Personal Loans',
          amount: 15000000,
          date: '13/05/2022',
          logo: 1,
          status: 'Approved',
          purpose: 'House Purchase',
          phone: '+6016-800 1231',
          email: 'nicholas@gmail.com',
          creditScore: 760
        },
        {
          id: 'A18933',
          name: 'Lau Say Heng',
          category: 'Personal Loans',
          amount: 13000000,
          date: '06/05/2022',
          logo: 2,
          status: 'Approved',
          purpose: 'Debt Consolidation',
          phone: '+6014-123 1111',
          email: 'sayheng@gmail.com',
          creditScore: 790
        },
        {
          id: 'A18934',
          name: 'Ray Gan Boon Kit',
          category: 'Personal Loans',
          amount: 16500000,
          date: '19/05/2022',
          logo: 10,
          status: 'Processing',
          purpose: 'House Purchase',
          phone: '+6012-482 2911',
          email: 'raygan@gmail.com',
          creditScore: 804
        },
        {
          id: 'A18935',
          name: 'Tan Meng Heng',
          category: 'Mortgage Loan',
          amount: 12000000,
          date: '16/05/2022',
          logo: 4,
          status: 'Processing',
          purpose: 'Purchase or refinance a home',
          phone: '+6012-899 8922',
          email: 'meng@gmail.com',
          creditScore: 612
        },
        {
          id: 'A18936',
          name: 'Kris Chan Si Han',
          category: 'Credit Card',
          amount: 14000000,
          date: '17/05/2022',
          logo: 5,
          status: 'Approved',
          purpose: 'Debt Collection',
          phone: '+6014-232 2221',
          email: 'kris@gmail.com',
          creditScore: 712
        },
        {
          id: 'A18937',
          name: 'Evans Lee Ci Cen',
          category: 'Personal Loans',
          amount: 13800000,
          date: '22/04/2022',
          logo: 6,
          status: 'Processing',
          purpose: 'Other',
          phone: '+6017-122 6744',
          email: 'evans@gmail.com',
          creditScore: 634
        },
        {
          id: 'A18938',
          name: 'Khairul bin Ahmad',
          category: 'Personal Loans',
          amount: 17600000,
          date: '21/01/2022',
          logo: 7,
          status: 'Rejected',
          purpose: 'Credit Card',
          phone: '+6012-111 3223',
          email: 'khairul@gmail.com',
          race: 'Malay',
          creditScore: 567
        },
        {
          id: 'A18939',
          name: 'Lau Pei Tong',
          category: 'Personal Loans',
          amount: 12200000,
          date: '23/06/2022',
          logo: 8,
          status: 'Processing',
          purpose: 'Debt Consolidation',
          phone: '+6016-376 9888',
          email: 'peitong@gmail.com',
          creditScore: 744
        },
        {
          id: 'A18940',
          name: 'Dylan Tan Ze Han',
          category: 'Personal Loans',
          amount: 10800000,
          date: '12/06/2022',
          logo: 9,
          purpose: 'Debt Consolidation',
          status: 'Approved',
          phone: '+6016-877 6554',
          email: 'dylan@gmail.com',
          creditScore: 722
        }
      ]
    },
    {
      id: 2,
      table: [
        {
          id: 'B18931',
          name: 'Fintech Corporation',
          category: 'Startup Loans',
          amount: 30000000,
          date: '13/05/2022',
          logo: 1,
          status: 'Processing',
          purpose: 'Funding for new businesses'
        },
        {
          id: 'B18933',
          name: 'Sunny Global Co.',
          category: 'Business Term Loan',
          amount: 35000000,
          date: '14/05/2022',
          logo: 2,
          status: 'Approved',
          purpose: 'Funding for expansion'
        },
        {
          id: 'B17934',
          name: 'Quantum Globe Co.',
          category: 'Franchise Financing',
          amount: 28000000,
          date: '15/05/2022',
          logo: 3,
          status: 'Processing',
          purpose: 'Funding for expansion'
        },
        {
          id: 'B15935',
          name: 'Globalify Ltd.',
          category: 'Franchise Financing',
          amount: 19500000,
          date: '15/05/2022',
          logo: 4,
          status: 'Rejected',
          purpose: 'Funding for expansion'
        },
        {
          id: 'B18236',
          name: 'Pioneer Group Ltd.',
          category: 'Startup Loans',
          amount: 21800000,
          date: '16/05/2022',
          logo: 5,
          status: 'Approved',
          purpose: 'Funding for new businesses'
        },
        {
          id: 'B28937',
          name: 'Vertex Holdings LLC',
          category: 'Startup Loans',
          amount: 22500000,
          date: '16/05/2022',
          logo: 6,
          status: 'Processing',
          purpose: 'Funding for new business'
        },
        {
          id: 'B18922',
          name: 'Echelon Capital Ltd.',
          category: 'Equipment Financing',
          amount: 19800000,
          date: '18/05/2022',
          logo: 7,
          status: 'Approved',
          purpose: 'Purchasing of business equipment or machinery'
        },
        {
          id: 'B48939',
          name: 'Nexus Group Ltd.',
          category: 'Franchise Financing',
          amount: 27100000,
          date: '22/05/2022',
          logo: 8,
          status: 'Processing',
          purpose: 'Funding for expansion'
        },
        {
          id: 'B56940',
          name: 'Evolvation Inc.',
          category: 'Startup Loans',
          amount: 34900000,
          date: '22/05/2022',
          logo: 8,
          status: 'Approved',
          purpose: 'Funding for new businesses'
        }
      ]
    }
  ]
})

export const getters = {
  getCustomer (state) {
    return state.customer
  },
  getList (state) {
    return state.list
  },
  getCustomerById: state => (id) => {
    let l = state.list[0]
    if (id.startsWith('B')) {
      l = state.list[1]
    }
    // console.log(l)
    return l.table.find(customer => customer.id === id)
  }
}

export const mutations = {
  updateCustomer (state, customer) {
    state.customer = customer
    console.log(state.customer)
  },
  updateLoanStatus (state, { c: customer, s: status }) {
    let l = state.list[0]
    if (customer.id.startsWith('B')) {
      l = state.list[1]
    }
    // console.log(l)
    const selectedCustomer = l.table.find(c => c.id === customer.id)
    selectedCustomer.status = status
  }
}

export const actions = {
  viewCustomer ({ commit }, customer) {
    commit('updateCustomer', customer)
  },
  changeLoanStatus ({ commit }, { c: customer, s: status }) {
    commit('updateLoanStatus', { c: customer, s: status })
  }
}
