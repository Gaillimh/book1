// pages/mine/mine.js
Page({

  data: {
    touxiang:"",
    nicheng:"",
    hiddenone:'',
    hiddentwo:"display:none",
    openid: ''
  },

  onLoad: function (options) {
    this.getOpenid();
  },
  getOpenid(){
    let that = this;
    wx.cloud.callFunction({
      name:'getOpenid',
      complete:res=>{
        console.log('云函数获取到的openid:',res.result.openid)
        var openid = res.result.openid;
        that.setData({
          openid:openid
        })
      }
    })
  },
  huoqu:function(res){
    console.log(res)
    var add = []
    var that = this
    wx.setStorageSync('userId', that.data.openid)
    var userid = wx.getStorageSync('userId')
    console.log(userid) 
    var that = this;
    const db = wx.cloud.database()
    /* 添加 */
    db.collection('user').where({
      _openid:db.RegExp({
        regexp:userid,
        options:'i'
      })
    }).get({
      success(res){
        console.log('查找成功')
        /* add:res */
        if(res == ""){
          db.collection('user').add({ 
            data:{
              _id:userid,
              name:res.detail.userInfo.nickName,
              gouwuche:"",
              shoucang:"",
              daifahuo:"",
              xingming:"",
              dianhua:"",
              dizhi:"",
              xsdz:""
            },
            success:function(res){
              console.log('添加成功')
            },
            failed:function(err){
              console.log('添加失败')
            }
          })
        }
      },
      fail(err){
        console.log(res)
      }
    })



    this.setData({
      touxiang:res.detail.userInfo.avatarUrl,
      nicheng:res.detail.userInfo.nickName,
      userid:res.detail.cloudID,
      hiddenone:'none',
      hiddentwo:""
    })
    console.log(that.data.hiddenone)
  },
tiaozhuan:function(){
  wx.navigateTo({
    url:"../address/address"
  })
},
pinglun:function(){
  wx.navigateTo({
    url:"../pinglun/pinglun"
  })
}
})