'use strict'

const flatTypes = [String, Number, Boolean]

const isFlat = val => {
  return flatTypes.indexOf(val.constructor) !== -1
}

const isDefined = val => {
  return val !== null && val !== undefined
}

const truncate = (obj, maxDepth, curDepth) => {
  curDepth = curDepth || 0
  maxDepth = (isDefined(maxDepth)) ? maxDepth : 10

  if (curDepth < maxDepth) {
    const newDepth = curDepth + 1

    if (isFlat(obj)) {
      return obj
    } else if (Array.isArray(obj)) {
      const newArr = []
      obj.map(value => {
        if (isFlat(value)) {
          newArr.push(value)
        } else {
          newArr.push(truncate(value, maxDepth, newDepth))
        }
      })
      return newArr
    } else {
      const newObj = {}
      for (var key in obj) {
        if (isFlat(obj[key])) {
          newObj[key] = obj[key]
        } else {
          newObj[key] = truncate(obj[key], maxDepth, newDepth)
        }
      }
      return newObj
    }
  }
}

module.exports = truncate
