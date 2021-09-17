// pages/address/address.js
Page({

  data: {
    address:[]
  },

  onLoad: function (options) {
    var that = this
    const db = wx.cloud.database()
    var iduser = wx.getStorageSync('userId')
    if(!(!iduser)){
    db.collection('address').where({
      userid:db.RegExp({
        regexp:iduser,
        options:'i'
      })
    }).get({
      success:function(res){
        console.log(res)
        that.setData({
          address:res.data
        })        
      },
      fail:function(err){
        console.log(err)
      }
    })
  }
  },

  // 获取云数据库中数据
  // getaddress:function(){
   
  // }

})