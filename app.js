//app.js
const tomcatPrefix = "http://192.168.2.171:8080/"
const nginxPrefix = "http://192.168.2.171:7888/"
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // wx.setStorageSync('token', '43a3f65b8b674530b8913d04f05faaa9')
    
  },
  globalData: {
    userInfo: "",
    currentOpItemId:"",     //当前操作的商品id
    currentAddress:"",        //当前选中地址
    nginxPrefix:nginxPrefix,    //全局nginx前缀
    fileUploadUrl: tomcatPrefix + "product/publish/uploadpic",     //上传路径
    submitFormUrl: tomcatPrefix + "product/publish/add",     //商品发布url
    loginUrl: tomcatPrefix + "wxlogin",          //登录获取_3rd_session
    productItemRedirectUrl: "/pages/productInfo/productInfo",    //点击首页商品跳转页面
    imgUrlPrefix:nginxPrefix,//图片资源url前缀
    reflushWaterFall: tomcatPrefix + "index/productlist",//刷新瀑布流url
    getDetailUrl: tomcatPrefix + "product/getiteminfo",//商品详情请求Url
    updateStarUrl: tomcatPrefix + "product/updateStar",  //更新收藏链接
    unPublishUrl: tomcatPrefix + "me/unpublish",    //取消发布
    addAddress: tomcatPrefix + "address/add",       //添加地址链接
    getAddressList: tomcatPrefix + "address/getlist",    //获取地址列表
    getLocationList: tomcatPrefix + "address/getlocationlist",   //获取校区列表
    getDomAreaList: tomcatPrefix + "address/getdomarealist",     //获取园区列表
    submitOrderUrl: tomcatPrefix + "order/add",          //提交订单地址
    getUserInfoUrl: tomcatPrefix + "me/getuserinfo",       //获取用户头像
    getPublishedListUrl: tomcatPrefix + "me/getpublishedlist",   //获取已发布商品列表
    getBoughtListUrl: tomcatPrefix + "me/getboughtlist",   //获取已购买商品列表
    getSoldListUrl: tomcatPrefix + "me/getsoldlist",   //获取已卖出商品列表
    getStarListUrl: tomcatPrefix + "me/getstarlist",    //获取已收藏商品列表
    getOrderDetail: tomcatPrefix + "order/detail"     //订单详情
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