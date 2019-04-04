// pages/address/address.js
import { $wuxToast } from '../../dist/index'

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLocation: false,
    showDom:false,
    name:"",
    phoneNum:"",
    locationList: ['广州校区','佛山校区'],
    domAreaList: ['赤沙','桃园', '李园', '杏园', '竹园', '桂园', '紫园'],
    location:"广州校区",
    domArea:"赤沙",
    buildingNum:"",
    roomNum:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //传入商品
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  showChooser1: function(){
    this.setData({
      showLocation: true
    })
  },

  //校区选择确认
  Chooser1Confirm:function(e){
    console.log("Chooser1Confirm--->",e);
    const { value } = e.detail
    this.setData({
      showLocation: false,
      location:value
    })
  },

  //校区选择取消
  Chooser1Cancel:function(e){
    console.log("Chooser1Cancel--->", e);
    this.setData({
      showLocation: false
    })
  },

  showChooser2: function () {
    this.setData({
      showDom: true
    })
  },

  //宿舍园区选择确认
  Chooser2Confirm: function (e) {
    console.log("Chooser2Confirm--->", e);
    const { value } = e.detail
    this.setData({
      showDom: false,
      domArea: value
    })
  },

  //宿舍园区选择取消
  Chooser2Cancel: function (e) {
    console.log("Chooser2Cancel--->", e);
    this.setData({
      showDom: false
    })
  },

  //提交表单
  submitForm: function(){
    //校验表单
    const { name, phoneNum, location, domArea, buildingNum, roomNum} = this.data;
    if(name==""){
      $wuxToast().show({
        type: 'forbidden',
        duration: 1500,
        color: '#fff',
        text: '请填写姓名'
      })
      return
    }
    if (phoneNum == "") {
      $wuxToast().show({
        type: 'forbidden',
        duration: 1500,
        color: '#fff',
        text: '请填写手机号'
      })
      return
    }
    if (buildingNum == "") {
      $wuxToast().show({
        type: 'forbidden',
        duration: 1500,
        color: '#fff',
        text: '请填写宿舍楼号'
      })
      return
    }
    if (roomNum == "") {
      $wuxToast().show({
        type: 'forbidden',
        duration: 1500,
        color: '#fff',
        text: '请填写房间号'
      })
      return
    }
    new Promise((reslove,reject)=>{
      var addressJson = {
        'location':location,
        'name':name,
        'phoneNum':phoneNum,
        'domArea':domArea,
        'buildingNum':buildingNum,
        'roomNum':roomNum
      }
      reslove(addressJson)
    }).then((resc)=>{
      // 发起请求，添加数据
      wx.request({
        url: app.globalData.addAddress,
        data: resc,
        header: {
          'token':wx.getStorageSync('_3rd_session')
        },
        method: 'POST',
        dataType: 'json',
        success: function(res) {
          console.log("address.js::Promise--->",res)
          if (res.data.msg = "ADDRESS_ADD_SUCCESS"){
            wx.redirectTo({
              url: '/pages/addressList/addressList',
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })
          }
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    })

  },

  onBlur: function(e){
    //获取当前按钮id
    const{ id } = e.currentTarget.dataset
    const{ value } = e.detail
    switch(id){
      case "name":
        this.setData({
          name: value
        })
        break
      case "phoneNum":
        this.setData({
          phoneNum: value
        })
        break
      case "buildingNum":
        this.setData({
          buildingNum: value
        })
        break
      case "roomNum":
       this.setData({
         roomNum:value
       })
        break
    }
    // console.log(this.data)
  }

})