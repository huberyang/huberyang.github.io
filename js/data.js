// 情侣时间线数据。以后有新的纪念日/照片，在这个数组里加一条即可。
// photo 对应 assets/photos/ 目录下的文件名（没有对应图片时会自动显示占位图）。
const TIMELINE = [
  {
    id: "matched",
    date: "2025-12-23",
    title: "心动瞬间 💌",
    desc: "在交友软件上刷到你的照片，忍不住多看了几眼——然后我们匹配上了。",
    photos: ["01-matched.jpg", "01-matched-2.jpg"]
  },
  {
    id: "hello",
    date: "2025-12-24",
    title: "你先鼓起勇气，跟我打了招呼 🙋‍♀️",
    desc: "你先开了口，我却把手机晾在一边——那句「你好」，我隔了好久才看见，差一点错过了认识你的开始。"
  },
  {
    id: "met",
    date: "2025-12-25",
    title: "认识你",
    desc: "看到你的消息，我回复了你，我们的聊天就这样正式开始。从家乡聊到旅行，从小时候的糗事聊到家人——话题一个接一个，好像永远聊不完，也从没冷场过。就这样，我们一点点了解了彼此，也一点点熟络起来。"
  },
  {
    id: "wechat",
    date: "2025-12-26",
    title: "改变阵地到微信",
    desc: "从这天起，我卸载了交友软件，想更认真地了解你——我们的聊天，也从此没有断过。",
    photo: "04-wechat.jpg"
  },
  {
    id: "official",
    date: "2026-01-31",
    title: "确定关系 💑",
    desc: "我们决定，从今以后是彼此的了。",
    photo: "05-official.jpg",
    highlight: true
  },
  {
    id: "first-kiss",
    date: "2026-02-06",
    title: "第一次接吻",
    desc: "一个悄悄记在心里的瞬间。",
    photo: "06-first-kiss.jpg"
  }
];

// 用于首页倒数天数的起点：默认取“确定关系”那天。
const RELATIONSHIP_START = "2026-01-31";
