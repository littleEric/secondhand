// pages/abc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'home',    //tabBar当前key
    currentTabKey:'mobile',//tab当前key
    currentPage:1,    //分页查询
    currentBtn:"",    //保存当前按钮id
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
    note: [
      {
        id: 1,
        name: '大脸猫爱吃鱼大脸猫爱吃鱼大脸猫爱吃鱼大脸猫爱吃鱼大脸猫爱吃鱼',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        price: 100,
        location: 1,
        redirect_url:"/pages/logs/logs",
        img_url: 'http://f10.baidu.com/it/u=121654667,1482133440&fm=72',
        avatar_url: 'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg'
      },
      {
        id: 2,
        name: '大脸猫爱吃鱼',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        price: 100,
        location: 0, 
        redirect_url: "/pages/logs/logs",
        img_url: 'http://img3.imgtn.bdimg.com/it/u=1417732605,3777474040&fm=26&gp=0.jpg',
        avatar_url: 'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg'
      },
      {
        id: 2,
        name: '大脸猫爱吃鱼',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        price:100,
        location:0,
        redirect_url: "/pages/logs/logs",
        img_url: 'http://img3.imgtn.bdimg.com/it/u=1417732605,3777474040&fm=26&gp=0.jpg',
        avatar_url: 'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg'
      }, {
        id: 2,
        name: '大脸猫爱吃鱼',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        price: 100,
        location: 0,
        redirect_url: "/pages/logs/logs",
        img_url: 'http://f10.baidu.com/it/u=121654667,1482133440&fm=72',
        avatar_url: 'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg'
      },
      {
        id: 2,
        name: '大脸猫爱吃鱼',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        price: 100,
        location: 1,
        redirect_url: "/pages/logs/logs",
        img_url: 'http://f10.baidu.com/it/u=121654667,1482133440&fm=72',
        avatar_url: 'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg'
      },
      {
        id: 2,
        name: '大脸猫爱吃鱼',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        price: 100,
        location: 1,
        redirect_url: "/pages/logs/logs",
        img_url: 'http://img3.imgtn.bdimg.com/it/u=1417732605,3777474040&fm=26&gp=0.jpg',
        avatar_url: 'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg'
      },
      {
        id: 2,
        name: '大脸猫爱吃鱼',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        price: 100,
        location: 0,
        redirect_url: "/pages/logs/logs",
        img_url: 'http://img4.imgtn.bdimg.com/it/u=2748975304,2710656664&fm=26&gp=0.jpg',
        avatar_url: 'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg'
      }, {
        id: 2,
        name: '大脸猫爱吃鱼',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        price: 100,
        location: 0,
        redirect_url: "/pages/logs/logs",
        img_url: 'http://img2.imgtn.bdimg.com/it/u=1561660534,130168102&fm=26&gp=0.jpg',
        avatar_url: 'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg'
      }
    ]
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

  },

  /**
   * 当scrollerView触及底部触发
   */
  onTouchedBottom: function(e){
    //逻辑：根据当前page值向服务器请求数据，每页10条，若返回数据小于10条，则设置标志位isBottom为1,前段显示已经到底了
    if(this.data.isBottom == 0){
      var abc = {
        name: '大脸猫爱吃鱼',
        title: '你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识你所不知道的红酒知识',
        price: 100,
        location: 0,
        redirect_url: "/pages/logs/logs",
        img_url: 'http://img2.imgtn.bdimg.com/it/u=1561660534,130168102&fm=26&gp=0.jpg',
        avatar_url: 'http://img4.imgtn.bdimg.com/it/u=349345436,3394162868&fm=26&gp=0.jpg'
      }
      var dataList = this.data.note;
      dataList.push(abc);
      this.setData({
        note: dataList
      })
    }
    this.setData({
      isBottom:1
    })
  },
  //点击分类按钮刷新瀑布流
  reflashWaterFall:function(event){
    //console.log(event)
    //获取当前按钮id
    var id = event.currentTarget.dataset.id;
    //更新currentBtn
    this.setData({
      currentBtn : id
    })
    //获取点击来源
    var fromtab = event.currentTarget.dataset.fromtab;
    console.log("reflashWaterFall",fromtab,id)
    //向服务器请求数据，更新note字段

  },
  //向服务器请求数据,返回数据结构如data.note
  getRes:function(currentTabKey,currentPage,currentBtn){

  }
})