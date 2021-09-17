Page({
  data: {
    books1:[],
    books2:[],
    books3:[],
    books4:[],
    books5:[],
    books6:[],
    type:['文学','艺术','历史','传记','神话','小说']
  },

  onLoad: function (options) {
  this.gettype(this.data.type[0])
  this.gettype(this.data.type[1])
  this.gettype(this.data.type[2])
  this.gettype(this.data.type[3])
  this.gettype(this.data.type[4])
  this.gettype(this.data.type[5])

    wx.setNavigationBarTitle({
      title: '首页',
    })
  },

  gettype:function(type){
    var that = this;
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('Books').where({
      type:db.RegExp({
        regexp:type,
        options:'i'
      })
        // type:'文学/艺术'
    }).get({
      success(res){
        // console.log(res)
        if(type == that.data.type[0]){
        that.setData({
          books1:res.data
        })}
        else if(type == that.data.type[1]){
          that.setData({
            books2:res.data
          })}
          else if(type == that.data.type[2]){
            that.setData({
              books3:res.data
            })}
            else if(type == that.data.type[3]){
              that.setData({
                books4:res.data
              })}
              else if(type == that.data.type[4]){
                that.setData({
                  books5:res.data
                })}
                else {
                  that.setData({
                    books6:res.data
                  })}
      },
      fail(err){
        console.log(err)
      }
    })
  }

  
})