let http = require('../../utils/http.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tab: 1,
    banner: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBanner()
  },

  /**
   * 方法
   */
  tapTab: function (e) {
    this.setData({
      tab: e.currentTarget.dataset.tab
    })
  },
  getBanner: function () {
    http.http('banner', {type: 1}, 'get')
      .then(response => {
        this.setData({
          banner: response.banners
        })
      })
      .catch(err => {
      })
  }
})