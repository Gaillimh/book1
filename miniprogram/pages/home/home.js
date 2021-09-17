// pages/home/home.js
Page({
  data: {
    books:[]
  },
  onLoad: function (options) {
    var that = this;
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('Books').get({
      success(res){
        console.log(res)
        that.setData({
          books:res.data
        })
      },
      fail(err){
        console.log(err)
      }
    }),
    
    wx.setNavigationBarTitle({
      title: '首页',
    })

  }
  
})