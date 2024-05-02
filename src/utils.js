// import _ from 'lodash';
import { isFunction, isString } from 'lodash'

// Boostrap Toast
export const toast = (vue, variant, title, msg) => {
  vue.$bvToast.toast(msg, {
    title: title,
    variant: variant,
    solid: true
  })
}

// Convert data to array options for a select field
export const toOptions = (data, key) => {
  return data.reduce((list, element) => [...list, {
    value: element[key.value],
    text: element[key.text]
  }], [])
}

// Date Format
export const dateFormat = date => {
  return new Date(new Date(date) - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .replace(/-/g, '/').replace('T', ' - ')
    .replace('Z', '').slice(0, -4)
}

// Access object by string
export const get = (obj, str) => str.split('.').reduce((q, v) => q?.[v], obj)

// Object Filter
export const objectFilter = (obj, func) => Object.keys(obj).filter(func).reduce((res, key) => ({ ...res, [key]: obj[key] }), {})

// Unwrap Object from function or Clone Object it self
export const unwrap = (f, args) => isFunction(f) ? f(args) : { ...f }

// Replace params with object
export const replaceParams = (urn, obj) => Object.keys(obj || {}).reduce((s, key) => s.replaceAll(':' + key, obj[key]), urn)

export const arrayToString = v => isString(v) ? v : `[${v.map(s => `'${s}'`).join(', ')}]`
