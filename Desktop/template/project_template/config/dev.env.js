'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_HOST: '"http://stg.kousensys.com.cn/sdposadminapi/v1/"',
  API_SIGNATURE_KEY: '"sd-pos"'
})
