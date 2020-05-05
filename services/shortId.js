const shortid = require('shortid')

export function getShortId () {
  shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@')
  const _id = shortid.generate()
  return _id.substr(0, 3) + '-' + _id.substr(3)
}
