let http = require('../../utils/http.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    url: '',
    lyric: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id || '1407599316'
    })
    this.getUrl()
    this.getDetail()
    this.getLyric()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },

  /**
   * 获取歌曲url
   */
  getUrl: function () {
    http.get('/song/url', {id: this.data.id})
      .then(res => {
        res.data && this.setData({
          url: res.data[0].url
        })
      })
  },
  /**
   * 获取歌曲详情
   */
  getDetail: function () {
    http.get('/song/detail', {ids: this.data.id})
      .then(res => {
        this.setData({
          detail: res.songs[0]
        })
      })
  },
  /**
   * 获取歌词
   */
  getLyric: function () {
    http.get('/lyric', {id: this.data.id})
      .then(res => {
        this.setData({
          lyric: res.lrc.lyric
        })
      })
  },



  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  },
  audio14: function () {
    this.audioCtx.seek(14)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  }
})