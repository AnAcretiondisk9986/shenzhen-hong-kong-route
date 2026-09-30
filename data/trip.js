export const trip = {
  title: "深圳 × 香港 · 国庆 3 日路线",
  subtitle: "10/1 20:14 抵深 · 核心行程至 10/4 08:00 · 10/4 11:13 返温州南",
  bounds: [
    [113.87, 22.15],
    [114.31, 22.65]
  ],
  center: [114.08, 22.42],
  tickets: [
    {
      code: "D2281",
      date: "10/1",
      route: "温州南 13:07 → 深圳北 20:14",
      seat: "07车 01F"
    },
    {
      code: "D2424",
      date: "10/4",
      route: "深圳北 11:13 → 温州南 18:18",
      seat: "01车 09D"
    }
  ],
  days: {
    1: {
      label: "10/1 夜游",
      shortLabel: "10/1",
      color: "#2F7BF6",
      maxZoom: 14
    },
    2: {
      label: "10/2 深圳",
      shortLabel: "10/2",
      color: "#F28C28",
      maxZoom: 12.8
    },
    3: {
      label: "10/3 香港",
      shortLabel: "10/3",
      color: "#2E9D62",
      maxZoom: 12.5
    },
    4: {
      label: "10/4 返程",
      shortLabel: "10/4",
      color: "#9B6DE3",
      maxZoom: 14
    }
  },
  stops: [
    {
      id: "sz-north-arrive",
      day: 1,
      name: "深圳北站",
      time: "20:14 抵达",
      coordinates: [114.0293, 22.6104],
      transport: "D2281 于 13:07 从温州南出发，20:14 抵达深圳北。",
      note: "出站后直接坐地铁或打车进福田，先放下行李再开始夜游。",
      tags: ["铁路到达", "07车 01F"],
      kind: "rail"
    },
    {
      id: "civic-center-night",
      day: 1,
      name: "市民中心",
      time: "20:40–21:20",
      coordinates: [114.0664, 22.5414],
      transport: "地铁 4→2 号线约 35 分钟，打车约 25 分钟。",
      note: "看福田 CBD 夜景和中轴建筑群，这是当晚最稳的夜景开场。",
      tags: ["夜景", "城市建筑"],
      kind: "city"
    },
    {
      id: "ping-an",
      day: 1,
      name: "平安金融中心",
      time: "21:20–22:10",
      coordinates: [114.0538, 22.5365],
      transport: "地铁或短途打车约 15 分钟。",
      note: "看高楼建筑与福田灯光；是否能登观景台以现场开放和排队情况为准。",
      tags: ["高楼", "夜景"],
      kind: "building"
    },
    {
      id: "coco-park",
      day: 1,
      name: "COCO Park",
      time: "22:10–23:00",
      coordinates: [114.0521, 22.5359],
      transport: "从平安金融中心短打车或步行。",
      note: "晚餐、逛街和夜生活。建议住宿放在福田，约 23:00 回酒店。",
      tags: ["晚餐", "夜生活", "住宿区域"],
      kind: "food"
    },
    {
      id: "lianhuashan",
      day: 2,
      name: "莲花山公园",
      time: "08:30–10:00",
      coordinates: [114.0577, 22.5552],
      transport: "从福田住宿出发，地铁或打车约 20 分钟。",
      note: "看福田 CBD 全景。大雨时取消，直接去深业上城。",
      tags: ["晴天首选", "雨天取消", "城市全景"],
      rain: "skip",
      kind: "view"
    },
    {
      id: "civic-center-day",
      day: 2,
      name: "市民中心",
      time: "10:00–10:40",
      coordinates: [114.0664, 22.5414],
      transport: "从莲花山打车或地铁约 10 分钟。",
      note: "顺路看城市建筑和中轴景观，时间紧时可以在这里压缩 20 分钟。",
      tags: ["建筑", "顺路"],
      kind: "city"
    },
    {
      id: "upperhills",
      day: 2,
      name: "深业上城",
      time: "10:40–12:30",
      coordinates: [114.0614, 22.5629],
      transport: "打车约 10 分钟。",
      note: "商业街、建筑和露台空间，午餐在这里解决。",
      tags: ["商业区", "午餐"],
      kind: "food"
    },
    {
      id: "shenzhen-bay-park",
      day: 2,
      name: "深圳湾公园",
      time: "13:30–15:30",
      coordinates: [113.943, 22.497],
      transport: "打车约 25 分钟。",
      note: "沿海边散步。小雨可继续，大雨缩短海边时间。",
      tags: ["海边", "雨天缩短"],
      rain: "short",
      kind: "coast"
    },
    {
      id: "houhai",
      day: 2,
      name: "后海",
      time: "15:30–16:30",
      coordinates: [113.9416, 22.516],
      transport: "地铁或打车约 15 分钟。",
      note: "看后海现代 CBD，顺路感受深圳湾超级总部基地周边建筑。",
      tags: ["现代建筑", "CBD"],
      kind: "city"
    },
    {
      id: "bay-mixc",
      day: 2,
      name: "深圳湾万象城",
      time: "16:30–18:30",
      coordinates: [113.9383, 22.509],
      transport: "从后海步行或短打车。",
      note: "吃饭和购物。下雨时尽量把下午剩余时间都放在室内。",
      tags: ["晚餐", "购物", "雨天优先"],
      kind: "food"
    },
    {
      id: "sea-world",
      day: 2,
      name: "海上世界",
      time: "19:00–22:00",
      coordinates: [113.9193, 22.4881],
      transport: "地铁约 20 分钟。",
      note: "夜景、餐饮和夜生活。当天累或下大雨时直接取消。",
      tags: ["夜景", "可取消", "雨天取消"],
      rain: "skip",
      kind: "night"
    },
    {
      id: "futian-port",
      day: 3,
      name: "福田口岸",
      time: "06:30–07:15",
      coordinates: [114.0694, 22.5192],
      transport: "地铁 4/10 号线或打车到口岸。",
      note: "福田口岸通关时间 06:30–22:30，国庆客流建议预留 45 分钟。",
      tags: ["跨境", "06:30 开放"],
      kind: "border"
    },
    {
      id: "lok-ma-chau",
      day: 3,
      name: "落马洲",
      time: "07:15–07:40",
      coordinates: [114.0674, 22.5149],
      transport: "过关后步行和接驳进入东铁线。",
      note: "转东铁线往九龙方向，尽量避开最晚返程时段。",
      tags: ["香港入境", "东铁线"],
      kind: "border"
    },
    {
      id: "central-midlevels",
      day: 3,
      name: "中环 · 半山",
      time: "09:30–12:00",
      coordinates: [114.158, 22.2819],
      transport: "东铁线转荃湾线约 60 分钟。",
      note: "路线：中环 → 皇后大道中 → 半山自动扶梯 → 半山街区 → 返回中环。上坡基本交给扶梯。",
      tags: ["街道", "建筑", "山城地形"],
      kind: "street"
    },
    {
      id: "wan-chai",
      day: 3,
      name: "湾仔 · 皇后大道东",
      time: "12:00–14:00",
      coordinates: [114.1704, 22.276],
      transport: "电车或港铁约 15 分钟。",
      note: "午餐在湾仔解决，再沿皇后大道东看老城街区和街市细节。",
      tags: ["午餐", "老街区"],
      kind: "food"
    },
    {
      id: "causeway-bay",
      day: 3,
      name: "铜锣湾 · 时代广场",
      time: "14:00–16:30",
      coordinates: [114.1827, 22.2781],
      transport: "电车或港铁约 10 分钟。",
      note: "商业区、时代广场和周边街道。下雨时直接以商场为主。",
      tags: ["购物", "商场", "雨天优先"],
      kind: "shopping"
    },
    {
      id: "mong-kok",
      day: 3,
      name: "旺角 · 西洋菜南街",
      time: "17:00–19:00",
      coordinates: [114.1698, 22.3186],
      transport: "港铁约 20 分钟，不建议步行。",
      note: "沿弥敦道、西洋菜南街和女人街一带逛小店，体验香港市井街景。",
      tags: ["市井街景", "小店"],
      kind: "street"
    },
    {
      id: "tst-harbour",
      day: 3,
      name: "尖沙咀 · 维港",
      time: "19:00–20:30",
      coordinates: [114.1722, 22.2975],
      transport: "港铁约 10 分钟，到站后步行去海滨。",
      note: "星光大道、维港夜景和香港岛天际线，建议把日落到亮灯的时间留给这里。",
      tags: ["夜景", "海边", "天际线"],
      kind: "night"
    },
    {
      id: "star-ferry",
      day: 3,
      name: "天星小轮 · 返中环",
      time: "20:30–21:00",
      coordinates: [114.1687, 22.2936],
      transport: "步行到尖沙咀码头，乘天星小轮回中环。",
      note: "这是维港夜景最值得保留的交通段。到中环后准备返程。",
      tags: ["渡轮", "维港夜景"],
      kind: "ferry"
    },
    {
      id: "lo-wu-return",
      day: 3,
      name: "罗湖口岸",
      time: "21:30–23:30",
      coordinates: [114.1186, 22.5317],
      transport: "中环经港铁到罗湖约 55 分钟，建议 21:30–22:00 开始返程。",
      note: "罗湖口岸开放至 24:00，但东铁线末班更早，不要把 24:00 当作交通截止时间。",
      tags: ["返深", "时间余量"],
      kind: "border"
    },
    {
      id: "futian-stay",
      day: 4,
      name: "福田住宿",
      time: "08:00–09:30",
      coordinates: [114.0521, 22.5359],
      transport: "退房和早餐。",
      note: "核心行程在 08:00 结束。留出取行李和前往深圳北的时间。",
      tags: ["行程结束", "整理行李"],
      kind: "base"
    },
    {
      id: "sz-north-return",
      day: 4,
      name: "深圳北站",
      time: "10:00 到站 · 11:13 发车",
      coordinates: [114.0293, 22.6104],
      transport: "地铁或打车约 30–45 分钟，提前到站安检。",
      note: "D2424：深圳北 11:13 → 温州南 18:18，01车 09D。",
      tags: ["返程", "01车 09D"],
      kind: "rail"
    }
  ]
};
