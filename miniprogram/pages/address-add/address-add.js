const app = getApp();
const db = wx.cloud.database();
Page({

 
  data: {
    // address:[]
    address:'',
    name:'',
    phone:'',
    sendInfo: '', 
    userMessage: ''
  },

  onLoad: function (options) {
    
  },

  name1: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  phone1: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  address1: function (e) {
    this.setData({
      address: e.detail.value
    })
  },



  upData: function (e) {
    console.log(e) 
    var id = wx.getStorageSync('userId')
    if(!(!id)){
    db.collection('address').add({
      data:{
        userid:id,
        name: this.data.name,
        phone: this.data.phone,
        address: this.data.address,
      },

      success:res=>{
        console.log(res);
      },
      fail:err=>{
        console.log(err);
      }
    })
  }
  },

  cleanInput: function() { 
    var setMessage = { sendInfo: this.data.name }       
    this.setData(setMessage) 
}
 
})