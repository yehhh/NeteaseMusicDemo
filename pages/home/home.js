let http = require('../../utils/http.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tab: 1,
    loading: false,
    banner: [],
    personalized: [],
    newsong: [],
    djprogram: [],
    mv: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
  },

  /**
   * 初始化
   */
  init: function () {
    let promises = [
      this.getBanner(),
      this.getPersonalized(),
      this.getNewsong(),
      this.getDjprogram(),
      this.getMv()
    ]
    this.setData({
      loading: true
    })
    Promise.all(promises)
      .then(res => {
        this.setData({
          loading: false
        })
      })
      .catch(() => {
        this.setData({
          loading: false
        })
      })
  },
  /**
   * tab切换
   */
  tapTab: function (e) {
    this.setData({
      tab: e.currentTarget.dataset.tab
    })
  },
  /**
   * 获取banner
   */
  getBanner: function () {
    return http.get('/banner', {type: 1})
      .then(response => {
        this.setData({
          banner: response.banners
        })
      })
      .catch(err => {
      })
  },
  /**
   * banner点击
   */
  tabBanner: function (e) {
    if (e.currentTarget.dataset.url) {
      wx.navigateTo({
        url: '../banner/banner?url=' + encodeURIComponent(e.currentTarget.dataset.url)
      })
    }
  },
  /**
   * 获取推荐歌单
   */
  getPersonalized: function () {
    return http.get('/personalized', {limit: 6})
      .then(response => {
        this.setData({
          personalized: response.result || []
        })
      })
      .catch(err => {
      })
  },
  /**
   * 获取最新音乐
   */
  getNewsong: function () {
    return http.get('/personalized/newsong')
      .then(response => {
        this.setData({
          newsong: response.result || []
        })
      })
      .catch(err => {
      })
  },
  /**
   * 获取主播电台
   */
  getDjprogram: function () {
    return http.get('/personalized/djprogram')
      .then(response => {
        this.setData({
          djprogram: response.result || []
        })
      })
      .catch(err => {
      })
  },
  /**
   * 获取推荐MV
   */
  getMv: function () {
    return http.get('/personalized/mv')
      .then(response => {
        this.setData({
          mv: response.result || []
        })
      })
      .catch(err => {
      })
  }
})