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
    title: "鼓起勇气打招呼 🙋",
    desc: "发出了第一句话，等你回复的时候心跳有点快。",
    photo: "02-hello.jpg"
  },
  {
    id: "met",
    date: "2025-12-25",
    title: "认识你",
    desc: "正式认识的日子，从此记住了这一天。",
    photo: "03-met.jpg"
  },
  {
    id: "wechat",
    date: "2025-12-26",
    title: "加了微信",
    desc: "从这天起，我们的聊天就没有断过。",
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
