import axios from 'axios'
import { errorFormater } from '@/commons/utils'

export const api = axios.create({
  // baseURL: 'http://127.0.0.1:8000/api',
  // https://api.englishfluencyprogram.com.br/api/
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://api.englishfluencyprogram.com.br/api/'
    : 'https://api.dev.englishfluencyprogram.com.br/api/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export const behavior = (method, urn, body, onSuccess, onFailure, multipart) => {
  // Map Request Methods
  const request = {
    post: api.post,
    put: api.put,
    get: api.get,
    delete: api.delete
  }[method]

  // Request Call
  const call = body
    ? multipart
      ? request(urn, body, { headers: { 'Content-Type': 'multipart/form-data' } }) // Multipart
      : request(urn, body) // Create, Update
    : request(urn) // Read

  // Response
  call.then(response => {
    if ([200, 201, 204].includes(response.status)) {
      onSuccess(response)
    }
  }, error => {
    onFailure(errorFormater(error))
    return Promise.reject(error)
  })
}

// Map methods for ease function calls
export const request = {
  post: (urn, body, onSuccess, onFailure, multipart) => behavior('post', urn, body, onSuccess, onFailure, multipart),
  put: (urn, body, onSuccess, onFailure) => behavior('put', urn, body, onSuccess, onFailure),
  get: (urn, onSuccess, onFailure) => behavior('get', urn, null, onSuccess, onFailure),
  delete: (urn, onSuccess, onFailure) => behavior('delete', urn, null, onSuccess, onFailure)
}
