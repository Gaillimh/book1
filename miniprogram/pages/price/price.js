// pages/home/home.js
Page({
  data: {
    books:[],
    // order:['asc','desc'],
    // x:['0','1'],
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
  },

  getorderA:function(){
    var that = this;
    const db = wx.cloud.database()
    const _ = db.command
      db.collection('Books').orderBy('price','asc').get({
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

  getorderD:function(){
    var that = this;
    const db = wx.cloud.database()
    const _ = db.command
      db.collection('Books').orderBy('price','desc').get({
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
  }
  
})