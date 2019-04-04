// pages/addressList/addressList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:"",    //从服务器返回地址列表
    domAreaList:"",    //宿舍园区列表
    locationList:""    //校区列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRes()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  //从服务器返回地址列表
  getRes: function() {
    var that = this
    new Promise((reslove,reject)=>{
      wx.request({
        url: app.globalData.getAddressList,
        data: '',
        header: {
          'token':wx.getStorageSync('_3rd_session')
        },
        method: 'POST',
        success: function(res) {
          console.log(res)
          that.setData({
            addressList: res.data
          })
          reslove();
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    }).then((rest)=>{
        return new Promise((reslove, reject) => {
          wx.request({
            url: app.globalData.getLocationList,
            data: '',
            method: 'POST',
            success: function (res) {
              var temp = []
              res.data.forEach((x) => {
                return temp[x.id] = x.name
              })
              that.setData({
                locationList: temp
              })
              wx.setStorageSync("locationList", temp)
              console.log("temp",temp)
              reslove()
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        })
    }).then((resc)=>{
      wx.request({
        url: app.globalData.getDomAreaList,
        method: 'POST',
        success: function(res) {
          var temp = []
          res.data.forEach((x)=>{
            return temp[x.id] = x.name
          })
          console.log(temp)
          that.setData({
            domAreaList:temp
          })
          wx.setStorageSync("domAreaList", temp)
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    })
  },

  //地址项点击时触发
  onCellClick: function(e) {
    app.globalData.currentAddress = this.data.addressList[e.currentTarget.dataset.index]
    console.log("onCellClick::::", this.data.addressList[e.currentTarget.dataset.index])
    wx.redirectTo({
      url: '/pages/order/order',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  //添加地址按钮触发
  addAddress: function() {
    wx.redirectTo({
      url: '/pages/address/address',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})