// pages/search/search.js
Page({

  data: {
    count:[],
    pric:[],
    bookb:[]
  },
  onLoad: function (options) {
    var pricc = []
    var countt = []
    var that = this
    var bookc = []
    var userid = wx.getStorageSync('userId')
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('dingdan').where({
      user:db.RegExp({
        regexp:userid,
        options:'i'
      })
    }).get({
      success:function(res){
      /*   console.log(res.data) */
        
        for(var index in res.data){
        /*   console.log(res.data[index]) */
          var booka = []
          var a = 0
          var b = 0
          for(var j in res.data[index].name){
        /*     console.log(res.data[index].count[j])
            console.log(res.data[index].price[j]) */
            a += res.data[index].count[j]
            b += res.data[index].count[j]*res.data[index].price[j]
            var str = {
              'name':res.data[index].name[j],
              'count':res.data[index].count[j],
              'image':res.data[index].image[j],
              'price':res.data[index].price[j],
              'nrjj':res.data[index].nrjj[j],
            }
            booka.push(str)
          }
        bookc.push(booka)
        /* console.log(b.toFixed(2)) */
        countt.push(a)
        pricc.push(b.toFixed(2))
        }
        console.log(pricc)
        console.log(countt)
        that.setData({
          pric:pricc,
          bookb:bookc,
          count:countt
        })
      }
    })
   
  },


})


