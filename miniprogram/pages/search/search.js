// pages/shou/shou.js
Page({

  data: {
    notes:[]
  },
  onLoad: function (options) {
  },
//将内容上传到云数据库
  addContent:function(res){
    //console.log(res.detail.value.note)  //测试语句
    var that = this
    var con = res.detail.value.note 
    const db = wx.cloud.database()
    db.collection('Books').where({
     NRJJ:db.RegExp({
        regexp:con,
        options:'i'
      })
    }).get({
       success:function(res){
         console.log(res)
         that.setData({
           notes:res.data
         })
       },
       fail:function(res){
        console.log(err)
       }
     })

  },

  
})