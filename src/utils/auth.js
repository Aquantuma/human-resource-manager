import Cookies from 'js-cookie'

const TokenKey = 'hr-token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 设置时间戳的变量名
const TimeKey = 'ihrm-timestamp'

// 设置时间戳
export function setTimeStamp() {
  return Cookies.set(TimeKey, new Date().getTime())
}

// 获取时间戳
export function getTimeStamp() {
  return Cookies.get(TimeKey)
}
