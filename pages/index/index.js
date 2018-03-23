//index.js
//获取应用实例
const app = getApp()
var Parser = require("../../lib/xmldom/dom-parser");


Page({
  data: {
    rootUrl:"https://cn.bing.com",
    imageUrl:"",
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'http://cn.bing.com/HPImageArchive.aspx?idx=0&n=1',
      method:'GET',
      header: {
      'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.code != 0) {
          var xmlParser = new Parser.DOMParser();
          var doc = xmlParser.parseFromString(res.data);
          var url = doc.getElementsByTagName("url")[0].firstChild.nodeValue;//获取节点名字为url的值
          var imageUrl = that.data.rootUrl+url;
          that.setData({
            imageUrl: imageUrl
          });
        }
      }
      
    })

  }
})
