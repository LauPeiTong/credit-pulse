// To generate list from json
export default ({ app }, inject) => {
  inject('strToList', function (jsonString) {
    return JSON.parse(jsonString.replace(/'/g, '"').replace(/"\[/g, '[').replace(/\]"/g, ']'))
  })
}
