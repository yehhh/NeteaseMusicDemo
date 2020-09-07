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

     //后台播放音乐
     const backgroundAudioManager = wx.getBackgroundAudioManager()
     backgroundAudioManager.title = '此时此刻'
     backgroundAudioManager.epname = '此时此刻'
     backgroundAudioManager.singer = '许巍'
 
     backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
     // 设置了 src 之后就会自动播放，若此处不设置src默认将为空字符串，当设置了src可以播放音乐
     backgroundAudioManager.src = 'http://m801.music.126.net/20200428225332/b7a2e204340ff44851c8e5c647d6d40c/jdymusic/obj/w5zDlMODwrDDiGjCn8Ky/2271670289/c0b0/f3fe/1454/c885b45b4324c8a9d6f1e53b88c7e1fc.mp3' 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },

  onHide: function (){
    console.log(1)
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