// pages/loading/loading.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {      //已授权,调用wx.checkSession
          wx.checkSession({
            success: function(res) {
              //session未过期
              wx.redirectTo({
                url: '/pages/index/index',
              })
            },
            fail: function(res) {
              //session过期
              app.wxLogin();
            },
            complete: function(res) {},
          })
        }else{            //未授权，初次登录，跳转到授权页面
          wx.redirectTo({
            url: '/pages/authBtn/authbtn'
          })
        }
      }
    })
  }
})