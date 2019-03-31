// pages/publish/publish.js
import { $wuxToast } from '../../dist/index'
import data from './category'       //导入分类数据
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tempUid:"",
    titleTextHolder: "在此填写宝贝名称，如“小米手机”",                 //titleTextHolder
    detailTextHolder: "在此描述你的宝贝：如品牌、规格、成色、购买渠道、转手原因等",   //detailTextHolder
    /********************** 表单数据 ***********************/
    title: "",       //保存title值
    detail: "",       //保存详情
    location: 0,      //地点
    category: "",     //商品类别
    brand: "",        //品牌
    price:0,          //价格
    fileList: [],     //已上传图片名数组
    coverFileName: "",//封面名称
    /********************** 表单数据 ***********************/
    productLocation:[
      { id: 0, location: "广州校区" ,checked: true },
      { id: 1, location: "三水校区", checked: false },
      ],
    options: data.dd,
    value: [],
    textAreaDisable: false,
    jlTitle:"",
    uploadUrl:getApp().globalData.fileUploadUrl,
    header: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      header: { 'token': wx.getStorageSync("_3rd_session")}
    })
    console.log(data.dd)
  },
  
  //在OnSuccess后触发
  onChange(e) {
    console.log('onChange', e)
    const { file,fileList } = e.detail
    if (file.status === 'uploading') {
      wx.showLoading()
    } else {
      if(fileList.length > 0){
        //过滤状态码不为200的file
        var temp = fileList.map((x) => {
          if (x.res.status != 'error') {
            if (x.res.statusCode == 200) {
              var data = JSON.parse(x.res.data);
              if(data.code == 100200){    //成功保存放进数组
                return data.fileName
              }
            }
          }
          return "ffff"          //出错，用字符串代替
        })
        //更新filelist
        this.setData({
          fileList: temp.filter((x) => { return x != "ffff" })//过滤掉出错的文件名
        })
      }
    }
  },

  //上传成功后触发
  onSuccess(e) {
    console.log('onSuccess', e)
  },

  //上传失败时触发
  onFail(e) {
    console.log('onFail', e)
  },

  //完成后隐藏loading
  onComplete(e) {
    wx.hideLoading()
  },
  
  //点击图片触发
  onPreview(e) {
    console.log('onPreview', e)
    const { file, fileList } = e.detail
    this.setData({
      coverFileName: JSON.parse(file.res.data).fileName,
    })
    console.log(this.data.coverFileName)
    // wx.previewImage({
    //   current: file.url,
    //   urls: fileList.map((n) => n.url),
    // })
  },

  onRemove(e) {
    const { file,fileList } = e.detail
    if (JSON.parse(file.res.data).fileName == this.data.coverFileName){   //若选中图片被删除
      if( fileList.length > 0 ){                                          //有图片则设置第一张为封面
      this.setData({
        coverFileName: JSON.parse(fileList[0].res.data).fileName,
      })
      }
    }
    
    console.log(e)
  },

  //宝贝标题失去焦点
  onTitleBlur(event){
    this.setData({
      title : event.detail.value,
    })
  },
  //宝贝详情描述失去焦点
  onDetailBlur(event){
    this.setData({
      detail: event.detail.value,
    })
  },

  //单选框改变时触发
  onRadioChange(event){
    this.setData({
      location: event.detail.value,
    })
  },

  //级联方法
  onJlOpen() {
    console.log("onJlOpen")
    this.setData({ visible: true })
    this.setData({ textAreaDisable: true })
  },
  onJlClose() {
    console.log("onJlClose")
    this.setData({ visible: false })
    if (this.data.textAreaDisable) {
      this.setData({ textAreaDisable: false })
    }
  },
  onJlChange(e) {
    this.setData({ jlTitle: e.detail.options.map((n) => n.label).join('/') })
    console.log('onJlChange', e.detail)
    //若完成选择，赋值
    if(e.detail.done){
      var category = e.detail.value[0];
      var brand = e.detail.value[1];
      this.setData({
        category: category,
        brand: brand
      })
      console.log(category,brand)
    }
  },

  //价格input失去焦点
  onPriceInputBlur(event){
    //如果填入的不是数字
    if(isNaN(event.detail.value)){
      $wuxToast().show({
        type: 'forbidden',
        duration: 1500,
        color: '#fff',
        text: '填写的价格不合法'
      })
    }else{
      this.setData({
        price: parseInt(event.detail.value),
      })
    }
    console.log("onPriceInputBlur",event)
  },

  //发布按钮点击，提交表单
  onSubmitClick(e){
    console.log(e)
    this.submitForm()
  },

  //生成json数据,提交
  submitForm(){
    var fileNameList = this.data.fileList;
    var coverFileName = (this.data.coverFileName === "") ? fileNameList[0] : this.data.coverFileName;
    var title = this.data.title;
    var detail = this.data.detail;
    var location = this.data.location;
    var category = this.data.category;
    var brand = this.data.brand;
    var price = this.data.price;
    //提示未上传图片
    if(fileNameList.length < 3 ){
      $wuxToast().show({
        type: 'forbidden',
        duration: 1500,
        color: '#fff',
        text: '最少上传3张图片'
      })
      return
    }
    //提示未填写宝贝名称
    if (title == "") {
      $wuxToast().show({
        type: 'forbidden',
        duration: 1500,
        color: '#fff',
        text: '未填写宝贝名称'
      })
      return
    }
    //提示未填写宝贝描述
    if (detail == "") {
      $wuxToast().show({
        type: 'forbidden',
        duration: 1500,
        color: '#fff',
        text: '未填写宝贝描述'
      })
      return
    }
    //提示未选择分类
    if (category == "" || brand == "") {
      $wuxToast().show({
        type: 'forbidden',
        duration: 1500,
        color: '#fff',
        text: '未选择分类'
      })
      return
    }

    //提示未填写价格
    if (price == 0) {
      $wuxToast().show({
        type: 'forbidden',
        duration: 1500,
        color: '#fff',
        text: '未填写价格'
      })
      return
    }
    //提示价格含有非法字符
    if (isNaN(price)) {
      $wuxToast().show({
        type: 'forbidden',
        duration: 1500,
        color: '#fff',
        text: '填写的价格不合法'
      })
      return
    }

    //生成json
    var json = { 
      "coverFileName": coverFileName,
      "fileNameList": fileNameList,
      "title": title,
      "detail": detail,
      "location": location,
      "category": category,
      "brand": brand,
      "price": price,
      "_3rd_session": wx.getStorageSync("_3rd_session")
      }

    wx.request({
      url: getApp().globalData.submitFormUrl,
      data: json,
      header: {
        'token': wx.getStorageSync("_3rd_session")
      },
      method: "POST",
      dataType: "json",
      success(res){
        if (res.data.msg = "ADD_PRODUCT_SUCCESS"){
          wx.redirectTo({
            url: '/pages/index/index',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        }
        },
      fail(res){console.log(res)}
    })
  }
})