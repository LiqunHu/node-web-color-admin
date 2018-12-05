import CryptoJS from 'crypto-js'
import store from 'store'

// window.Parsley
//     .addValidator('phone', {
//         requirementType: 'string',
//         validateString: function(value, requirement) {
//             if (!requirement) return requirement
//             return /^1[3|4|5|7|8][0-9]\d{8}$/.test(value)
//         },
//         messages: {
//             en: 'input the mobile NO.',
//             'zh-cn': '请输入正确的手机号码'
//         }
//     })

exports.convertBase64StrToArray = function(base64Str) {
  let bytes = window.atob(base64Str) // 去掉url的头，并转换为byte
  // 处理异常,将ascii码小于0的转换为大于0
  let ab = new ArrayBuffer(bytes.length)
  let ia = new Uint8Array(ab)
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  return ab
}

exports.aesEncryptModeCFB = function(msg, pwd) {
  let magicNo = exports.generateRandomAlphaNum(32)

  let key = CryptoJS.enc.Hex.parse(CryptoJS.MD5(pwd).toString())
  let iv = CryptoJS.enc.Hex.parse(magicNo)

  let identifyCode = CryptoJS.AES.encrypt(msg, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }).toString()
  return [magicNo, identifyCode]
}

exports.generateRandomAlphaNum = function(len) {
  let rdmString = ''
  // toSting接受的参数表示进制，默认为10进制。36进制为0-9 a-z
  for (; rdmString.length < len; ) {
    rdmString += Math.random()
      .toString(16)
      .substr(2)
  }
  return rdmString.substr(0, len)
}

exports.clearStoreData = function(key, value) {
  store.clearAll()
}

exports.setStoreData = function(key, value) {
  store.set(key, value)
}

function getStoreData(key) {
  return store.get(key)
}
exports.getStoreData = getStoreData

exports.removeStoreData = function(key) {
  store.remove(key)
}
