import sha1 from 'crypto-js/sha1'
import axios from 'axios'
import { Loading } from 'element-ui'
import Router from '../router'
import { APIMAP } from './ApiMap'

axios.defaults.baseURL = process.env.API_HOST
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 20000
const nonceStr = () => {
  const len = 6
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const maxPos = chars.length
  let str = ''
  for (let i = 0; i < len; i++) {
    str += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return str
}

const initApiConfig = (key, params) => {
  let url = APIMAP[key]
  if (params && params['uid'] && url.indexOf(':uid') > -1) {
    return url.replace(':uid', params['uid'])
  } else if (url.indexOf(':uid') > -1) {
    return url.replace(':uid', '')
  }
  return url
}

// loading
let loadingInstance

axios.interceptors.request.use((config) => {
  if (config.url === 'haisinConsistencyCheck/check' || config.url === 'haisinConsistencyCheck/editing/sokujiHaisin' || config.url === 'haisinConsistencyCheck/yotei/sokujiHaisin') {
    config.timeout = 60000
  } else {
    config.timeout = 20000
  }
  if ((config.params && config.params.hl) || (config.data && config.data.hl)) {

  } else {
    loadingInstance = Loading.service({
      text: '',
      background: 'rgba(255, 255, 255, 0.2)'
    })
  }

  const timestamp = Date.parse(new Date())
  const nonce = nonceStr()
  const signParams = {
    timestamp: timestamp,
    nonce: nonce,
    signature: sha1(timestamp + nonce + process.env.API_SIGNATURE_KEY).toString()
  }
  if (config.method === 'get' || config.method === 'delete') {
    config.params = Object.assign(config.params || {}, signParams)
  } else {
    config.data = Object.assign(config.data || {}, signParams)
  }
  if (localStorage.getItem('admin_token')) {
    config.headers['Api-Access-Token'] = localStorage.getItem('admin_token')
  }
  return config
}, (error) => {
  if (loadingInstance) loadingInstance.close()
  return Promise.reject(error)
})

axios.interceptors.response.use((res) => {
  if (loadingInstance) loadingInstance.close()
  if (res.data.code === 301 || res.data.code === 302) {
    Router.replace({
      path: '/login'
    })
    return
  }
  return res
}, (error) => {
  if (loadingInstance) loadingInstance.close()
  return Promise.reject(error)
})

export default {
  get: (key, params) => {
    const url = initApiConfig(key, params)
    return axios.get(url, { params: params })
  },

  post: (key, data) => {
    const url = initApiConfig(key, data)
    return axios.post(url, data)
  },

  put: (key, data) => {
    const url = initApiConfig(key, data)
    return axios.put(url, data)
  },

  delete: (key, params) => {
    const url = initApiConfig(key, params)
    return axios.delete(url, { params: params })
  },

  download: (key, params) => {
    const url = initApiConfig(key, params)
    return axios({
      url: url,
      params: params,
      method: 'GET',
      responseType: 'blob'
    })
  }
}
