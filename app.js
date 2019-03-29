//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
  },
  globalData: {
    userInfo: "",
    fileUploadUrl: "http://192.168.2.171:8080/publish/uploadpic",     //上传路径
    submitFormUrl: "http://192.168.2.171:8080/publish/add",     //商品发布url
    loginUrl: "http://192.168.2.171:8080/wxlogin",          //登录获取_3rd_session
  },
  //登录授权
  wxLogin: function () {
    var that = this
    wx.login({
      success: function (res) {
        const { code } = res
        if (res.code) {               //获取code，向服务器请求3rd_session
          //获取用户数据，已授权才会执行
          new Promise(function (reslove, reject) {
            wx.getUserInfo({
              success: function (res) {
                const { userInfo } = res;
                console.log("app.js/getUserInfo:",res);
                //设置全局userInfo
                that.globalData.userInfo = userInfo;
                reslove(userInfo);
              },
              fail: function (res) { reject("getUserInfo", "failed!") },
            })
          }).then(function (res) {
            wx.request({          //请求成功后传入userInfo
              url: that.globalData.loginUrl,
              data: {
                code: code,
                userInfo: res
              },
              method: "POST",
              success: resp => {
                console.log("wx.request.success", resp)
                const{statusCode} = resp
                const{_3rd_session} = resp.data
                
                if (_3rd_session) {
                  //缓存_3rd_session
                  wx.setStorageSync("_3rd_session", _3rd_session)
                }
                wx.redirectTo({             //登录成功，跳转到主页
                  url: '/pages/index/index',
                })
              }
            })
          }).catch(function (reason) {
            console.log(reason)
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})