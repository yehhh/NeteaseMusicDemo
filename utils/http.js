const ip = 'http://127.0.0.1:3000/'

const http = (url, data = {}, method = 'get') => {
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
        reject(err)
      },
      complete (response, statusCode, header) {
        // console.log(response, statusCode, header)
      }
    })
  })
}

module.exports = {
  http: http
}