// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textarea:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  bindinput:function(e){
    this.setData({
      textarea: e.detail.value
    })
  },
  bindButtonTap: function () {
    console.log(this.data.textarea.replace(/\n/g, "、"))
    wx.setClipboardData({
      data: this.data.textarea.replace(/\n/g, "、"),
      success(res) {
      }
    })
  }
})