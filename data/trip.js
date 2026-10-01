export const trip = {
  title: "深圳 × 香港 · 国庆 4 天路线",
  subtitle: "10/1 晚抵深 · 10/2 换住清湖 · 10/3 香港一日 · 10/4 返程",
  bounds: [
    [113.87, 22.14],
    [114.32, 22.74]
  ],
  center: [114.06, 22.48],
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
  hotels: [
    {
      name: "城市主题酒店（深圳北站店）",
      address: "龙华区民治大道 490号-4号",
      dates: "10/1 住 1 晚",
      coordinates: [114.03748, 22.62855]
    },
    {
      name: "金曼岛酒店（清湖地铁站店）",
      address: "龙华区清泉路富泉新村 A10-A11栋",
      dates: "10/2–10/3 住 2 晚",
      coordinates: [114.0445, 22.6968]
    }
  ],
  days: {
    1: {
      label: "10/1 抵深",
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
      note: "出站后直接打车去酒店。当天因延误和堵车没有有效游览时间，不再硬塞景点。",
      tags: ["铁路到达", "07车 01F"],
      kind: "rail"
    },
    {
      id: "hotel-north-day1",
      day: 1,
      name: "城市主题酒店（深圳北站店）",
      time: "20:30–21:00 入住",
      coordinates: [114.03748, 22.62855],
      transport: "深圳北站打车约 10–15 分钟。",
      note: "办理入住后，21:00–22:00 在酒店附近简单吃饭，22:00 以后休息。",
      tags: ["住宿", "不安排景点"],
      kind: "hotel"
    },
    {
      id: "hotel-north-day2",
      day: 2,
      name: "城市主题酒店（深圳北站店）",
      time: "08:00–08:30 退房",
      coordinates: [114.03748, 22.62855],
      transport: "退房后带行李前往清湖。",
      note: "先去金曼岛酒店寄存行李，再开始深圳城市线，避免拖箱走景点。",
      tags: ["退房", "转移行李"],
      kind: "hotel"
    },
    {
      id: "hotel-qinghu-day2",
      day: 2,
      name: "金曼岛酒店（清湖地铁站店）",
      time: "08:40–09:15 寄存行李",
      coordinates: [114.0445, 22.6968],
      transport: "从深圳北酒店打车约 30–40 分钟，或地铁前往清湖站附近。",
      note: "酒店靠近清湖地铁站，寄存后直接进站。接下来两天都从这里出发。",
      tags: ["住宿", "清湖站", "寄存行李"],
      kind: "hotel"
    },
    {
      id: "children-palace",
      day: 2,
      name: "少年宫",
      time: "09:15–09:40",
      coordinates: [114.059, 22.5485],
      transport: "地铁前往少年宫，作为莲花山公园的入口。",
      note: "不需要在少年宫本身停留太久，直接接莲花山步道。",
      tags: ["地铁", "莲花山入口"],
      kind: "metro"
    },
    {
      id: "lianhuashan",
      day: 2,
      name: "莲花山公园",
      time: "09:40–11:00",
      coordinates: [114.0577, 22.5552],
      transport: "从少年宫进入公园，短距离步行上山。",
      note: "少年宫 → 山顶 → 俯瞰福田 CBD → 下山，控制在 1–1.5 小时。能见度低时缩短。",
      tags: ["城市全景", "雨天缩短", "邓小平铜像"],
      rain: "short",
      kind: "view"
    },
    {
      id: "civic-center-day",
      day: 2,
      name: "市民中心",
      time: "11:00–12:00",
      coordinates: [114.0664, 22.5414],
      transport: "从莲花山下山后步行前往。",
      note: "看建筑、城市广场和深南大道，不安排博物馆等室内场馆。",
      tags: ["城市建筑", "城市中轴"],
      kind: "city"
    },
    {
      id: "futian-lunch",
      day: 2,
      name: "福田 CBD 午餐",
      time: "12:00–13:30",
      coordinates: [114.0582, 22.5388],
      transport: "市民中心步行或短打车进入福田 CBD。",
      note: "根据当日排队情况选商场餐饮，不为固定餐厅额外绕路。",
      tags: ["午餐", "商业区"],
      kind: "food"
    },
    {
      id: "ping-an",
      day: 2,
      name: "平安金融中心",
      time: "13:30–15:30",
      coordinates: [114.0538, 22.5365],
      transport: "从福田 CBD 短打车或步行。",
      note: "如天气和能见度好，可登 116 层 Free Sky；云层低时改为商场和周边 CBD。",
      tags: ["高楼", "Free Sky", "雨天改室内"],
      kind: "building"
    },
    {
      id: "coco-park",
      day: 2,
      name: "COCO Park",
      time: "15:30–16:45",
      coordinates: [114.0521, 22.5359],
      transport: "从平安金融中心步行或短打车。",
      note: "逛商业街区、喝东西休息，不需要专门购物。",
      tags: ["商业街区", "咖啡", "休息"],
      kind: "shopping"
    },
    {
      id: "shenzhen-bay-park",
      day: 2,
      name: "深圳湾公园",
      time: "16:45–18:30",
      coordinates: [113.943, 22.497],
      transport: "地铁或打车前往深圳湾公园站。",
      note: "只看地铁站附近海边并向后海方向走一段。小雨继续，大雨缩短。",
      tags: ["海边", "滨海步道", "雨天缩短"],
      rain: "short",
      kind: "coast"
    },
    {
      id: "houhai",
      day: 2,
      name: "后海",
      time: "18:30–19:00",
      coordinates: [113.9416, 22.516],
      transport: "从深圳湾公园向后海方向移动。",
      note: "短暂看南山 CBD 和深圳湾高楼群，不需要停留太久。",
      tags: ["南山 CBD", "夜景"],
      kind: "city"
    },
    {
      id: "sea-world",
      day: 2,
      name: "海上世界",
      time: "19:00–21:00",
      coordinates: [113.9193, 22.4881],
      transport: "地铁或打车前往蛇口海上世界。",
      note: "看明华轮、绕中心广场、吃晚饭和看夜景。太累时可以吃完饭直接结束。",
      tags: ["明华轮", "晚餐", "夜景"],
      kind: "night"
    },
    {
      id: "hotel-qinghu-day2-return",
      day: 2,
      name: "金曼岛酒店（清湖地铁站店）",
      time: "21:00 以后",
      coordinates: [114.0445, 22.6968],
      transport: "海上世界乘地铁回清湖，再步行或短打车到酒店。",
      note: "尽量 22:00 左右回到酒店。深圳地铁国庆可能延时，但仍不建议依赖深夜班次。",
      tags: ["返回酒店", "清湖站"],
      kind: "hotel"
    },
    {
      id: "hotel-qinghu-day3",
      day: 3,
      name: "金曼岛酒店（清湖地铁站店）",
      time: "07:30 出发",
      coordinates: [114.0445, 22.6968],
      transport: "步行到清湖站，乘地铁去福田口岸。",
      note: "10/3 是国庆客流高峰，不建议 9 点后再开始过关。",
      tags: ["早出发", "清湖站"],
      kind: "hotel"
    },
    {
      id: "futian-port",
      day: 3,
      name: "福田口岸",
      time: "08:00–08:30",
      coordinates: [114.0694, 22.5192],
      transport: "清湖乘地铁前往福田口岸。",
      note: "通关时间 06:30–22:30。节假日预留排队时间，跟随现场指引过关。",
      tags: ["跨境", "06:30 开放"],
      kind: "border"
    },
    {
      id: "lok-ma-chau",
      day: 3,
      name: "落马洲",
      time: "08:30–09:30",
      coordinates: [114.0674, 22.5149],
      transport: "过关后进入东铁线，前往中环。",
      note: "这一段以交通为主，不用额外安排景点，尽量赶上早班车。",
      tags: ["香港入境", "东铁线"],
      kind: "border"
    },
    {
      id: "central-queens",
      day: 3,
      name: "中环 · 皇后大道中",
      time: "09:30–11:00",
      coordinates: [114.1585, 22.2819],
      transport: "东铁线转港铁到中环。",
      note: "中环站 → 皇后大道中 → 置地广场一带 → 中环街区，重点看街道和高楼混合的城市景观。",
      tags: ["街道", "CBD", "建筑"],
      kind: "street"
    },
    {
      id: "central-midlevels",
      day: 3,
      name: "中环半山自动扶梯",
      time: "11:00–12:30",
      coordinates: [114.1515, 22.2827],
      transport: "从中环街区短距离步行进入扶梯。",
      note: "沿自动扶梯穿过半山街区，穿插短距离步行。不要盲目爬坡。",
      tags: ["自动扶梯", "半山", "山城街道"],
      kind: "street"
    },
    {
      id: "central-lunch",
      day: 3,
      name: "中环午餐",
      time: "12:30–13:30",
      coordinates: [114.1555, 22.2812],
      transport: "在半山或返回中环后解决。",
      note: "不建议为了某一家网红店排长队，按当时位置直接选择。",
      tags: ["午餐", "中环"],
      kind: "food"
    },
    {
      id: "wan-chai",
      day: 3,
      name: "湾仔 · 皇后大道东",
      time: "13:30–15:00",
      coordinates: [114.1704, 22.276],
      transport: "从中环乘电车或港铁到湾仔。",
      note: "沿皇后大道东看老城区、街市和普通香港街道。",
      tags: ["老街区", "皇后大道东", "电车"],
      kind: "street"
    },
    {
      id: "causeway-bay",
      day: 3,
      name: "铜锣湾",
      time: "15:00–16:30",
      coordinates: [114.1827, 22.2781],
      transport: "从湾仔乘电车或港铁前往。",
      note: "看高密度商业建筑、百货商场和街边商铺。走累时可以全改商场动线。",
      tags: ["商业区", "商场", "人流"],
      kind: "shopping"
    },
    {
      id: "mong-kok",
      day: 3,
      name: "旺角",
      time: "17:00–19:00",
      coordinates: [114.1698, 22.3186],
      transport: "铜锣湾乘港铁到旺角。",
      note: "旺角站 → 弥敦道 → 女人街一带 → 周边街区，主要体验市井和高密度城市生活。",
      tags: ["弥敦道", "女人街", "市井街景"],
      kind: "street"
    },
    {
      id: "tst-harbour",
      day: 3,
      name: "尖沙咀 · 维多利亚港",
      time: "19:30–20:30",
      coordinates: [114.1722, 22.2975],
      transport: "旺角乘港铁到尖沙咀，再步行去海滨。",
      note: "看香港岛天际线、文化中心一带和维港夜景。天气好可多留一会儿。",
      tags: ["维港夜景", "香港岛天际线"],
      kind: "night"
    },
    {
      id: "star-ferry",
      day: 3,
      name: "天星小轮",
      time: "20:30–21:00",
      coordinates: [114.1687, 22.2936],
      transport: "尖沙咀码头乘天星小轮前往中环，建议坐上层。",
      note: "这段既是交通，也是从海面看维港夜景的最佳部分。公众假期班次较密，但仍受海况影响。",
      tags: ["渡轮", "维港夜景", "建议上层"],
      kind: "ferry"
    },
    {
      id: "central-pier",
      day: 3,
      name: "中环码头",
      time: "21:00–21:15",
      coordinates: [114.1615, 22.289],
      transport: "下船后前往中环站。",
      note: "不要在香港继续加新地点，直接准备返深。",
      tags: ["返程", "中环站"],
      kind: "metro"
    },
    {
      id: "lo-wu-return",
      day: 3,
      name: "罗湖口岸",
      time: "21:15–22:00",
      coordinates: [114.1186, 22.5317],
      transport: "中环乘港铁前往罗湖，预留换乘和排队时间。",
      note: "去程福田口岸、回程罗湖口岸，减少折返。罗湖口岸开放至 24:00，但东铁线末班更早。",
      tags: ["返深", "时间余量"],
      kind: "border"
    },
    {
      id: "hotel-qinghu-day3-return",
      day: 3,
      name: "金曼岛酒店（清湖地铁站店）",
      time: "22:00 以后",
      coordinates: [114.0445, 22.6968],
      transport: "过关后乘地铁回清湖；太晚可以直接打车。",
      note: "如果香港客流导致时间明显延后，优先保证过关，直接压缩铜锣湾或旺角。",
      tags: ["返回酒店", "优先级提示"],
      kind: "hotel"
    },
    {
      id: "hotel-qinghu-day4",
      day: 4,
      name: "金曼岛酒店（清湖地铁站店）",
      time: "09:10–09:30 退房出发",
      coordinates: [114.0445, 22.6968],
      transport: "清湖站乘地铁到深圳北站约 15–20 分钟；打车约 15–25 分钟。",
      note: "不再安排景点。建议 09:30 前到深圳北，给安检和找检票口留时间。",
      tags: ["退房", "前往车站"],
      kind: "hotel"
    },
    {
      id: "sz-north-return",
      day: 4,
      name: "深圳北站",
      time: "10:00 到站 · 11:13 发车",
      coordinates: [114.0293, 22.6104],
      transport: "从清湖站到深圳北站，留足换乘和进站时间。",
      note: "D2424：深圳北 11:13 → 温州南 18:18，01车 09D。",
      tags: ["返程", "01车 09D"],
      kind: "rail"
    }
  ]
};
