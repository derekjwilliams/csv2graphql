//var parseplus = require('moment-parseplus')
import moment from 'moment'
require('moment-parseplus')

const identityTransform = function(obj) {
  return JSON.parse(JSON.stringify(obj))
}

// month is 1 based, not zero based (which is JS default)
// TODO check for valid y,m,d
function ymdToISODateTransform({ year, month, day }) {
  return `${year}-${month}-${day}`
}

// e.g. 7-jun-18
const unusualDateTransform = function(datestring) {
  return moment(datestring).toDate()
}

export { identityTransform, ymdToISODateTransform, unusualDateTransform }
