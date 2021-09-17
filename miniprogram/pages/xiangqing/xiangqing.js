// pages/xiangqing/xiangqing.js
Page({

  data: {
    books:[],
    shoucang:"../../images/icon/shoucang2.png"
  },

  onLoad: function (options) {
    var userid = wx.getStorageSync('userId')
    var that = this
    const db = wx.cloud.database()
    const _ = db.command
    var cont = options.name
    db.collection('Books').where({
      name:db.RegExp({
        regexp:cont,
        options:'i',
      })
    }).get({
      success(res){
        console.log(res)
        that.setData({
          books:res.data
        })  
      },
      fail(err){
        console.log(err)
      }
    })
  },

  tiao:function(mes){
    getApp().globalData.showDialog = mes.target.dataset.item
    wx.switchTab({
      url: '../car/car'
    })
    },
  shoucang:function(a){
    var that = this
    var image1 = a.target.dataset.name
    var image2 = "../../images/icon/shoucang2.png"
    var image3 = "../../images/icon/shoucang1.png"
    console.log(that.data.shoucang) 
    that.data.shoucang = "../../images/icon/shoucang2.png"
    if(image1 == image2){
      this.setData({
        shoucang:image3
      })
    }else if(image1 == image3){
      this.setData({
        shoucang:image2
      })
    }
    console.log(that.data.shoucang)
  }
})