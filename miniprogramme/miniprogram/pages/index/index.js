//index.js
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
  //数据
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
    TodayNews: [],
    HotNews: {}
  },
  //下拉刷新
  onPullDownRefresh() {
    this.getClassifiedNews(this.data.ClassNow,() =>{
      wx.stopPullDownRefresh()
    })
  },
  //准备跳转到第二个页面
  getClickdetail:function(e) {
    
    let DetailNow = e.currentTarget.dataset.idname
    //console.log(DetailNow)
    this.onTapdetail(DetailNow)
  },
  //点击热点新闻跳转到详情页面
  GetHotDetail(){
    let ID = this.data.HotNews.id
    this.onTapdetail(ID)
  },
  //点击上方不同的新闻类别,刷新当前页面新闻
  ChangeClassification:function(e){
    //获取当前点击的类别名,并转化为缩写
    let ClassificationNow = ClassificationMap[e.currentTarget.dataset.classification]
    //console.log(this.data.ClassNow)
    this.setData({
      ClassNow : ClassificationNow
    })
    //获取当前类别的新闻
    this.getClassifiedNews(ClassificationNow);
  },
  //调用API
  getClassifiedNews(type1,callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data:{
        type: type1
      },
      success: res=>{
        console.log(res)
        let result = res.data.result
        this.getList(result)
        //console.log(this.data.TodayNews)
      },
      complete: ()=>{
        callback && callback()
      }
    })
  },
  //将result放如Data中
  getList(result){  
    /*把获得的该类新闻放入TodayNews中*/ 
    let length = result.length
    let TodayNews = []
    let HotNews = result[0]
    this.setData({
      HotNews: HotNews
    })
    /*i从1开始,第0条新闻被拿去做热点*/
    for(let i = 1; i < length; i++){
      let list = result[i]
      TodayNews.push({
        ID : list.id,
        title : list.title,
        time : list.date.slice(11,19),
        source : list.source,
        firstImage : list.firstImage /*+ '.jpg'*/
      })
    }
    this.setData({
      TodayNews:TodayNews
    })
  
  },
  //自动运行
  onLoad: function() {
    this.getClassifiedNews(this.data.ClassNow);
  },

  //跳转函数
  onTapdetail(detail){
    /*跳入第二个页面并传递参数?后面的id*/
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + detail,
    })
  }
})