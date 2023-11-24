// To generate number in currency RM
export default ({ app }, inject) => {
  inject('formatCurrency', function (value, currency = 'MYR', currencyDisplay = 'narrowSymbol') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      currencyDisplay
    }).format(value / 100)
  })
}
