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
    //点击同一个tab不刷新数据
    if(e.detail.key != this.data.currentTabKey){
      console.log('onTabChange', e.detail.key)
      this.setData({
        currentTabKey: e.detail.key,
      })
      //更新currentBtn为all
      this.setData({
        currentBtn: "all"
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
    console.log(that.data);
    const { currentTabKey, currentPage, currentBtn } = that.data;
    that.getRes(currentTabKey, currentPage, currentBtn).then((res) => { that.setData({
      note: res
    }) })
    //打印_3rd_session
    console.log("3rd_session",wx.getStorageSync("_3rd_session"))
  },

  /**
   * 当scrollerView触及底部触发
   */
  onTouchedBottom: function(e){
    //逻辑：根据当前page值向服务器请求数据，每页10条，若返回数据小于10条，则设置标志位isBottom为1,前段显示已经到底了
    var that = this;
    if(this.data.isBottom == 0){
      const { currentTabKey, currentPage, currentBtn } = that.data;
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
          that.setData({
            note:dataList
          })
        }
       })
    }
    this.setData({
      isBottom:1
    })
  },
  //点击分类按钮刷新瀑布流
  reflashWaterFall:function(event){
    //获取点击来源,fromtab:分类按钮id，id：品牌按钮id
    const { fromtab,id } = event.currentTarget.dataset;
    if(!(this.data.currentBtn === fromtab)){
      //更新currentBtn
      this.setData({
        currentBtn : id
      })
    }
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
  }
})