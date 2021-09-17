Page({  
  data: {  
    addres:'',
    t:1,
    qty:1,
    goodList: [
    ],
// 使用data数据对象设置样式名  
    minusStatus: 'disabled',
    'checkAll': false,
    'totalCount': 0,
    'totalPrice': 0,
  },  

  onLoad: function (options) {
    var that = this
    var pric = 0
    console.log('all',options.all)
    console.log('c',options.c)
    var all = options.all.split(',')
    var c = options.c.split(',')
    var b = []
    var userid = wx.getStorageSync('userId')
    const db = wx.cloud.database()
    const _ = db.command
    var i = 0
    db.collection('address').where({
      userid:db.RegExp({
        regexp:userid,
        options:'i'
      })
    }).get({
      success:function(res){
        console.log(res)
        if(res.data.length >0){
          console.log('显示')
          that.setData({
            t:0,
            address:res.data,
            addres:res.data.address
          }) 
        }else{
          console.log('不显示')
          that.setData({
            t:1,
          })  
        }     
      },
      fail:function(err){
        console.log(err)
      }
    })
    for(var index in all){
        if(all[index] == ""){
            break
          }
          db.collection('Books').where({
            isbn:db.RegExp({
              regexp:all[index],
              options:'i'
            })
          }).get({
            success(res){
                if(res != ""){
                    var str ={
                      'name': res.data[0].name,
                      'author': res.data[0].author,
                      'isbn': res.data[0].isbn,
                      'cover': res.data[0].photo,
                      'desc': res.data[0].NRJJ,
                      'press': res.data[0].type,
                      'price': res.data[0].price,
                      'count': parseInt(c[i]),
                      'checked': true
                    }
                    pric += res.data[0].price * parseInt(c[i])
                    i+=1
                    b.push(str)
                   /*  console.log('b',b) */
                    that.setData({
                        totalCount:i,
                        totalPrice:pric.toFixed(2)  ,
                        goodList:b
                    }),console.log(that.data.goodList)
                   }  
            },
            fail(err){
              console.log(err)
            }
          })
    } 
  },
  addtap: function (e) {
    var index = e.target.dataset.index;
    var goodList = this.data.goodList;
    var count = goodList[index].count;
    goodList[index].count++;
    this.setData({
      'goodList': goodList
    });
    this.calculateTotal();
  },
  calculateTotal: function () {
    var goodList = this.data.goodList;
    var totalCount = 0;
    var totalPrice = 0;
    for (var i = 0; i < goodList.length; i++) {
      var good = goodList[i];
      if (good.checked) {
        totalCount += good.count;
        totalPrice += good.count * good.price;
      }
    }
    totalPrice = totalPrice.toFixed(2);
    this.setData({
      'totalCount': totalCount,
      'totalPrice': totalPrice
    })
  },
  /* 点击减号 */  
  bindMinus: function(e) {  
      var index = e.target.dataset.index;
      var goodList = this.data.goodList;
      var count = goodList[index].count;
      if (count <= 1) {
        return;
      } else {
        goodList[index].count--;
        this.setData({
          'goodList': goodList
        });
        this.calculateTotal();
      }
  },  
  /* 点击加号 */  
bindPlus: function(e) {  
    var index = e.target.dataset.index;
    var goodList = this.data.goodList;
    var count = goodList[index].count;
    goodList[index].count++;
    this.setData({
      'goodList': goodList
    });
    this.calculateTotal();
  },  
  /* 输入框事件 */  
zhifu:function(){
  var c = []
  var that = this
  var arr = ""
  var d = []
  var e = []
  var f = []
  var j = 0
  var good = that.data.goodList
  var All = []
  for(var index in good){
    console.log(good[index].checked)
    if(good[index].checked == true){
      All.push(good[index].name)
      c.push(good[index].count)
      d.push(good[index].cover)
      e.push(good[index].desc)
      f.push(good[index].price)
    }
  }
  var userid = wx.getStorageSync('userId')
  const db = wx.cloud.database()
  const _ = db.command
  console.log(All)
  db.collection('user').where({
    _id:db.RegExp({
      regexp:userid,
      options:'i'
    })
  }).get({
    success(res){
      console.log(res.data[0].gouwuche)
      var name = res.data[0].gouwuche.split(',')
      for(var index in name){
        for(var i in All){
          if(name[index] == All[i]){
            name.splice(index,1)
          }
        }
      }
      console.log(name)
      for(var index in name){
        if(name[index] != ""){
           arr += name[index]+','
        }
      }
      console.log('arr',arr)
      db.collection('user').where({
        _id:db.RegExp({
          regexp:userid,
          options:'i'
        })
      }).update({
        data:{
          gouwuche:arr
        },success(res){
          console.log('aaaaaa')
          wx.switchTab({
            url: '../mine/mine?name='+All+'&c='+'c'
          })
        }
      })
    }
  })
  var time = new Date()
  var date = time.getFullYear()+'/'+time.getMonth()+'/'+time.getDay()+' '+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds()
  db.collection('dingdan').add({ 
    data:{
      image:d,
      name:All,
      count:c,
      price:f,
      nrjj:e,
      user:userid,
      zhuangtai:false,
      pric:this.data.totalPrice,
      address:this.data.addre,
      time:date
    },
    success:function(res){
      console.log('添加成功')
    },
    failed:function(err){
      console.log('添加失败')
    }
  })
}
}) 