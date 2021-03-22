import Api from './Api'
import {Message} from 'element-ui'
// 复活api
let doRecovery = config => {
  let url = config.haisinId ? 'haisinRecovery' : ''
  let subItem = {
    id: config.id
  }
  if (config.haisinId) {
    subItem.haisinId = config.haisinId
  }
  Api.post(url, subItem).then(res => {
    if (res.data.code) {
      this.$message.error(res.data.errors.message)
      return
    }
    config.func()
  })
}

// 复活api
let doSpecialRecovery = config => {
  let url = config.haisinId ? 'adminCommonSpecialRecovery' : ''
  let subItem = {
    id: config.id,
    classType: config.classType
  }
  if (config.haisinId) {
    subItem.haisinId = config.haisinId
  }
  Api.post(url, subItem).then(res => {
    if (res.data.code) {
      this.$message.error(res.data.errors.message)
      return
    }
    config.func()
  })
}

// 权限验证Api
let powerCheck = (_this) => {
  let url = 'commonLoginRoleCheck'
  let subItem = {
    roleCode: localStorage.getItem('admin_roleCode'),
    functionId: JSON.parse(localStorage.getItem('admin_idList'))
  }
  Api.post(url, subItem).then(res => {
    if (res.data.code) {
      if ('errors' in res.data) {
        _this.$message.error(res.data.errors.message)
      } else if (res.data.code === 999) {
        _this.$message.error(res.data.message)
      }
      return
    }
    if (res.data.data === false) {
      _this.$message.error(_this.$t('error.POWER_CHECK'))
      _this.$router.push('/login')
    }
  })
}

// 金额正则
let ReplaceNumber = (s, type) => {
  if (type === 'number') {
    // 只能输入纯数字
    return s.replace(/[^\d]/g, '')
  }
  if (type === 'displayOrder') {
    // 只能输入1-9的纯数字
    s = s.replace(/^[0 a-z A-Z]+[0-9]*$/g, '')
    s = s.replace(/[^\d]/g, '')
  } else {
    // 只能输入含有小数点的金额数字
    s = s.replace(/[^0-9.]/g, '').trim()
    let reg = new RegExp(/([0-9]+\.[0-9]{2})[0-9]*/g)
    if (reg.test(s)) {
      let i = s.indexOf('.')
      s = s.slice(0, i + 3)
    }
  }
  // s = s.replace(/[^\d.]/g, '')
  // // 必须保证第一个为数字而不是.
  s = s.replace(/^\./g, '')
  // // 保证只有出现一个.而没有多个.
  // s = s.replace(/\.{3,}/g, '')
  // // 保证.只出现一次，而不能出现两次以上
  s = s.replace('.', '$#$').replace(/\./g, '')
    .replace('$#$', '.')
  // // 限制几位小数
  return s
}

// 小数点后保留4位小数
let decimalNumber = (n) => {
  if (n.indexOf('.') === -1 && n.length > 8) n = n.slice(0, n.length - 1)
  n = n.replace(/[^0-9.]/g, '').trim()
  let reg = new RegExp(/([0-9]+\.[0-9]{5})[0-9]*/g)
  if (reg.test(n)) {
    let i = n.indexOf('.')
    n = n.slice(0, i + 5)
  }
  // 不能以.开头
  n = n.replace(/^\./g, '')
  // . 只出现一次,不能出现两次及以上
  n = n.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
  return n
}

let RespMesError = res => {
  if (res.data.code) {
    if ('errors' in res.data) {
      Message.error(res.data.errors.message)
    } else if (res.data.code === 999) {
      Message.error(res.data.message)
    }
    return true
  }
  return false
}
let fmoney = (s, n) => {
  if (!s) return 0
  return s.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}

let sSet = (name, val) => {
  sessionStorage.setItem(name, val)
}

let sGet = (name) => {
  sessionStorage.getItem(name)
}

let sRemove = (name) => {
  sessionStorage.removeItem(name)
}

export default {
  doRecovery,
  ReplaceNumber,
  fmoney,
  RespMesError,
  sSet,
  sGet,
  sRemove,
  decimalNumber,
  powerCheck,
  doSpecialRecovery
}
