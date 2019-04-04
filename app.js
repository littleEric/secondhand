//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // wx.setStorageSync('token', 'd27846d56770428cb542d66f9d6c57a0')
    
  },
  globalData: {
    userInfo: "",
    currentOpItemId:"",     //当前操作的商品id
    currentAddress:"",        //当前选中地址
    fileUploadUrl: "http://192.168.2.171:8080/product/publish/uploadpic",     //上传路径
    submitFormUrl: "http://192.168.2.171:8080/product/publish/add",     //商品发布url
    loginUrl: "http://192.168.2.171:8080/wxlogin",          //登录获取_3rd_session
    productItemRedirectUrl: "/pages/productInfo/productInfo",    //点击首页商品跳转页面
    imgUrlPrefix:"http://192.168.2.171:7888/",//图片资源url前缀
    reflushWaterFall:"http://192.168.2.171:8080/index/productlist",//刷新瀑布流url
    getDetailUrl:"http://192.168.2.171:8080/product/getiteminfo",//商品详情请求Url,onLoad中不生效
    updateStarUrl:"http://192.168.2.171:8080/product/updateStar",  //更新收藏链接
    addAddress:"http://192.168.2.171:8080/address/add",       //添加地址链接
    getAddressList:"http://192.168.2.171:8080/address/getlist",    //获取地址列表
    getLocationList:"http://192.168.2.171:8080/address/getlocationlist",   //获取校区列表
    getDomAreaList:"http://192.168.2.171:8080/address/getdomarealist",     //获取园区列表
    submitOrderUrl:"http://192.168.2.171:8080/order/add",          //提交订单地址
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
                console.log("app.js::getUserInfo->",res);
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
                const _3rd_session_exist = wx.getStorageSync("_3rd_session");
                // console.log("_3rd_session_exist->", _3rd_session_exist)
                if (_3rd_session) {
                  //缓存_3rd_session
                  wx.setStorageSync("_3rd_session", _3rd_session)
                }
                if(("" == _3rd_session_exist)){                //如果是首次登录则跳转
                    wx.redirectTo({             //登录成功，跳转到主页
                    url: '/pages/index/index',
                  })
                }

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