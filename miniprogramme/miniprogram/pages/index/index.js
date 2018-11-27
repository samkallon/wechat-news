//index.js
const app = getApp()
const ClassificationMap = {
  "国内" : 'gn',
  '国际' : 'gj',
  '财经' : 'cj',
  '娱乐' : 'yl',
  '军事' : 'js',
  '体育' : 'ty',
  '其他' : 'other'
}
Page({
  data: {
    Classification: [
    { "classification": "国内" }, 
    { "classification": "国际" },
    { "classification": "财经" },
    { "classification": "娱乐" },
    { "classification": "军事" },
    { "classification": "体育" },
    { "classification": "其他" },
    ],
    ClassNow : 'gn',
    TodayNews: []
  },

  ChangeClassification:function(e){
    //获取当前点击的类别名,缩写
    let ClassificationNow = ClassificationMap[e.currentTarget.dataset.classification]
    
    console.log(this.ClassNow)
    
    this.setData({
      ClassNow : ClassificationNow
    })
    //获取当前类别的新闻
    this.getClassifiedNews(ClassificationNow);

    
    
  },

  getClassifiedNews(type1){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data:{
        type: type1
      },
      success: res=>{
        console.log(res)
        let result = res.data.result
        this.getList(result)
      }
    })
  },

  getList(result){  
    let length = result.length
    let TodayNews = []
    for(let i = 0; i < length; i++){
      let list = result[i]
      TodayNews.push({
        title : list.title,
        time : list.date.slice(11,19),
        source : list.source,
        firstImage : list.firstImage + '.jpg'
      })
    }
    this.setData({
      TodayNews:TodayNews
    })
  },
  onLoad: function() {
 
   
    
  }
})