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

exports.convertBase64StrToArray = function (base64Str) {
  let bytes = window.atob(base64Str) // 去掉url的头，并转换为byte
  // 处理异常,将ascii码小于0的转换为大于0
  let ab = new ArrayBuffer(bytes.length)
  let ia = new Uint8Array(ab)
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  return ab
}

exports.aesEncryptModeCFB = function (msg, pwd) {
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

exports.generateRandomAlphaNum = function (len) {
  let rdmString = ''
  // toSting接受的参数表示进制，默认为10进制。36进制为0-9 a-z
  for (; rdmString.length < len;) {
    rdmString += Math.random().toString(16).substr(2)
  }
  return rdmString.substr(0, len)
}

exports.clearStoreData = function (key, value) {
  store.clearAll()
}

exports.setStoreData = function (key, value) {
  store.set(key, value)
}

function getStoreData(key) {
  return store.get(key)
}
exports.getStoreData = getStoreData

exports.removeStoreData = function (key) {
  store.remove(key)
}

exports.dealErrorCommon = function (obj, res) {
  let response = res.response
  if (response) {
    if (response.status > 699 && response.status < 800) {
      console.log('700 error')
      // BootstrapDialog.show({
      //   title: '<i class= "fa fa-fw fa-info-circle"></i><strong>错误信息</strong>',
      //   cssClass: 'modal-danger',
      //   message: '<i class="text-warning fa fa-fw fa-warning" style="font-size: 40px"></i>' + response.data.msg,
      //   buttons: [{
      //     label: '<i class= "fa fa-fw fa-close"></i>关闭',
      //     cssClass: 'btn-outline',
      //     action: function (dialogItself) {
      //       dialogItself.close()
      //     }
      //   }]
      // })
    } else if (response.status === 404) {
      obj.$router.push({
        path: '/common/system/error404'
      })
    } else if (response.status === 401) {
      if (response.data.errno === -2) {
        obj.$store.dispatch('setError', {
          errCode: '从其他地方登录',
          errMsg: '从其他地方登录'
        })
      } else {
        obj.$store.dispatch('setError', {
          errCode: '未经授权：访问由于凭据无效被拒绝',
          errMsg: '未经授权：访问由于凭据无效被拒绝'
        })
      }

      obj.$router.push({
        path: '/common/system/error401'
      })
    } else {
      obj.$store.dispatch('setError', {
        errCode: response.status,
        errMsg: response
      })
      obj.$router.push({
        path: '/common/system/error'
      })
    }
  } else {
    console.log(res)
  }
}

exports.dealAlertCommon = function (obj, response) {
  if (response.status > 699 && response.status < 800) {
    console.log('700 error')
    alert(response.data.msg)
  } else if (response.status > 401) {
    obj.$router.push({
      path: '/system/error401'
    })
  } else {
    console.log(response.data)
    obj.setError(response.status, response.data.description)
    obj.$router.push({
      path: '/system/error'
    })
  }
}

exports.dealConfrimCommon = function (message, callbackFunc) {
  // BootstrapDialog.confirm({
  //   title: '<i class= "fa fa-fw fa-info-circle"></i><strong>确认信息</strong>',
  //   message: '<i class="text-warning fa fa-fw fa-question-circle" style="font-size: 40px"></i>' + message,
  //   cssClass: 'modal-primary',
  //   btnOKLabel: '确认',
  //   btnOKClass: 'btn-info',
  //   btnCancelLabel: '取消',
  //   btnCancelClass: 'btn-cancel',
  //   callback: function (result) {
  //     if (result) {
  //       callbackFunc()
  //     }
  //   }
  // })
}

exports.dealSuccessCommon = function (message) {
  // var dlg = BootstrapDialog.show({
  //   title: '<i class= "fa fa-fw fa-info-circle"></i><strong>提示信息</strong>',
  //   cssClass: 'modal-success',
  //   message: '<i class="tex t-warning glyphicon glyphicon-ok" style="font-size: 40px"></i>' + message,
  //   buttons: [{
  //     label: '<i class= "fa fa-fw fa-close"></i>关闭',
  //     cssClass: 'btn-info ',
  //     action: function (dialogItself) {
  //       dialogItself.close()
  //     }
  //   }]
  // })
}

exports.dealPromptCommon = function (message) {
  // BootstrapDialog.show({
  //   title: '<i class= "fa fa-fw fa-info-circle"></i><strong>提示信息</strong>',
  //   cssClass: 'msg-dialog',
  //   message: '<i class="text-warning fa fa-fw fa-warning" style="font-size: 40px"></i>' + message,
  //   buttons: [{
  //     label: '<i class= "fa fa-fw fa-close"></i>关闭',
  //     cssClass: 'btn-info',
  //     action: function (dialogItself) {
  //       dialogItself.close()
  //     }
  //   }]
  // })
}

exports.dealWarningCommon = function (message) {
  // BootstrapDialog.show({
  //   title: '<i class= "fa fa-fw fa-info-circle"></i><strong>警告信息</strong>',
  //   cssClass: 'modal-warning',
  //   message: '<i class="text-warning fa fa-fw fa-warning" style="font-size: 40px"></i>' + message,
  //   buttons: [{
  //     label: '<i class= "fa fa-fw fa-close"></i>关闭',
  //     cssClass: 'btn-outline',
  //     action: function (dialogItself) {
  //       dialogItself.close()
  //     }
  //   }]
  // })
}
