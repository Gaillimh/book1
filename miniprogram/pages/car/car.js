// pages/shopcart/shopcart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all:[],
    zhi:[],
    pri:[],
    t:1,
    qty:0,
    'goodList': [
    ],
    'checkAll': true,
    'totalCount': 0,
    'totalPrice': 0,
  
  },
  onShow: function(){
    this.onLoad();
    console.log(this.data.goodList)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var a = []
    var b = []
    var userid = wx.getStorageSync('userId')
    var that = this
    var c = getApp().globalData.showDialog
    const db = wx.cloud.database()
    const _ = db.command
    if(!(!userid)){
    db.collection('user').where({
      _id:db.RegExp({
        regexp:userid,
        options:'i'
      })
    }).get({
      success(res){
        a = res.data[0].gouwuche.split(',')
        var i = 0;
        if(!(!c)){
          for (i;i<a.length;i++) {
            if(a[i] == c){
              break
            }
            if(a[i] == ''&& c !=''){
              a[i] = c
            }
          }
          if(i >=a.length &&a[i] != c){
            console.log(a)
            var str = ""
            for(var index in a){
              str += a[index].toString()+','
            }
            db.collection('user').where({
              _id:db.RegExp({
                regexp:userid,
                options:'i'
              })
            }).update({
              data:{
                gouwuche:str
              },
              success:function(res){
                console.log('添加成功')
              },
              failed:function(err){
                console.log('添加失败')
              }
            })
          }
        }

       /*  输出 */
        console.log(a)
        for (var index in a) {
          if(a[index] == ""){
            break
          }
          db.collection('Books').where({
            name:db.RegExp({
              regexp:a[index],
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
                'count': 1,
                'checked': false
              }
              b.push(str)
              console.log('b',b)
              that.setData({
                  goodList:b,
              }) 
             }
            },
            fail(err){
              console.log(err)
            }
          })
      }

        var nu
        if(a.length > 0){
          if(a[a.length-1] != ""){
            nu = a.length
          }else{
             nu = a.length-1
          }

        }else{
          nu = 0
        }
        that.setData({
          qty:nu
        })  
      },
      fail(err){
        console.log(err)
      }
    })
  }
  },
  bianji:function(res){
    console.log(res.currentTarget.dataset.id)
    var b = res.currentTarget.dataset.id
    if(b == 0){
      this.setData({
        t:1
      })
    }else if(b == 1){
      this.setData({
        t:0
      })
    }
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

  /**
   * 用户点击商品减1
   */
  subtracttap: function (e) {
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

  /**
   * 用户点击商品加1
   */
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
  /**
   * 用户选择购物车商品
   */
  checkboxChange: function (e) {
    this.data.all =  e.detail.value
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    var checkboxItems = this.data.goodList;
    var values = e.detail.value;
    for (var i = 0; i < checkboxItems.length; ++i) {
      checkboxItems[i].checked = false;
      for (var j = 0; j < values.length; ++j) {
        if (checkboxItems[i].isbn == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }
    var checkAll = false;
    if (checkboxItems.length == values.length) {
      checkAll = true;
    }
    this.setData({
      'goodList': checkboxItems,
      'checkAll': checkAll
    });
    console.log(this.data.checkAll)
    this.calculateTotal();

  },

  /**
   * 用户点击全选
   */
  selectalltap: function (e) {
    console.log('用户点击全选，携带value值为：', e.detail.value);
    var value = e.detail.value;
    var checkAll = false;
    if (value && value[0]) {
      checkAll = true;
    }

    var goodList = this.data.goodList;
    for (var i = 0; i < goodList.length; i++) {
      var good = goodList[i];
      good['checked'] = checkAll;
    }

    this.setData({
      'checkAll': checkAll,
      'goodList': goodList
    });
    this.calculateTotal();
  },

  dele:function(){
    var b = []
    var name=""
    var t = ""
    var goodList = this.data.goodList;
    var that = this
    const db = wx.cloud.database()
    var userid = wx.getStorageSync('userId')
    console.log(userid)
    for (var i = 0; i < goodList.length; i++) {
      var good = goodList[i];
      console.log(good)
      if(good.checked){
        name += good.name+','
      }
    }
    db.collection('user').where({
      _id:db.RegExp({
        regexp:userid,
        options:'i'
      })
    }).get({
      success(res){
        
        t = res.data[0].gouwuche.split(',')
        name = name.split(',')
        for(var index in t){
          for(var i in name){
            if(t[index] == name[i]){
              t[index] = ""
            }
          }
        }
        console.log(t)
        console.log(name)
      for(var index in t){
        if(t[index] == ''){
          t.splice(index, 1);
        }
      }
      name = ""
      for(var index in t){
        if(t[index] != ''){
          name += t[index] + ','
        }
      }
      for (var index in t) {
        
          if(t[index] == ""){
            break
          }
          console.log('aaaaa')
          console.log(t[index])
          console.log('aaaaa')
          db.collection('Books').where({
            name:db.RegExp({
              regexp:t[index],
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
                'count': 1,
                'checked': false
              }
              b.push(str)
              var nu
              if(t.length > 0){
                if(t[t.length-1] != ""){
                  nu = t.length
                }else{
                   nu = t.length-1
                }
              }else{
                nu = 0
              }
                that.setData({
                  qty:nu,
                  goodList:b,
              }) 
             }
            },
            fail(err){
              console.log(err)
            }
          })
      }
      console.log(name)
        db.collection('user').where({
          _id:db.RegExp({
            regexp:userid,
            options:'i'
          })
        }).update({
          data:{
            gouwuche:name
          },
          success:function(res){
            console.log('删除成功')
          },
          failed:function(err){
            console.log('删除失败')
          }
        })
      },
      fail(err){
        console.log(err)
      }
    })
  },
  jiesuan:function(){
    var that = this
    var c = []
    var j = 0
    var good = that.data.goodList
    var All = []
    for(var index in good){
      console.log(good[index].checked)
      if(good[index].checked == true){
        All.push(good[index].isbn)
        c.push(good[index].count)
      }
    }
    console.log('goood',good)
    console.log('all', All)
    console.log('c',c)
     wx.navigateTo({
      url: '../dingdan/dingdan?all='+All+'&c='+c,
    }) 
  }
})