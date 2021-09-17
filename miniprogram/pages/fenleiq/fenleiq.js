// pages/fenleiq/fenleiq.js
Page({

  data: {

  },

  onLoad: function (options) {
    var that = this
    var cont = options.name
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('Books').where({
      type:db.RegExp({
        regexp:cont,
        options:'i'
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


})