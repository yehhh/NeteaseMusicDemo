const isDev = true

const ip = isDev ? 'http://127.0.0.1:3000' : 'http://bbhh.ltd:3000'

function http(url, data = {}, method = 'get') {
  return new Promise((resolve, reject) => {
    wx.request({
      url: ip + url,
      data: data,
      method: method,
      header: {
        'content-type': 'application/json'
      },
      success (response) {
        if (response.statusCode == 200) {
          resolve(response.data)
        } else {
          reject(response)
        }
      },
      fail(err){
        /**
         * 不知道什么时候才算失败
         */
        console.warn(err)
        wx.showToast({
          title: '请求异常' + err.errMsg,
          icon: 'none',
          duration: 2000
        })
        reject(err)
      },
      complete (response, statusCode, header) {
        // console.log(response, statusCode, header)
      }
    })
  })
}

function get(url, data) {
  return http(url, data, 'get')
}

module.exports = {
  http: http,
  get: get
}