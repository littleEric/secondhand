// pages/checkOrder/chectorder.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetail:"",
    nginxPrefix: app.globalData.nginxPrefix
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    const id = options.id
    wx.request({
      url: app.globalData.getOrderDetail + "?productId=" + id,
      data:'',
      header: {
        'token':wx.getStorageSync("_3rd_session")
      },
      method: 'POST',
      success: function(res) {
        console.log("checkOrder::onLoad--->",res)
        that.setData({
          orderDetail:res.data
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})