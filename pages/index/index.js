// pages/abc.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    redirectUrl: app.globalData.productItemRedirectUrl, //组件跳转Url
    imgUrlPrefix:app.globalData.imgUrlPrefix,//图片url前缀
    current: 'home',    //tabBar当前key
    currentTabKey:'mobile',//tab当前key
    currentPage:1,    //分页查询
    currentBtn:"all",    //保存当前按钮id
    isBottom:0,       //标志位，是否到达底部
    screenHeight:0,   //屏幕高度，设置scroll-view高度,onLoad中初始化
    mobileCate: [     //手机品牌
      { id: "apple", name: "苹果" },
      { id: "xiaomi", name: "小米" },
      { id: "huawei", name: "华为" },
      { id: "oppo", name: "OPPO" },
      { id: "vivo", name: "vivo" },
      { id: "samsung", name: "三星" },
      { id: "meizu", name: "魅族" },
      { id: "zte", name: "中兴" },
      { id: "oneplus", name: "一加" },
      { id: "nokia", name: "诺基亚" },
      { id: "other", name: "其他" },
      { id: "all", name: "全部"}   
      ],
    bookCate:[        //图书分类
      { id: "major", name: "专业课" },
      { id: "common", name: "通识课" },
      { id: "other", name: "其他" },
      { id: "all", name: "全部" }
    ],
    padCate:[         //平板电脑分类  
      { id: "apple", name: "iPad" },
      { id: "samsung", name: "三星" },
      { id: "xiaomi", name: "小米" },
      { id: "huawei", name: "华为" },
      { id: "asus", name: "华硕" },
      { id: "google", name: "谷歌" },
      { id: "other", name: "其他" },
      { id: "all", name: "全部" }
    ],        
    laptopCate: [      //笔记本分类  13个
      { id: "apple", name: "苹果" },
      { id: "lenovo", name: "联想" },
      { id: "thinkpad", name: "ThinkPad" },
      { id: "dell", name: "戴尔" },
      { id: "asus", name: "华硕" },
      { id: "huawei", name: "华为" },
      { id: "hp", name: "惠普" },
      { id: "acer", name: "宏碁" },
      { id: "msft", name: "微软" },
      { id: "hessen", name: "神舟" },
      { id: "xiaomi", name: "小米" },
      { id: "other", name: "其他" },
      { id: "all", name: "全部" }
    ],     
    ticketCate:[      //票务卡券分类
      { id: "movie", name: "电影票" },
      { id: "keepfit", name: "健身卡" },
      { id: "ticket", name: "门票" },
      { id: "other", name: "其他" },
      { id: "all", name: "全部" }
    ],     
    clothCate:[       //衣物配饰分类
      { id: "men", name: "男装" },
      { id: "women", name: "女装" },
      { id: "jewelry", name: "首饰" },
      { id: "shoes", name: "鞋子" },
      { id: "other", name: "其他" },
      { id: "all", name: "全部" }
    ],      
    note: [],
    userInfo:"",       //用户头像昵称（我的页面）
    currentTabList:"",
    currentMeTab:"published"   //Me页面当前tab的key  
  },

  //底部navbar点击时触发
  onChange(e) {
    //console.log('onChange', e.detail.key)
    var key = e.detail.key;
    console.log('onChange', e.detail.key)
    if(key == "publish"){
        wx.navigateTo({
          url: '/pages/publish/publish',
        })
      }else {
        this.setData({
          current: e.detail.key,
        })
      }
  },

  onTabChange(e) {
    var that = this
    //点击同一个tab不刷新数据
    const {key} = e.detail
    const {currentTabKey} = this.data
    if(key != currentTabKey){
      console.log('onTabChange', key)
      //更新当前分类标签
      this.setData({
        currentTabKey: key,
      })
      //更新currentBtn为all
      this.setData({
        currentBtn: "all"
      })
      //更新currentPage为1
      this.setData({
        currentPage: 1
      })
      //更新note
      this.getRes(key,1,"all").then((res)=>{
        that.firstTimeReflash(res)
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success(res) {
        that.setData({
          screenHeight:res.windowHeight
        })
      }
    })
    //打印_3rd_session
    console.log("3rd_session",wx.getStorageSync("_3rd_session"))
    var userInfo = wx.getStorageSync("_user_info")
    if(userInfo == ""){
      wx.request({
        url: app.globalData.getUserInfoUrl,
        header: {
          'token':wx.getStorageSync("_3rd_session")
        },
        method: 'POST',
        success: function(res) {
          that.setData({
            userInfo: res.data
          })
          wx.setStorageSync("_user_info", res.data)
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    }else{
      that.setData({
        userInfo:userInfo
      })
    }
  },

  onShow:function(){
    var that = this
    const { currentTabKey, currentPage, currentBtn } = that.data;
    this.getRes(currentTabKey, currentPage, currentBtn).then((res) => {
      that.setData({
        note: res
      })
    })
    //离开再回来时更新列表
    this.refreshMeList(this.data.currentMeTab)

  },

  /**
   * 当scrollerView触及底部触发
   */
  onTouchedBottom: function(e){
    //逻辑：根据当前page值向服务器请求数据，每页10条，若返回数据小于10条，则设置标志位isBottom为1,前段显示已经到底了
    var that = this;
    // console.log("onTouchedBottom::outside");
    if(this.data.isBottom == 0){
      // console.log("onTouchedBottom::inside");
      const { currentTabKey, currentPage, currentBtn } = that.data;
      // console.log(currentPage)
      that.getRes(currentTabKey, currentPage + 1, currentBtn).then((res) => { 
        that.setData({
          currentPage: currentPage+1
        })//currentPage+1
        if(res.length<10){      //返回数据条数<10
          that.setData({
            isBottom:1          //设置触底标记
          })
          // console.log("that.data.currentPage:::->>>",that.data.currentPage)
          var dataList = that.data.note.concat(res)
          return dataList;
        }
       }).then((res)=>{
        //  console.log("onTouchedBottom::then::then----->>", res)
         that.setData({
           note: res
         })
       })
    }
  },
  //点击分类按钮刷新瀑布流
  reflashWaterFall:function(event){
    var that = this
    //设置currentPage为1
    that.setData({
      currentPage: 1
    })
    //获取点击来源,fromtab:分类按钮id，id：品牌按钮id
    const { fromtab,id } = event.currentTarget.dataset;
    const { currentBtn } = this.data
    if(!(currentBtn === id)){
      //更新currentBtn
      this.setData({
        currentBtn : id
      })
      console.log("reflashWaterFall:::before")
      this.getRes(fromtab,1,id).then((res)=>{
        that.firstTimeReflash(res);
      })
    }
  },
  //首次刷新
  firstTimeReflash:function(res){
    console.log("firstTimeReflash::res::length--->>",res.length)
    if (res.length < 10) {    //少于10条数据，设置触底标志为1
      this.setData({
        isBottom: 1
      })
    }else{                    //否则设置触底标志为0
      this.setData({
        isBottom: 0
      })
    }
    console.log("firstTimeReflash::data::isBottom--->>>",this.data.isBottom)
    this.setData({        //更新数据
      note: res
    })
  },
  //向服务器请求数据,返回数据结构如data.note
  getRes:function(currentTabKey,currentPage,currentBtn){
    var jsonData = {
      'category':currentTabKey,
      'brand':currentBtn,
      'page':currentPage
    }
    var result;
    // var that = this;
    return new Promise((reslove,reject)=>{
      wx.request({
        url: app.globalData.reflushWaterFall,
        data: jsonData,
        header: {
          'token': wx.getStorageSync("_3rd_session")
        },
        method: 'POST',
        dataType: 'json',
        success: function (res) {
          reslove(res.data);
        },
        fail: function (res) {
          reject(res);
        },
        complete: function (res) { },
      })
    })
  },

  //商品列表tab更改时
  onMeTabChange:function(e){
    var that = this
    console.log("onMeTabChange",e)
    const{ key } = e.detail
    new Promise((reslove,reject)=>{
      that.setData({
        currentMeTab:key
      })
      reslove()
    }).then((res)=>{
      that.refreshMeList(key)
    })
    
    
  },

  //刷新Me列表
  refreshMeList: function(key){
    var that = this
    switch (key) {
      case 'published':
        that.getPublished().then((res) => {
          that.setData({
            currentTabList: res
          })
        })
        break

      case 'bought':
        that.getBought().then((res) => {
          that.setData({
            currentTabList: res
          })
        })
        break

      case 'sold':
        that.getSold().then((res) => {
          that.setData({
            currentTabList: res
          })
        })
        break

      case 'stared':
        that.getStared().then((res) => {
          that.setData({
            currentTabList: res
          })
        })
        break

    }
  },
  //获取已发布商品列表
  getPublished:function(){
    return new Promise((reslove,reject)=>{
      wx.request({
        url: app.globalData.getPublishedListUrl,
        header: {
          'token':wx.getStorageSync("_3rd_session")
        },
        method: 'POST',
        success: function(res) {
          reslove(res.data)
        },
        fail: function(res) {
          reject(res.data)
        },
        complete: function(res) {},
      })
    })
  },
  //获取售出商品列表
  getBought: function () {
    return new Promise((reslove, reject) => {
      wx.request({
        url: app.globalData.getBoughtListUrl,
        header: {
          'token': wx.getStorageSync("_3rd_session")
        },
        method: 'POST',
        success: function (res) {
          reslove(res.data)
        },
        fail: function (res) {
          reject(res.data)
        },
        complete: function (res) { },
      })
    })
  },

  //获取卖出商品列表
  getSold: function () {
    return new Promise((reslove, reject) => {
      wx.request({
        url: app.globalData.getSoldListUrl,
        header: {
          'token': wx.getStorageSync("_3rd_session")
        },
        method: 'POST',
        success: function (res) {
          reslove(res.data)
        },
        fail: function (res) {
          reject(res.data)
        },
        complete: function (res) { },
      })
    })
  },

  //获取收藏商品列表
  getStared: function () {
    return new Promise((reslove, reject) => {
      wx.request({
        url: app.globalData.getStarListUrl,
        header: {
          'token': wx.getStorageSync("_3rd_session")
        },
        method: 'POST',
        success: function (res) {
          reslove(res.data)
        },
        fail: function (res) {
          reject(res.data)
        },
        complete: function (res) { },
      })
    })
  },


  //点击取消发布按钮，传入商品id
  unpublish: function(e) {
    var that = this
    console.log("unpublish",e)
    const{ id } = e.currentTarget
    wx.request({
      url: app.globalData.unPublishUrl+"?id="+id,
      header: {
        'token':wx.getStorageSync("_3rd_session")
      },
      method: 'POST',
      success: function(res) {
        console.log(res)
        that.refreshMeList(that.data.currentMeTab)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  //点击取消收藏
  unstar:function(e) {
    var that = this
    console.log("unstar",e)
    const { id } = e.currentTarget
    wx.request({
      url: app.globalData.updateStarUrl+"?id="+id+"&action="+"0",
      data: '',
      header: {
        'token':wx.getStorageSync("_3rd_session")
      },
      method: 'POST',
      success: function(res) {
        console.log(res)
        that.refreshMeList(that.data.currentMeTab)
      },
      fail: function(res) {},
      complete: function(res) {},
    })

  }

})